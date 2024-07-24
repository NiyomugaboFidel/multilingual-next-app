import OTP from '../database/models/otp';
import { generateOtp } from '../utils/generateOtp';
import {findUserById } from '../services/user.service';
import { sendEmail } from '../services/sendEmail.service';






// Route to generate OTP and send email
const createOtp = async (req, res) => {
  const { userId} = req.query;
  console.log('userId',userId);

  if(!userId){
    return res.status(401).json({ success: false, message: 'usedId required'});
  }
  const user = await findUserById(userId)

  if(!user){
  return  res.status(401).json({ success: false, message: 'User not found'});
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
     
    const {email, firstName} = user
    console.log('user email ',email,firstName);
    const subject = "OTP code -VIRUNGA ONLINE SHOP."
    const content = "OTP code generated Verify your OTP faster it's will be expried in 5minutes only."

    await sendEmail(email,firstName,subject,content,otp);

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
   try {

    const Dotp =    await  OTP.findOne({
      where: {
        userId,
        otp
      },
      order: [['createdAt', 'DESC']]
    })
  
    if(Dotp === null){
      return res.status(401).json({ success: false, message: 'invalid Otp'});
    }

    await  OTP.findOne({
      where: {
        userId,
        otp
      },
      order: [['createdAt', 'DESC']]
    })
      .then(otpRecord => {
  

        if(otpRecord.expiresAt < Date.now()){
          OTP.destroy({where:{userId,otp}})
        return res.status(401).json({ success: false, message: 'Otp code expired try other'});
            
        }
        if (otpRecord && otpRecord.otp === otp) {
           OTP.destroy({where:{userId,otp}})
          next(); // OTP is valid, proceed to the protected route
        } else {
        return  res.status(401).json({ success: false, message: 'Unauthorized' });
        }
      })
      .catch(error => {
        console.error('Error authenticating OTP:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      });
    
   } catch (error) {
    console.error('Error authenticating OTP:', error);
    res.status(500).json({ success: false, message: 'Something went worry' });
   }
    
  };
  
export {createOtp, verifyOpt}