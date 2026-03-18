package task_management;

public interface TaskSubject {
    // Đăng ký observer
    void addObserver(TaskObserver o);
    // Huỷ đăng ký
    void removeObserver(TaskObserver o);
    // Thông báo tới tất cả observer
    void notifyObservers(TaskEvent event);
}
