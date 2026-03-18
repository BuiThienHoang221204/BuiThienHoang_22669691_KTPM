package task_management;

import java.util.ArrayList;
import java.util.List;

public class DashboardLogger implements TaskObserver {
    private List<String> entries = new ArrayList<>();

    @Override
    public void onTaskUpdated(TaskEvent e) {
        String record = String.format("[%s] %s: %s -> %s",
                e.getTimestamp(), e.getTaskTitle(),
                e.getOldStatus(), e.getNewStatus());
        entries.add(record);
        System.out.println("  [Dashboard] Lưu activity: " + record);
    }

    public void printLog() {
        System.out.println("\n=== Activity Log ===");
        entries.forEach(line -> System.out.println("  " + line));
    }
}
