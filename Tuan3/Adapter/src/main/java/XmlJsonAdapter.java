import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class XmlJsonAdapter implements DataConverter {
    private final XmlSystem legacyXml;
    private final ObjectMapper mapper;

    public XmlJsonAdapter(XmlSystem xmlSystem) {
        this.legacyXml = xmlSystem;
        this.mapper = new ObjectMapper();
    }

    /**
     * Chuyển đổi XML sang JSON (dùng khi hệ thống cũ gửi XML)
     */
    @Override
    public String toJson(String xmlInput) throws Exception {
        System.out.println("  [Adapter] Bắt đầu chuyển XML -> JSON...");

        // 1) Kiểm tra tính hợp lệ của XML
        if (!legacyXml.validateXml(xmlInput)) {
            throw new IllegalArgumentException("Dữ liệu XML không hợp lệ");
        }

        // 2) Parse XML thành Map phẳng
        Map<String, String> parsed = legacyXml.parseXml(xmlInput);

        // 3) Dùng Jackson để serialize Map -> JSON đẹp
        String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parsed);

        System.out.println("  [Adapter] Hoàn tất: XML -> JSON");
        return json;
    }

    /**
     * Chuyển JSON sang XML để gửi về hệ thống legacy
     */
    @Override
    @SuppressWarnings("unchecked")
    public String toXml(String jsonInput) throws Exception {
        System.out.println("  [Adapter] Bắt đầu chuyển JSON -> XML...");

        // 1) Parse JSON thành Map
        Map<String, Object> data = mapper.readValue(jsonInput, Map.class);

        // 2) Tìm tag gốc nếu cấu trúc là { root: { ... } }
        String root = "root";
        if (data.size() == 1) {
            Object maybeInner = data.values().iterator().next();
            if (maybeInner instanceof Map) {
                root = data.keySet().iterator().next();
                data = (Map<String, Object>) maybeInner;
            }
        }

        // 3) Dùng XmlSystem để dựng XML
        String xml = legacyXml.buildXml(root, data);

        System.out.println("  [Adapter] Hoàn tất: JSON -> XML");
        return xml;
    }
}
