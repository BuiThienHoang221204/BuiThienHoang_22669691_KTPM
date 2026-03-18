import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayInputStream;
import java.io.StringWriter;
import java.util.LinkedHashMap;
import java.util.Map;

public class XmlSystem {
    /** Chuyển XML thành Map phẳng (key-value) */
    public Map<String, String> parseXml(String xml) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(new ByteArrayInputStream(xml.getBytes()));
        doc.getDocumentElement().normalize();

        Map<String, String> out = new LinkedHashMap<>();
        NodeList children = doc.getDocumentElement().getChildNodes();
        for (int i = 0; i < children.getLength(); i++) {
            Node node = children.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                out.put(node.getNodeName(), node.getTextContent().trim());
            }
        }
        System.out.println("  [XmlSystem] Đã parse XML, trường tìm thấy: " + out.size());
        return out;
    }

    /** Dựng chuỗi XML từ Map (rootTag là tên node gốc) */
    public String buildXml(String rootTag, Map<String, Object> data) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.newDocument();

        Element root = doc.createElement(rootTag);
        doc.appendChild(root);

        for (Map.Entry<String, Object> e : data.entrySet()) {
            Element el = doc.createElement(e.getKey());
            el.appendChild(doc.createTextNode(String.valueOf(e.getValue())));
            root.appendChild(el);
        }

        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer = tf.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
        StringWriter sw = new StringWriter();
        transformer.transform(new DOMSource(doc), new StreamResult(sw));

        System.out.println("  [XmlSystem] Đã xây dựng XML (root: " + rootTag + ")");
        return sw.toString();
    }

    /** Kiểm tra cú pháp XML cơ bản */
    public boolean validateXml(String xml) {
        try {
            DocumentBuilderFactory.newInstance().newDocumentBuilder()
                    .parse(new ByteArrayInputStream(xml.getBytes()));
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
