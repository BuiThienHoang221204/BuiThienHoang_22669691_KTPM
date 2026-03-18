public class Main {
    public static void main(String[] args) {

  // Khớp nối: cài Adapter vào lớp WebService
  XmlSystem legacyXml = new XmlSystem();
  DataConverter converter = new XmlJsonAdapter(legacyXml);
  WebService apiService = new WebService(converter);

        // ── Case 1: XmlSystem gửi XML lên → WebService cần JSON ──
        String incomingXml = """
                <?xml version="1.0" encoding="UTF-8"?>
                <user>
                  <id>1001</id>
                  <name>Nguyen Van A</name>
                  <email>vana@example.com</email>
                  <role>admin</role>
                </user>
                """;

  System.out.println("══════════════════════════════════");
  System.out.println(" TRƯỜNG HỢP 1: Chuyển XML sang JSON");
  System.out.println("══════════════════════════════════");
  apiService.handleXmlRequest(incomingXml);

        // ── Case 2: WebService xử lý xong, gửi JSON xuống XmlSystem ──
        String responseJson = """
                {
                  "user": {
                    "id": "1001",
                    "name": "Nguyen Van A",
                    "email": "vana@example.com",
                    "role": "admin",
                    "status": "updated"
                  }
                }
                """;

  System.out.println("\n══════════════════════════════════");
  System.out.println(" TRƯỜNG HỢP 2: Chuyển JSON sang XML");
  System.out.println("══════════════════════════════════");
  apiService.sendJsonAsXml(responseJson);

        // ── Case 3: XML không hợp lệ ──
    System.out.println("\n══════════════════════════════════");
    System.out.println(" TRƯỜNG HỢP 3: XML không hợp lệ");
    System.out.println("══════════════════════════════════");
    apiService.handleXmlRequest("<broken>xml<without>closing");
    }
}
