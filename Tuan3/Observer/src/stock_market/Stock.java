package stock_market;

import java.util.ArrayList;
import java.util.List;

public class Stock implements StockSubject {
    private String symbol;
    private double price;
    private double lastPrice;
    private List<StockObserver> subscribers = new ArrayList<>();

    public Stock(String symbol, double initialPrice) {
        this.symbol = symbol;
        this.price  = initialPrice;
        this.lastPrice = initialPrice;
    }

    @Override public void addObserver(StockObserver o)    { subscribers.add(o); }
    @Override public void removeObserver(StockObserver o) { subscribers.remove(o); }

    @Override
    public void notifyObservers() {
        for (StockObserver o : subscribers)
            o.onPriceChange(symbol, lastPrice, price);
    }

    // Khi giá thay đổi → tự động notify
    public void setPrice(double newPrice) {
        this.lastPrice = this.price;
        this.price     = newPrice;
        System.out.println("\n[Stock] Ticker " + symbol + ": giá cũ $" + lastPrice + " -> giá mới $" + price);
        notifyObservers();
    }

    public String getSymbol() { return symbol; }
    public double getPrice()  { return price;  }
}
