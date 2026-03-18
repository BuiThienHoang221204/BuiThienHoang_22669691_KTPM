package stock_market;

public interface StockObserver {
    /**
     * Được gọi khi giá cổ phiếu thay đổi.
     * @param symbol mã cổ phiếu
     * @param oldPrice giá trước
     * @param newPrice giá sau
     */
    void onPriceChange(String symbol, double oldPrice, double newPrice);
}
