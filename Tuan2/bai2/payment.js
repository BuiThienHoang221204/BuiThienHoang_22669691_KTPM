const readline = require("readline");

class PaymentStrategy {
  pay(amount) {}
  getName() {}
}

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`💳 Thanh toán bằng THẺ TÍN DỤNG: ${amount}`);
  }
  getName() {
    return "CREDIT CARD";
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`🅿️ Thanh toán bằng PAYPAL: ${amount}`);
  }
  getName() {
    return "PAYPAL";
  }
}

class PaymentDecorator extends PaymentStrategy {
  constructor(payment) {
    super();
    this.payment = payment;
  }

  pay(amount) {
    this.payment.pay(amount);
  }

  getName() {
    return this.payment.getName();
  }
}

class ProcessingFee extends PaymentDecorator {
  pay(amount) {
    console.log("➕ Phí xử lý: +10");
    super.pay(amount + 10);
  }
}

class Discount extends PaymentDecorator {
  pay(amount) {
    console.log("➖ Mã giảm giá: -20");
    super.pay(amount - 20);
  }
}

class PaymentState {
  handle() {}
  getName() {}
}

class PendingState extends PaymentState {
  handle() {
    console.log("⏳ Trạng thái: Đang chờ thanh toán...");
  }
  getName() {
    return "PENDING";
  }
}

class CompletedState extends PaymentState {
  handle() {
    console.log("✅ Trạng thái: Thanh toán thành công!");
  }
  getName() {
    return "COMPLETED";
  }
}

class FailedState extends PaymentState {
  handle() {
    console.log("❌ Trạng thái: Thanh toán thất bại!");
  }
  getName() {
    return "FAILED";
  }
}

class PaymentContext {
  constructor() {
    this.state = new PendingState();
  }

  setState(state) {
    this.state = state;
    console.log("🔁 Chuyển trạng thái:", state.getName());
  }

  process() {
    this.state.handle();
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n===== PAYMENT SYSTEM =====");

const amount = 200;
console.log("💵 Số tiền cần thanh toán:", amount);

rl.question(
  "👉 Chọn phương thức thanh toán (card / paypal): ",
  (method) => {
    let payment;

    if (method === "card") {
      payment = new CreditCardPayment();
    } else if (method === "paypal") {
      payment = new PayPalPayment();
    } else {
      console.log("❌ Không hợp lệ, mặc định CREDIT CARD");
      payment = new CreditCardPayment();
    }

    rl.question(
      "👉 Có thêm phí xử lý không? (yes / no): ",
      (feeAnswer) => {
        if (feeAnswer === "yes") {
          payment = new ProcessingFee(payment);
        }

        rl.question(
          "👉 Có áp dụng mã giảm giá không? (yes / no): ",
          (discountAnswer) => {
            if (discountAnswer === "yes") {
              payment = new Discount(payment);
            }

            const paymentContext = new PaymentContext();
            paymentContext.process();

            console.log("🚀 Bắt đầu thanh toán bằng:", payment.getName());
            payment.pay(amount);

            paymentContext.setState(new CompletedState());
            paymentContext.process();

            rl.close();
          }
        );
      }
    );
  }
);