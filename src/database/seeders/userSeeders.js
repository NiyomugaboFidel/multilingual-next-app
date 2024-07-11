'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10); // Change the password as needed
    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        role: 'buyer',
        gender: 'male',
        prefferedLanguage: 'English',
        prefferedCurrency: 'USD',
        userAddress: JSON.stringify({ street: '123 Main St', city: 'Anytown', state: 'CA', postalCode: '12345' }),
        phoneN: '+1234567890',
        isBlock: false,
        refreshToken: null,
        refreshTokenExpired: null,
        profilePic: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
        isActive: true,
        isEmailVerified: false,
        mustUpdatePassword: false,
        lastTimePasswordUpdated: new Date(),
        expired: false,
        googleId:null,
        provider:null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: hashedPassword,
        role: 'seller',
        gender: 'female',
        prefferedLanguage: 'Spanish',
        prefferedCurrency: 'EUR',
        userAddress: JSON.stringify({ street: '456 Elm St', city: 'Othertown', state: 'TX', postalCode: '67890' }),
        phoneN: '+0987654321',
        isBlock: false,
        refreshToken: null,
        refreshTokenExpired: null,
        profilePic: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
        isActive: true,
        isEmailVerified: false,
        mustUpdatePassword: false,
        lastTimePasswordUpdated: new Date(),
        expired: false,
        googleId:null,
        provider:null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
