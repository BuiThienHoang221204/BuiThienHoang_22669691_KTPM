public class File implements FileSystemComponent {
    private String fileName;
    private long bytes;   // bytes
    private String mime;

    public File(String name, long size, String type) {
        this.fileName = name;
        this.bytes = size;
        this.mime = type;
    }

    @Override
    public String getName() {
        return fileName;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "📄 " + fileName
                + "  [" + mime + ", " + bytes + " bytes]");
    }
}
