// Simple test to verify the main class works
public class TestRunner {
    public static void main(String[] args) {
        System.out.println("TestRunner is working!");
        System.out.println("Attempting to run AdvancedGenericsDemo...");
        try {
            com.flexisaf.generics.AdvancedGenericsDemo.main(args);
        } catch (Exception e) {
            System.err.println("Error running demo: " + e.getMessage());
            e.printStackTrace();
        }
    }
}