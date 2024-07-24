'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        id: uuidv4(),
        name: 'Product 1',
        title: 'Title 1',
        slug: 'product-1',
        brand: 'Brand 1',
        description: 'Description for Product 1',
        price: 100,
        quantity: 10,
        isAvailable: true,
        categoryId: 'category-id-1', // Replace with actual category UUID
        sellerId: '16e60f8b-04ee-4861-a54d-d86c87121c93', // Replace with actual user UUID
        bonus: 10,
        images: ['image1.jpg', 'image2.jpg'],
        expiryDate: new Date(),
        averageRating: 4.5,
        isExpired: false,
        ratings: JSON.stringify([
          {
            start: 5,
            comment: 'Great product!',
            postedBy: '16e60f8b-04ee-4861-a54d-d86c87121c93' // Replace with actual user UUID
          },
          {
            start: 4,
            comment: 'Good value for money.',
            postedBy: '16e60f8b-04ee-4861-a54d-d86c87121c93' // Replace with actual user UUID
          }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Product 2',
        title: 'Title 2',
        slug: 'product-2',
        brand: 'Brand 2',
        description: 'Description for Product 2',
        price: 200,
        quantity: 5,
        isAvailable: true,
        categoryId: 'category-id-2', // Replace with actual category UUID
        sellerId: '16e60f8b-04ee-4861-a54d-d86c87121c93', // Replace with actual user UUID
        bonus: 20,
        images: ['image3.jpg', 'image4.jpg'],
        expiryDate: new Date(),
        averageRating: 4.0,
        isExpired: false,
        ratings: JSON.stringify([
          {
            start: 5,
            comment: 'Excellent quality!',
            postedBy: '16e60f8b-04ee-4861-a54d-d86c87121c93' // Replace with actual user UUID
          }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
