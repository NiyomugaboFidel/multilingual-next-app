import speakeasy from'speakeasy';
require('dotenv').config();

// Generate a token
function generateOtp() {
  return speakeasy.totp({
    secret: process.env.SECRET,
    encoding: 'base32',
  });
}

// Verify a token
function verifyToken(token) {
  return speakeasy.totp.verify({
    secret: process.env.SECRET,
    encoding: 'base32',
    token,
    window: 1,
  });
}

export { generateOtp};