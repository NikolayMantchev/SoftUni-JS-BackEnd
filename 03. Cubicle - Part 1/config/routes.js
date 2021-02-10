const cubeController = require('../controllers/cubeController');
const accessoryController = require("../controllers/accessoryController");
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

module.exports = (app) => {
   app.get('/',auth,cubeController.index);
   app.get('/details/:id',cubeController.details);
   app.get('/create',auth,cubeController.getCreateCube);
   app.post('/create',auth,cubeController.postCreateCube);
   app.get('/cube/delete/:id',auth,cubeController.getDelete);
   app.post('/cube/delete/:id',auth,cubeController.postDelete);
   app.get('/cube/edit/:id',auth,cubeController.getEdit);
   app.post('/cube/edit/:id',auth,cubeController.postEdit);

   app.get('/attach/accessory/:id',auth,accessoryController.getAttachAccessory);
   app.post('/attach/accessory/:id',auth,accessoryController.postAttachAccessory)
   app.get('/create/accessory',auth,accessoryController.getCreateAccessory);
   app.post('/create/accessory',auth,accessoryController.postCreateAccessory);
   
   
   app.get('/register',userController.getRegister);
   app.post('/register',userController.postRegister);
   app.get('/login',userController.getLogin);
   app.post('/login',userController.postLogin);
   app.get('/logout',userController.logout);

   app.get('/about',cubeController.about);
   app.get('*',cubeController.errorPage);
 };
