package stock_market;

public class StockBot implements StockObserver {
    private String botName;
    private double triggerPercent; // % biến động để kích hoạt

    public StockBot(String name, double threshold) {
        this.botName = name;
        this.triggerPercent = threshold;
    }

    @Override
    public void onPriceChange(String symbol, double oldPrice, double newPrice) {
        double change = Math.abs((newPrice - oldPrice) / oldPrice) * 100;
        if (change >= triggerPercent) {
            String action = newPrice > oldPrice ? "MUA" : "BÁN";
            System.out.printf("  [Bot] %s: biến động %.1f%% ≥ %.1f%% → thực hiện %s cho %s!\n",
                    botName, change, triggerPercent, action, symbol);
        } else {
            System.out.printf("  [Bot] %s: biến động %.1f%% < %.1f%% → không hành động.\n",
                    botName, change, triggerPercent);
        }
    }
}
