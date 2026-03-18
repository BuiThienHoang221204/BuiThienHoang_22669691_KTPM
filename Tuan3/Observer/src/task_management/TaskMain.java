package task_management;

public class TaskMain {
    public static void main(String[] args) {
        Task loginTask = new Task("Implement Login Feature", "Alice");
        Task apiTask   = new Task("Build REST API",          "Bob");

        TeamMember    memberAlice     = new TeamMember("Alice");
        TeamMember    memberBob       = new TeamMember("Bob");
        TeamMember    memberCarol     = new TeamMember("Carol (PM)");
        EmailNotifier emailer         = new EmailNotifier("company.vn");
        DashboardLogger logger        = new DashboardLogger();

        // Đăng ký các observer vào task
        loginTask.addObserver(memberAlice);
        loginTask.addObserver(memberBob);
        loginTask.addObserver(memberCarol);
        loginTask.addObserver(emailer);
        loginTask.addObserver(logger);

        apiTask.addObserver(memberCarol);
        apiTask.addObserver(emailer);
        apiTask.addObserver(logger);

        System.out.println("=== Tiến độ Sprint ===");
        loginTask.updateStatus(TaskStatus.IN_PROGRESS, "Alice");
        loginTask.updateStatus(TaskStatus.BLOCKED,     "Alice");
        loginTask.updateStatus(TaskStatus.IN_PROGRESS, "DevOps");
        loginTask.updateStatus(TaskStatus.DONE,        "Alice");

        apiTask.updateStatus(TaskStatus.IN_PROGRESS, "Bob");
        apiTask.updateStatus(TaskStatus.DONE,        "Bob");

        logger.printLog();
    }
}
