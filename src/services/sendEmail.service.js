 import transporter from "../configs/nodeEmail";
 import fs from 'fs';
import path from 'path';



const sendVerificationEmail = async (userEmail, userName,token) => {
 
        // Process the email template
    const verificationUrl = `${process.env.DOMAIN}verify-email?t=${token}`; 
    const emailTemplatePath = path.join(__dirname, '../../templates/index.html');
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
    emailTemplate = emailTemplate.replace('{{verification_url}}', verificationUrl);
    emailTemplate = emailTemplate.replace(' {{username}}', userName);
    console.log('Email template content:', emailTemplate);   


    const mailOptions = {
        from: '"VIRUNGA ONLINE SHOP" , no-reply@account.virunga.com',
        to: userEmail,
        subject: 'Email Verification - VIRUNGA',
        html:emailTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent.');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

export default sendVerificationEmail;