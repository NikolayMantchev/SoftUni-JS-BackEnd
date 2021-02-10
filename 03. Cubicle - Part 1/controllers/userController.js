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
    const { username,email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      res.render('registerPage.hbs', { err: 'Passwords and repeat-Password don\'t match!' });
      return;
    }
    let err = {messages:[]};
   if(username.length<4){
       err.messages.push("Username must be at least 4 charackters!");
   }
   if(password.length < 6 || password.length > 18){
       err.messages.push("Password must be between 6 and 18 charackters!");
   }
    
    userModel.exists({username:username})
    .then(exists=>{
        if(exists){
             err.messages.push('Username already exists!');
        }
        if(err.messages.length>0){
            res.render('registerPage.hbs',err);   
            return;
        }
        userModel.create({ username,email, password })
    .then(() => { 
        res.redirect('/login');
        return;
     })
    .catch(next);    
    }) 
  } 
 
function getLogin(req,res,next) {
    res.render('loginPage.hbs')
}
function postLogin(req,res,next) {
     const {username,password} = req.body;
     userModel.findOne({username:username})
     .then(user=>{
         if(!user){
             return res.render('loginPage.hbs',{err:'User not found'})
         }
         else
         {
            bcrypt.compare(password,user.password)
            .then(match=>{
                if(!match){ res.render('loginPage.hbs',{err:"Invalid Username or Password!"}); return;}
                const token = jwt.sign({id:user._id},config.jwtSecret);
                console.log("Loged In!");
                res.cookie(config.authCookie,token).redirect('/');
            });
            
         }
     }).catch(next);
}
function logout(req,res,next){
    res.clearCookie(config.authCookie);
    console.log('logged out!');
    res.redirect('/');
}


module.exports= {getRegister,postRegister,
                getLogin,postLogin,
                logout}
