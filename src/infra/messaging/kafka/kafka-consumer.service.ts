import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['special-wallaby-12226-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'c3BlY2lhbC13YWxsYWJ5LTEyMjI2JKuZKi3DTfgFRhjqsjuydS8onRc__k8NL_c',
                    password: 'M3gOlH6Dh1ajcIkIZhIjvCqdDbh_76T9ogsUkAOWnJq1TlgkNuYY_9YS3dU1wkHvRE2fIQ==',
                },
                ssl: true,
            }
        })
    }

    async onModuleDestroy() {
        await this.close()
    }
}