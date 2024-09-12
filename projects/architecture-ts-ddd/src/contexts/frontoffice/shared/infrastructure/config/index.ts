import convict from 'convict';

const frontofficeConfig = convict({
    env: {
        doc: 'The frontoffice application environment.',
        format: ['production', 'development', 'staging', 'test'],
        default: 'default',
        env: 'NODE_ENV'
    },
    typeorm: {
        host: {
            doc: 'The database host',
            format: String,
            env: 'TYPEORM_HOST',
            default: 'localhost'
        },
        port: {
            doc: 'The database port',
            format: Number,
            env: 'TYPEORM_PORT',
            default: 33061
        },
        username: {
            doc: 'The database username',
            format: String,
            env: 'TYPEORM_USERNAME',
            default: 'root'
        },
        password: {
            doc: 'The database password',
            format: String,
            env: 'TYPEORM_PASSWORD',
            default: 'yeti'
        },
        database: {
            doc: 'The database name',
            format: String,
            env: 'TYPEORM_DATABASE',
            default: 'db_frontoffice_backend_dev'
        }
    },
    rabbitmq: {
        connectionSettings: {
            username: {
                doc: 'RabbitMQ user name',
                format: String,
                env: 'RABBITMQ_USERNAME',
                default: 'guest'
            },
            password: {
                doc: 'RabbitMQ password',
                format: String,
                env: 'RABBITMQ_PASSWORD',
                default: 'guest'
            },
            vhost: {
                doc: 'RabbitMQ virtual host',
                format: String,
                env: 'RABBITMQ_VHOST',
                default: '/'
            },
            connection: {
                secure: {
                    doc: 'RabbitMQ secure protocol',
                    format: Boolean,
                    env: 'RABBITMQ_SECURE',
                    default: false
                },
                hostname: {
                    doc: 'RabbitMQ hostname',
                    format: String,
                    env: 'RABBITMQ_HOSTNAME',
                    default: 'localhost'
                },
                port: {
                    doc: 'RabbitMQ amqp port',
                    format: Number,
                    env: 'RABBITMQ_PORT',
                    default: 33070
                }
            }
        },
        exchangeSettings: {
            name: {
                doc: 'RabbitMQ exchange name',
                format: String,
                env: 'RABBITMQ_EXCHANGE_NAME',
                default: 'domain_events'
            }
        }
    }
});

frontofficeConfig.loadFile([`${__dirname}/default.json`, `${__dirname}/${frontofficeConfig.get('env')}.json`]);

export default frontofficeConfig;
