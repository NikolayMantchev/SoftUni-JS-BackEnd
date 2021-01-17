const express = require('express');
const cubeController = require('../controllers/cubeController');

module.exports = (app) => {
   app.get('/',cubeController.index);
   app.get('/details/:id',cubeController.details);
   app.get('/create',cubeController.create);
   app.get('/about',cubeController.about);
   app.get('*',cubeController.errorPage);
 };
