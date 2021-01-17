const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

class cubeModel {
    constructor()
    {this.data = require('../config/database.json')};

    _write(newData,resolveData){
        return new Promise((resolve,reject)=>{
            fs.writeFile(path.resolve('../config/database.json'),JSON.stringify(newData),(err)=>{
                if(err){reject(err);return;}
                this.data = newData;
                resolve(resolveData);
            });
        });
    }
    create(name,description,imageUrl,difficultyLevel)
    {
        return {name,description,imageUrl,difficultyLevel}
    }

    insert(newCube){
        const newIdx = this.data.lastIndex++;
        newCube = {id:newIdx,...newCube};
        const newData = {
            lastIndex:newIdx,
            entities:this.data.entities.concat(newCube)
        };
       return this._write(newData,newCube);
    }
    update(cubeId,updates){
        const entityIdx = this.data.entities.findIndex(({id})=>id===cubeId);
        const entity = this.data.entities[entityIdx];
        const updatedEntity = {...entity,...updates};
        const newData = {
            lastIdx:this.data.lastIdx,
            entities:[
                ...this.data.entities.slice(0,entityIdx),
                updatedEntity,
                ...this.data.entities.slice(entityIdx+1)
            ]
        };
        return this._write(newData,updatedEntity);
    }
    delete(cubeId){
        const deletedCube = this.getOne(cubeId);
        const newData = {
            lastIdx:this.data.lastIdx,
            entities:this.data.entities.filter(({id:i})=>i !== cubeId)
        };
        return this._write(newData,deletedCube);
    }
    getOne(cubeId){
        return Promise.resolve(this.data.entities.find(({id:i})=>i === cubeId));
    }
    getAll(){
        return Promise.resolve(this.data.entities);
    }
}
module.exports = new cubeModel();