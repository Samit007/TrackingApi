  
const knex = require('knex');
const config = require('../knexfile');
const dbClient = knex(config);
const Express = require('express');
const express = new Express();
const bodyParser = require('body-parser');
express.use(bodyParser.json());

async function authUsr({
    table,
    first
  }) {
    const USERNAME = first;
    const data = await dbClient
      .table(table)
      .first('PASSWORD')
      .select('ID')
      .where('USERNAME', USERNAME)
    return data;
  }

  async function authfut({
    table,
    first
  }) {
    const USERNAME = first;
    const data = await dbClient
      .table(table)
      .first('PASSWORD')
      .where('USERNAME', USERNAME)
    return data;
  }
  module.exports ={
    authUsr: authUsr,
    authfut:authfut
}