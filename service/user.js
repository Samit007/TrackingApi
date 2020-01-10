const fetchUser = require('../utils/index');
const Express = require('express');
const express= new Express();
const bodyParser = require('body-parser');
express.use(bodyParser.json());

async function authUser(USERNAME){
  try{
    const usr= await fetchUser.authUsr({
      table:'USER1',
      first: USERNAME
    });
    return usr;
  }catch(error) {
    throw new Error(error);
}
}

async function authFutsal(USERNAME){
    try{
      const usr= await fetchUser.authfut({
        table:'ADMIN',
        first: USERNAME
      });
      return usr;
    }catch(error) {
      throw new Error(error);
  }
  }
module.exports ={
    authUser: authUser,
    authFutsal: authFutsal
}
