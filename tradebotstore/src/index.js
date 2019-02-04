import config from 'config'
import BotStoreService from './BotStoreService'


console.log('Initializing the bot store service ...');
let botstore = new BotStoreService(config);
botstore.createKafkaClient();