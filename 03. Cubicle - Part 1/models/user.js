const mongoose = require('mongoose');
 
const userModel = new mongoose.Schema({
    username:{type: String, require:true},
    password:{type:String , required:true},
    cubes: [{type: mongoose.Types.ObjectId, ref:'Accessory'}]
});

module.exports = new mongoose.model('User',userModel);