const userService = require('../service/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const SECRET_KEY ='secret_key';
const Express = require('express');
const express= new Express();
const bodyParser = require('body-parser');
express.use(bodyParser.json());

async function authUser(request, response, next) {
    const USERNAME = request.body.USERNAME;
    const PASSWORD = request.body.PASSWORD;
    const result = await userService.authUser(USERNAME);
    if (result == undefined) {
        response.json({
            message: "user not found"
        })
    }
    else {
        const passwordFromJson = result.PASSWORD;
        console.log(passwordFromJson)
        const isMatch = bcrypt.compareSync(PASSWORD, passwordFromJson);
        if (isMatch) {
            const accessToken = jwt.sign({
                USERNAME: USERNAME,
            }, SECRET_KEY);
            response.json({
                status: 'true',
                ID: result.ID,
                USERNAME:result.USERNAME,
                data: result,
                accessToken: accessToken
            })
        } else {
            response.json({
                status: 'wrong credintial',
            })
        }
    }
}

async function authFutsal(request, response, next) {
    const USERNAME = request.body.USERNAME;
    const PASSWORD = request.body.PASSWORD;
    const result = await userService.authFutsal(USERNAME);
    if (result == undefined) {
        response.json({
            message: "user not found"
        })
    }
    else {
        const passwordFromJson = result.PASSWORD;
        console.log(passwordFromJson)
        const isMatch = bcrypt.compareSync(PASSWORD, passwordFromJson);
        if (isMatch) {
            const accessToken = jwt.sign({
                USERNAME: USERNAME,
            }, SECRET_KEY);
            response.json({
                status: 'true',
                USERNAME:result.USERNAME,
                data: result,
                accessToken: accessToken
            })
        } else {
            response.json({
                status: 'wrong credintial',
            })
        }
    }
}
module.exports ={
    authUser: authUser,
    authFutsal: authFutsal
}