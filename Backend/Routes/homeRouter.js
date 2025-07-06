const express = require('express');
const { getHome, createHome, updateHome, deleteHome } = require('../controllers/HomeController');

const homeRouter = express.Router();

homeRouter.route('/create').post(createHome);       
homeRouter.route('/').get(getHome);                
homeRouter.route('/update/:id').put(updateHome);    
homeRouter.route('/delete/:id').delete(deleteHome); 

module.exports = homeRouter;
