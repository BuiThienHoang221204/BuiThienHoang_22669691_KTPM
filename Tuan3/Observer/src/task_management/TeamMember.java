package task_management;

public class TeamMember implements TaskObserver {
    private String memberName;

    public TeamMember(String name) { this.memberName = name; }

    @Override
    public void onTaskUpdated(TaskEvent e) {
        System.out.printf("  [%s] Thông báo lúc %s: '%s' → %s\n",
                memberName, e.getTimestamp(), e.getTaskTitle(), e.getNewStatus());
    }
}
