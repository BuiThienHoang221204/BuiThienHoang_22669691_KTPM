package stock_market;

public class StockMain {
    public static void main(String[] args) {
        Stock vnmStock   = new Stock("VNM",  85_000);
        Stock vpbStock = new Stock("VPB",  20_500);

        Investor investorAlice = new Investor("Alice");
        Investor investorBob   = new Investor("Bob");
        StockBot alphaBot  = new StockBot("AlphaBot", 3.0);

        vnmStock.addObserver(investorAlice);
        vnmStock.addObserver(investorBob);
        vnmStock.addObserver(alphaBot);
        vpbStock.addObserver(investorAlice);

        System.out.println("=== Phiên giao dịch bắt đầu ===");
        vnmStock.setPrice(87_500);   // +2.9%
        vnmStock.setPrice(81_000);   // -7.4% → bot kích hoạt
        vpbStock.setPrice(21_200); // Alice theo dõi VPB

        // Bob quyết định dừng theo dõi VNM
        System.out.println("\nBob ngừng theo dõi VNM");
        vnmStock.removeObserver(investorBob);
        vnmStock.setPrice(83_000);
    }
}
