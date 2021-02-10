const accessoryModel = require('../models/accessory');
const cubeModel = require('../models/cube');


function getCreateAccessory(req,res) {
    res.render('createAccessory.hbs')
}
function postCreateAccessory(req,res,next){
    const {name,imageUrl,description} = req.body;
    accessoryModel.create({name,imageUrl,description})
    .then(()=>{res.redirect('/')})
    .catch(next);
}

function getAttachAccessory(req,res,next){
    const cubeId = req.params.id;
    Promise.all([
        cubeModel.findById(cubeId),
        accessoryModel.find({ cubes: { $nin: cubeId } })
    ])
    .then(([cube,accessories])=>{
        res.render('attachAccessory.hbs',{
            cube,
            accessories
        })
    })
    .catch(next);
}
function postAttachAccessory(req,res,next){
   const cubeId = req.params.id;
   const accessoryId = req.body.accessory;

   Promise.all([
   cubeModel.update({_id:cubeId},{$push:{accessories:accessoryId}}),
    accessoryModel.update({_id:accessoryId},{$push:{cubes:cubeId}})
   ])
   .then(()=>{
       res.redirect('/details/' + cubeId);
   })
   .catch(next)
}

module.exports = {
    postCreateAccessory,
    getCreateAccessory,
    getAttachAccessory,
    postAttachAccessory}