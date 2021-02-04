const userModel = require('../models/user');
const config = require('../config/config');
const salt = require('salt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

function getRegister(req,res,next) {
    res.render('registerPage.hbs')
}

function postRegister(req,res,next) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
      res.render('register', { err: 'Passwords don\'t match!' });
      return;
    }

    userModel.create({ username, password })
      .then(() => { res.redirect('/login'); })
      .catch(next);
  } 
 
function getLogin(req,res,next) {
    res.render('loginPage.hbs')
}
function postLogin(req,res,next) {
     const {username,password} = req.body;
     userModel.findOne({username:username})
     .then(user=>{
         if(!user){
             return res.redirect('/login',{err:'User not found'})
         }
         else
         {
             const validPass = bcrypt.compare(password,user.password);
             if(!validPass){return res.redirect('/login',{err:"Invalid Password!"})}
             const token = jwt.sign({id:user._id},config.jwtSecret);
             console.log("Loged In!");
             res.cookie(config.authCookie,token).redirect('/');
         }
     }).catch(next);
}
function logout(req,res,next){
    res.clearCookie(config.authCookie);
    res.redirect('/');
}


module.exports= {getRegister,postRegister,
                getLogin,postLogin,
                logout}
