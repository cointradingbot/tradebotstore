const config = require('config')
const botstore = require('./BotStoreService')
console.log('Initializing the bot store service ...');
let botstoreService = new botstore.BotStoreService(config);
botstoreService.execute();