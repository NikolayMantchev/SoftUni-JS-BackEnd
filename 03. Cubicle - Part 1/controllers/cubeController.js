const cubeModel = require('../models/cube');
 
function index(req,res,next){
    cubeModel.getAll().then(cubes=>{
        res.render('index.hbs',{cubes});
    }).catch(next);
}

function details(req,res,next){
    const id = +req.params.id;
    cubeModel.getOne(id).then(cube=>{
        res.render('details.hbs',{cube});
    }).catch(next);
}
function about(req,res,next){
    res.render('about.hbs')
}
function create(req,res,next)
{
    res.render('create.hbs')
}
function errorPage(req,res,next){
    res.render('404.hbs')
}
module.exports={index,details,about,create,errorPage}