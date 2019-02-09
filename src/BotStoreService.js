import KafkaClient from './KafkaClient'
import {
    MongoClient
} from 'mongodb'

export class BotStoreService {
    constructor(config) {
        this.config = config
        this.kafkaClient = new KafkaClient('botstore', this.config['kafkaClient']);
    }
    async execute() {
        await this.connectMongoDb();
        await this.setupKafkaConsumer();
    }
    async connectMongoDb() {
        this.mongoClient = await MongoClient.connect(this.config['connectionString'], {
            useNewUrlParser: true
        });
        this.mongoDb = this.mongoClient.db(this.config['database']);
        this.matchedTransactions = this.mongoDb.collection('matchedtransactions')
    }
    async setupKafkaConsumer() {
        let consumer = this.kafkaClient.getConsumer('botstore-group');
        await consumer.connect();
        await consumer.subscribe({
            topic: 'matchedtransactions',
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async ({
                topic,
                partition,
                message
            }) => {
                await this.matchedTransactions.insert(JSON.parse(message.value.toString()));
                console.log(message.value.toString());
            }
        })
    }
}