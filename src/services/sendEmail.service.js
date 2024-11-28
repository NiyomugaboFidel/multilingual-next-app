 import transporter from "../configs/nodeEmail";
 import fs from 'fs';
import path from 'path';



const sendVerificationEmail = async (userEmail, userName,token) => {
 
        // Process the email template
    const verificationUrl = `${process.env.DOMAIN}/user/verify-email?t=${token}`; 
    const emailTemplatePath = path.join(__dirname, '../../templates/index.html');
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
    emailTemplate = emailTemplate.replace('{{verification_url}}', verificationUrl);
    emailTemplate = emailTemplate.replace(' {{username}}', userName);
    // console.log('Email template content:', emailTemplate);   


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

const sendRestEmail = async (userEmail, userName,token) => {
 
        // Process the email template
    const restPasswordUrl = `${process.env.DOMAIN}rest-password?t=${token}`; 
    const emailTemplatePath = path.join(__dirname, '../../templates/restP.html');
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
    emailTemplate = emailTemplate.replace('{{restPassword_url}}', restPasswordUrl);
    emailTemplate = emailTemplate.replace(' {{username}}', userName);
    // console.log('Email template content:', emailTemplate);   


    const mailOptions = {
        from: '"VIRUNGA ONLINE SHOP" , no-reply@account.virunga.com',
        to: userEmail,
        subject: 'Rest Password - VIRUNGA',
        html:emailTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Rest Password email sent.');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

 const sendEmail = async(userEmail,userName,subject,content,sms)=>{

           // Process the email template
    
           const emailTemplatePath = path.join(__dirname, '../../templates/message.html');
           let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
           emailTemplate = emailTemplate.replace('{{otp}}', sms);
           emailTemplate = emailTemplate.replace('{{content}}', content);
           emailTemplate = emailTemplate.replace(' {{username}}', userName);
        //    console.log('Email template content:', emailTemplate);   
       
       
           const mailOptions = {
               from: '"VIRUNGA ONLINE SHOP" , no-reply@account.virunga.com',
               to: userEmail,
               subject: subject,
               html:emailTemplate,
           };
       
           try {
               await transporter.sendMail(mailOptions);
               console.log('Rest Password email sent.');
           } catch (error) {
               console.error('Error sending verification email:', error);
           }

 }
 

 const sendEmailService = async (recipientEmail, userName, subject, html) => {
    // Process the email template
    const emailTemplatePath = path.join(__dirname, '../../templates/service.html');
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
  
    // Replace placeholders with actual values
    emailTemplate = emailTemplate.replace('{{html}}', html);
    emailTemplate = emailTemplate.replace('{{username}}', userName);
    
    // console.log('Email template content:', emailTemplate);   
  
    const mailOptions = {
      from: '"VIRUNGA ONLINE SHOP" <no-reply@account.virunga.com>',
      to: recipientEmail,
      subject: subject,
      html: emailTemplate,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

export {sendVerificationEmail,sendRestEmail,sendEmail, sendEmailService};