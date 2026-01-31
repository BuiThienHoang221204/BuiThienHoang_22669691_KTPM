const readline = require("readline");

class TaxStrategy {
  calculate(price) {}
}

class VATTax extends TaxStrategy {
  calculate(price) {
    return price * 0.1;
  }
}

class ConsumptionTax extends TaxStrategy {
  calculate(price) {
    return price * 0.05;
  }
}

class ProductState {
  apply(price, taxStrategy) {}
  getName() {}
}

class NormalProductState extends ProductState {
  apply(price, taxStrategy) {
    return price + taxStrategy.calculate(price);
  }
  getName() {
    return "NORMAL PRODUCT";
  }
}

class LuxuryProductState extends ProductState {
  apply(price, taxStrategy) {
    return price + taxStrategy.calculate(price) + 50;
  }
  getName() {
    return "LUXURY PRODUCT";
  }
}

class Product {
  getPrice() {}
}

class BaseProduct extends Product {
  constructor(price) {
    super();
    this.price = price;
  }
  getPrice() {
    return this.price;
  }
}

class TaxDecorator extends Product {
  constructor(product) {
    super();
    this.product = product;
  }
  getPrice() {
    return this.product.getPrice();
  }
}

class SpecialTax extends TaxDecorator {
  getPrice() {
    return super.getPrice() + 30;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n===== TAX CALCULATION SYSTEM =====");
const basePrice = 200;
console.log("💵 Giá gốc:", basePrice);

rl.question(
  "👉 Chọn trạng thái sản phẩm (normal / luxury): ",
  (answer) => {
    let productState;

    if (answer === "normal") {
      productState = new NormalProductState();
    } else if (answer === "luxury") {
      productState = new LuxuryProductState();
    } else {
      console.log("❌ Không hợp lệ, mặc định NORMAL");
      productState = new NormalProductState();
    }

    const taxStrategy = new VATTax();

    console.log("📦 Trạng thái sản phẩm:", productState.getName());

    const priceAfterStateTax =
      productState.apply(basePrice, taxStrategy);

    console.log(
      "➡️ Giá sau thuế theo trạng thái:",
      priceAfterStateTax
    );

    const finalProduct =
      new SpecialTax(new BaseProduct(priceAfterStateTax));

    console.log(
      "💰 Giá cuối cùng sau thuế bổ sung:",
      finalProduct.getPrice()
    );

    rl.close();
  }
);