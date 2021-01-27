const mongoose = require('mongoose');

const accessoryModel = new mongoose.Schema({
    name:{type:String,required:true},
    imageUrl:{type:String,required:true},
    description:{type:String,required:true},
    cubes: [{type: mongoose.Types.ObjectId,ref: 'Cube'}],
});

module.exports = new mongoose.model('Accessory',accessoryModel);