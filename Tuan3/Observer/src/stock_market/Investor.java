package stock_market;

public class Investor implements StockObserver {
    private String investorName;

    public Investor(String name) { this.investorName = name; }

    @Override
    public void onPriceChange(String symbol, double oldPrice, double newPrice) {
        double change = ((newPrice - oldPrice) / oldPrice) * 100;
        String sign  = change >= 0 ? "+" : "";
        System.out.printf("  [Investor] %s nhận cảnh báo: %s %s%.2f%% — thực hiện hành động nếu cần\n",
                investorName, symbol, sign, change);
    }
}
