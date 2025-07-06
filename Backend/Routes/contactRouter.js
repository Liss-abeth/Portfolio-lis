const express = require('express');
const {
  createContact,
  getContacts,
  deleteContact,
} = require('../controllers/ContactController');

const contactRouter = express.Router();

contactRouter.route('/create').post(createContact);     // POST  contact
contactRouter.route('/').get(getContacts);              // GET contacts
contactRouter.route('/delete/:id').delete(deleteContact); // DELETE 

module.exports = contactRouter;
