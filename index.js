const Express = require('express');
const express = new Express();
const bodyparser = require('body-parser');
const http = require('http');
const knex = require('knex');
const bcrypt=require('bcryptjs');

const config = require('./knexfile');
const dbClient = knex(config);
const server = http.createServer(express);

const userController=require('./controller/user');

express.use(bodyparser.json());

async function getuserbyname(request,response){
    const data = await dbClient('USER1').where('USERNAME',request.params.username).select();
     response.json(
         data
     )
     console.log(request.params.username)
}

async function createAdmin(request, response){
    const username = request.body.username;
    const password = request.body.password;
    const hashedPassword=bcrypt.hashSync(password,10);
    const payload = {
        USERNAME: username,
        PASSWORD: hashedPassword
        }
        const data = await dbClient('ADMIN').insert(payload);
        response.json(data);
    
}

async function editUser(request, response){
    try{
        const id = request.body.id;
        const name = request.body.name;
        const username = request.body.username;
        const password = request.body.password;
        const email = request.body.email;
        const phone = request.body.phone;
        const hashedPassword=bcrypt.hashSync(password,10);
        const payload = {
            ID: id,
            NAME: name,
            USERNAME: username,
            PASSWORD:hashedPassword,
            EMAIL:email,
            PHONE:phone,
        }
        const data = await dbClient('USER1').where('USERNAME',username).update(payload);
        response.json({
            data:data,
            message:'success',
        });
    }
    catch(err){
        response.json(err)
    }
}

async function getUser(request, response){
    // try{
        const data = await dbClient('USER1').select();
        response.json(data);
    // }
    // catch(err){
    //     response.json(err)
    // }
}
async function createUser(request, response){
    const id = request.body.id;
        const name = request.body.name;
        const username = request.body.username;
        const password = request.body.password;
        const email = request.body.email;
        const phone = request.body.phone;
        const hashedPassword=bcrypt.hashSync(password,10);
        const payload = {
            ID: id,
            NAME: name,
            USERNAME: username,
            PASSWORD:hashedPassword,
            EMAIL:email,
            PHONE:phone
        }
        const data = await dbClient('USER1').insert(payload);
        response.json({
            data:data,
            message:'success',
        });
    try{
    }
    catch(err){
        response.json(err)
    }
}
async function deleteUser(request, response){
    try{
        const id = request.body.id;
        const username = request.body.username;
        const payload = {
            USERNAME: username
        }
        const data = await dbClient('USER1').where('USERNAME',username).del();
        response.json(data);

    }
    catch(err){
        response.json(err)
    }
}

async function editFutsal(request, response){
    try{
        const name = request.body.name;
        const longitude = request.body.longitude;
        const latitude = request.body.latitude;
        const district = request.body.district;
        const province = request.body.province;
        const payload = {
            NAME: name,
            LONGITUDE: longitude,
            LATITUDE: latitude,
            DISTRICT: district,
            PROVINCE: province
            }
        const data = await dbClient('FUTSAL').where('NAME',name).update(payload);
        response.json({
            data:data,
            message:'success',
        });
    }
    catch(err){
        response.json(err)
    }
}
async function getFutsal(request, response){
        const data = await dbClient('FUTSAL').select();
        response.json(data);
}
async function createFutsal(request, response){
    const name = request.body.name;
    const longitude = request.body.longitude;
    const latitude = request.body.latitude;
    const district = request.body.district;
    const province = request.body.province;
    const payload = {
        NAME: name,
        LONGITUDE: longitude,
        LATITUDE: latitude,
        DISTRICT: district,
        PROVINCE: province
        }
        const data = await dbClient('FUTSAL').insert(payload);
        response.json({
            data:data,
            message:'success',
        });
    try{
    }
    catch(err){
        response.json(err)
    }
}
async function deleteFutsal(request, response){
    try{
        const name = request.params.name;
        const payload = {
            NAME: name,
        }
        const data = await dbClient('FUTSAL').where('NAME',name).del();
        response.json(data);

    }
    catch(err){
        response.json(err)
    }
}
express.post('/api/authuser', userController.authUser);
express.put('/api/user', editUser);
express.get('/api/user', getUser);
express.post('/api/user', createUser);
express.delete('/api/user', deleteUser);
express.get('/api/user/:username', getuserbyname);

express.post('/api/authadmin', userController.authFutsal);
express.put('/api/futsal', editFutsal);
express.get('/api/futsal', getFutsal);
express.post('/api/futsal', createFutsal);
express.delete('/api/futsal/:name', deleteFutsal);
express.post('/api/admin', createAdmin);


express.get("/",(req,res)=>{
    res.send("response")
})
server.listen(4000,'192.168.137.137',function (){
    console.log("running on port 4000")
})