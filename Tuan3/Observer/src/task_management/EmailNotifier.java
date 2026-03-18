package task_management;

public class EmailNotifier implements TaskObserver {
    private String domain;

    public EmailNotifier(String domain) { this.domain = domain; }

    @Override
    public void onTaskUpdated(TaskEvent e) {
        // Gửi thông báo email khi task hoàn thành hoặc bị chặn
        if (e.getNewStatus() == TaskStatus.DONE || e.getNewStatus() == TaskStatus.BLOCKED) {
            System.out.printf("  [Email] Gửi tới team@%s: Task \"%s\" chuyển sang %s (cập nhật bởi %s)\n",
                    domain, e.getTaskTitle(), e.getNewStatus(), e.getChangedBy());
        }
    }
}
