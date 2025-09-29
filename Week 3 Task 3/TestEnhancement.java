import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

/**
 * Test class to demonstrate the EnhancementRequest annotation
 */
public class TestEnhancement {

    @EnhancementRequest(id = 1, synopsis = "Add user authentication feature")
    public void addUserAuth() {
        System.out.println("Implementing user authentication...");
    }

    @EnhancementRequest(id = 2, synopsis = "Improve database performance", engineer = "Alice Smith")
    public void improveDatabasePerformance() {
        System.out.println("Optimizing database queries...");
    }

    @EnhancementRequest(id = 3, synopsis = "Add dark mode support", engineer = "Bob Johnson", date = "2024-12-01")
    public void addDarkMode() {
        System.out.println("Implementing dark mode...");
    }

    public static void main(String[] args) {
        System.out.println("=== Enhancement Request Annotation Demo ===\n");

        Class<TestEnhancement> clazz = TestEnhancement.class;
        Method[] methods = clazz.getDeclaredMethods();

        for (Method method : methods) {
            if (method.isAnnotationPresent(EnhancementRequest.class)) {
                EnhancementRequest annotation = method.getAnnotation(EnhancementRequest.class);

                System.out.println("Method: " + method.getName());
                System.out.println("  ID: " + annotation.id());
                System.out.println("  Synopsis: " + annotation.synopsis());
                System.out.println("  Engineer: " + annotation.engineer());
                System.out.println("  Date: " + annotation.date());
                System.out.println();
            }
        }

        System.out.println("=== Executing annotated methods ===\n");
        TestEnhancement test = new TestEnhancement();
        test.addUserAuth();
        test.improveDatabasePerformance();
        test.addDarkMode();
    }
}