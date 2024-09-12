import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand';

ConfigureRabbitMQCommand.run()
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('RabbitMQ Configuration success');
        process.exit(0);
    })
    .catch(error => {
        // eslint-disable-next-line no-console
        console.log('RabbitMQ Configuration fail', error);
        process.exit(1);
    });
