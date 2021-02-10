const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 
const userModel = new mongoose.Schema({
    username:{type: String,
       require:true,},
    email:{type: String,
      reqiured:true
    },
    password:{type:String , 
      required:true,
      },
    cubes: [{type: mongoose.Types.ObjectId, ref:'Accessory'}]
});

userModel.pre('save', function (done) {
    const user = this;
  
    if (!user.isModified('password')) {
      done();
      return;
    }
  
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) { done(err); return; }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { done(err); return; }
        user.password = hash;
        
        done();
      });
    });
  });

module.exports = new mongoose.model('User',userModel);