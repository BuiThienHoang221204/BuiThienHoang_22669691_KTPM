const amqp = require('amqplib');

async function sendMessage() {
  const queue = 'send_email_queue';
  const msg = {
    orderId: 123,
    email: 'thienhoang@gmail.com'
  };

  // 1. Connect RabbitMQ
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();

  // 2. Tạo queue (nếu chưa có)
  await channel.assertQueue(queue, { durable: true });

  // 3. Gửi message
  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(msg)),
    { persistent: true } // đảm bảo không mất message
  );

  console.log('✅ Sent:', msg);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

sendMessage().catch(console.error);
