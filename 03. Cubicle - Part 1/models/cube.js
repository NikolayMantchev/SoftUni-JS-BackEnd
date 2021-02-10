const mongoose = require('mongoose');

const cubeModel = new mongoose.Schema({
    name:{ type: String,required:true},
    imageUrl:{type:String,required:true},
    description:{type:String,required:true},
    difficultyLevel:{type:Number,min:1,max:5},
    creatorId:{type: String, required:true },
    accessories: [{type: mongoose.Types.ObjectId, ref:'Accessory'}]
});
module.exports = new mongoose.model('Cube',cubeModel)