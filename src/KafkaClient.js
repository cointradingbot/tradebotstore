import {
    Kafka
} from 'kafkajs'

export default class KafkaClient {
    constructor(clientId, kafkaHosts) {
        this._client = new Kafka({
            clientId: clientId,
            brokers: [kafkaHosts]
        });
    }

    getConsumer(consumerGroup) {
        if (this._consumer === undefined) {
            console.log('Creating new consumer ...')
            this._consumer = this._client.consumer({
                groupId: consumerGroup
            });
        }
        return this._consumer;
    }
    get client() {
        return this._client;
    }
}