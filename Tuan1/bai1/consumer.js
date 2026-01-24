const amqp = require('amqplib');

async function receiveMessage() {
  const queue = 'send_email_queue';

  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  console.log('📥 Waiting for messages...');

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log('📧 Receive job:', data);

      // giả lập gửi email chậm
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log(`✅ Email sent to ${data.email} for order ${data.orderId}`);

      // báo RabbitMQ là xử lý xong
      channel.ack(msg);
    }
  });
}

receiveMessage().catch(console.error);
