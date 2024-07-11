import crypto from'crypto';
import speakeasy from'speakeasy';
import OTP from '../database/models/otp';
import { generateOtp } from '../utils/generateOtp';
import { findUserByEmail, findUserById } from '../services/user.service';






// Route to generate OTP and send email
const createOtp = async (req, res) => {
  const { userId} = req.query;
  console.log('userId',userId);

  if(!userId){
    res.status(401).json({ success: false, message: 'usedId required'});
  }
  const user = findUserById(userId)

  if(!user){
    res.status(401).json({ success: false, message: 'User not found'});
  }

  try {
    // Generate OTP
    const otp = generateOtp()
    console.log('otp',otp);

    // Save OTP with expiry time in database
   const newOtp= await OTP.create({
      userId,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // OTP expires in 5 minutes
    });

    res.status(200).json({ success: true, message: 'Otp generated successfully',newOtp});

  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ success: false, message: 'Error generating OTP', error });
  }
};

// Middleware to protect routes
const verifyOpt = async(req, res, next) => {
    // Assume the token is passed in the headers
    const {otp } = req.body;
    const id = req.user.id;
    const userId = id;
  
    OTP.findOne({
      where: {
        userId,
      },
      order: [['createdAt', 'DESC']]
    })
      .then(otpRecord => {
        if(otpRecord.expiresAt < Date.now()){
         res.status(401).json({ success: false, message: 'Otp code expired try other'});
            
        }
        if (otpRecord && otpRecord.otp === otp) {
          next(); // OTP is valid, proceed to the protected route
        } else {
          res.status(401).json({ success: false, message: 'Unauthorized' });
        }
      })
      .catch(error => {
        console.error('Error authenticating OTP:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      });
  };
  
export {createOtp, verifyOpt}