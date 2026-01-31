const readline = require('readline');

class Notification {
  async send(message) {
    throw new Error("send() must be implemented");
  }
}

class EmailNotification extends Notification {
  async send(message) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `📧 Email sent: ${message}`;
  }
}

class SMSNotification extends Notification {
  async send(message) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `📱 SMS sent: ${message}`;
  }
}

class NotificationFactory {
  static async createNotification(type) {
    console.log(`🏭 Creating ${type} notification...`);
    await new Promise((resolve) => setTimeout(resolve, 300));

    switch (type.toLowerCase()) {
      case "email":
      case "1":
        return new EmailNotification();
      case "sms":
      case "2":
        return new SMSNotification();
      default:
        throw new Error(`❌ Unknown notification type: ${type}`);
    }
  }
}

// Tạo interface để nhập từ console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askUser() {
  console.log("\n🌟 FACTORY PATTERN - Notification System");
  console.log("═".repeat(40));
  console.log("📋 Chọn loại thông báo:");
  console.log("1. Email");
  console.log("2. SMS");
  console.log("0. Thoát");
  console.log("─".repeat(40));
  
  rl.question("Nhập lựa chọn của bạn (1/2/0): ", async (choice) => {
    try {
      if (choice === "0") {
        console.log("👋 Tạm biệt!");
        rl.close();
        return;
      }

      const typeMap = {
        "1": "email",
        "2": "sms"
      };

      const type = typeMap[choice] || choice;
      
      if (!typeMap[choice] && !["email", "sms"].includes(choice.toLowerCase())) {
        console.log(`❌ Lựa chọn không hợp lệ: ${choice}`);
        askUser();
        return;
      }

      // Tạo notification và gửi
      const notifier = await NotificationFactory.createNotification(type);
      
      rl.question("Nhập nội dung tin nhắn: ", async (message) => {
        console.log("📤 Đang gửi...");
        const result = await notifier.send(message || "Hello Design Patterns");
        console.log(`✅ ${result}`);
        
        // Hỏi có muốn tiếp tục không
        rl.question("\nBạn có muốn gửi thông báo khác không? (y/n): ", (answer) => {
          if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            askUser();
          } else {
            console.log("👋 Tạm biệt!");
            rl.close();
          }
        });
      });

    } catch (error) {
      console.log(`❌ Lỗi: ${error.message}`);
      askUser();
    }
  });
}

// Bắt đầu chương trình
askUser();