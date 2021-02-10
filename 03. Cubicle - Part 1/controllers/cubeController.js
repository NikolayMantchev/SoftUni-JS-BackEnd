const userModel = require('../models/user');
const cubeModel = require('../models/cube');
const accessoryModel = require('../models/accessory');
 
function index(req, res, next) {
    const { from, search, to } = req.query;
    let query = {};
    if (search) { query.name = new RegExp(search, 'i'); }
    if (from) {
      query.difficultyLevel = { $gte: +from };
    }
    if (to) {
      query.difficultyLevel = query.difficultyLevel || {};
      query.difficultyLevel.$lte = +to;
    }
    
    cubeModel.find({}).populate('accessories')
      .then(cubes => {
        const user = req.user;
        res.render('index', { cubes, from, search, to,user});
      })
      .catch(next);
  }
 function details(req, res, next) {
    const id = req.params.id;
    return cubeModel.findById(id).populate('accessories').then(cube => {
      res.render('details', { cube });
    }).catch(next);
}


function about(req,res,next){
    res.render('about.hbs',{user:req.user||null})
  }
function getCreateCube(req,res)
  {res.render('create.hbs');}
  
function postCreateCube(req,res,next){
    const creatorId = req.user._id; 
    const { name, description, imageUrl, difficultyLevel } = req.body;
    cubeModel.create({name, description, imageUrl,difficultyLevel: +difficultyLevel, creatorId}).then(newCube=>{
        res.redirect('/')
    }).catch(next)
}   
function getDelete(req,res,next){
  const user = req.user;
  cubeModel.findById(req.params.id)
  .then((cube)=>{
    if(cube.creatorId === user._id){
      res.render('deleteCubePage.hbs',{cube})}
      else{
        res.render('index.hbs',{err:"Only the creator can delete the cube!"});
      }
    }).catch(next);
}
function postDelete(req,res,next) {
  const cubeId = req.params.id;

  accessoryModel.update({cubes:{$in:cubeId}},{$pull:{cubeId}});
  cubeModel.deleteOne({_id:cubeId}).then((deletedCube)=>{
    res.redirect('/');
    return deletedCube;
  }).catch(next);
}
function getEdit(req,res) {
 const cubeId = req.params.id;
 const user = req.user;
 cubeModel.findById(cubeId).then((cube)=>{
   if(cube.creatorId === user._id);
   {
     res.render('editCubePage.hbs',{cube});
   }
 })
}
function postEdit(req,res,next){
  const cubeId = req.params.id;
  const {name,imageUrl,description} = req.body;
  cubeModel.updateOne({_id:cubeId},{name:name,imageUrl:imageUrl,description:description,creatorId:req.user._id})
  .then(updated=>{
    console.log(updated);
    res.redirect('/details/'+cubeId);
    return updated;
  }).catch(next);

}
function errorPage(req,res,next){
  res.render('404.hbs')
}

module.exports={index,details,about,
                getCreateCube,postCreateCube,getDelete,postDelete,getEdit,postEdit,
                errorPage}