import java.util.ArrayList;
import java.util.List;

public class Directory implements FileSystemComponent {
    private String dirName;
    private List<FileSystemComponent> entries = new ArrayList<>();

    public Directory(String name) {
        this.dirName = name;
    }

    @Override
    public String getName() {
        return dirName;
    }

    public void add(FileSystemComponent component) {
        entries.add(component);
    }

    public void remove(FileSystemComponent component) {
        entries.remove(component);
    }

    public FileSystemComponent getChild(int index) {
        return entries.get(index);
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "📁 " + dirName + "/");
        for (FileSystemComponent entry : entries) {
            entry.display(indent + "    ");   // đệ quy hiển thị
        }
    }
}
