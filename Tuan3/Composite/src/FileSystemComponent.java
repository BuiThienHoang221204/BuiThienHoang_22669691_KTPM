public interface FileSystemComponent {
    /** Hiển thị component (có thể là file hoặc thư mục) với indent */
    void display(String indent);

    /** Trả về tên của component */
    String getName();
}
