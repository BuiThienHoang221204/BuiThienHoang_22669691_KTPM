package task_management;

public interface TaskObserver {
    /** Được gọi khi task có thay đổi */
    void onTaskUpdated(TaskEvent event);
}
