public class WebService {
    private final DataConverter converter;

    public WebService(DataConverter converter) {
        this.converter = converter;
    }

    /** Tiếp nhận payload XML từ hệ thống legacy và xử lý dưới dạng JSON */
    public void handleXmlRequest(String xmlData) {
        System.out.println("\n[WebService] Nhận payload XML từ client...");
        try {
            String json = converter.toJson(xmlData);
            System.out.println("[WebService] Chuyển đổi sang JSON thành công:\n" + json);
        } catch (Exception e) {
            System.out.println("[WebService] Phát hiện lỗi: " + e.getMessage());
        }
    }

    /** Chuyển response JSON thành XML rồi gửi xuống hệ thống cũ */
    public void sendJsonAsXml(String jsonData) {
        System.out.println("\n[WebService] Chuẩn bị gửi JSON dưới dạng XML...");
        try {
            String xml = converter.toXml(jsonData);
            System.out.println("[WebService] Đã chuyển JSON → XML:\n" + xml);
        } catch (Exception e) {
            System.out.println("[WebService] Phát hiện lỗi: " + e.getMessage());
        }
    }
}
