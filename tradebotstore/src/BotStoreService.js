export class BotStoreService {
    constructor(config) {
        this.config = config
    }

    createKafkaClient() {
        if (this.usingKafka) {
            console.log("Connecting to Kafka Broker...")
            this.kafkaClient = new KafkaClient(this.config.kafkaClient)
            this.kafkaClient.producer.on('error', (error) => {
                console.log(error);
            })
            this.kafkaClient.producer.on('ready', () => {
                console.log(`Connected to Kafka broker ${this.config.kafkaClient}`)
                let topic = [{
                    topic: 'matchedTransactions',
                    partitions: 1,
                    replicationFactor: 1,
                    configEntries: [{
                        name: 'compression.type',
                        value: 'gzip'
                    }]
                }];
                this.kafkaClient.client.createTopics(topic, (error, result) => {
                    console.log(result);
                })
            })
        }
    }
}