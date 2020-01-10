const path = require('path');
module.exports = {
    client: 'oracledb',
    connection:{
        host: '192.168.56.102:1521',
        user: 'user1',
        password: 'user1',
        database: 'fts'
    },
    fetchAsString: ['number','clob'],
    useNullAsDefault: false
}