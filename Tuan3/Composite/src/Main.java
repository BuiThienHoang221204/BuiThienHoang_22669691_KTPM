public class Main {
    public static void main(String[] args) {

        // --- Khởi tạo các file mẫu ---
        File readmeFile   = new File("README.md",     2048,  "Markdown");
        File mainSrc      = new File("Main.java",     5120,  "Java");
        File cfg          = new File("config.yaml",   1024,  "YAML");
        File logoImg      = new File("logo.png",      40960, "PNG");
        File testFile     = new File("AppTest.java",  3072,  "Java");

        // --- Xây dựng cây thư mục ---
        Directory srcDir  = new Directory("src");
        srcDir.add(mainSrc);

        Directory testDir = new Directory("test");
        testDir.add(testFile);

        Directory assetsDir = new Directory("assets");
        assetsDir.add(logoImg);

        Directory rootProject = new Directory("my-project");
        rootProject.add(readmeFile);
        rootProject.add(cfg);
        rootProject.add(srcDir);
        rootProject.add(testDir);
        rootProject.add(assetsDir);

        // --- In cấu trúc ---
        System.out.println("=== Tree thư mục mẫu ===");
        rootProject.display("");

        // --- Duyệt trực tiếp các children của project ---
        System.out.println("\n=== Liệt kê các thành phần con của project ===");
        for (int i = 0; i < 5; i++) {
            FileSystemComponent comp = rootProject.getChild(i);
            System.out.print("  [" + comp.getClass().getSimpleName() + "] ");
            comp.display("");
        }
    }
}