package stock_market;

public interface StockSubject {
    // Đăng ký/huỷ đăng ký observer
    void addObserver(StockObserver o);
    void removeObserver(StockObserver o);

    // Thông báo đến tất cả observer đã đăng ký
    void notifyObservers();
}
