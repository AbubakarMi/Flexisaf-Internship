import java.lang.annotation.*;
import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * Custom annotation for enhancement requests with specified elements and defaults
 */
@Retention(RetentionPolicy.RUNTIME)  // Available at runtime for reflection
@Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})  // Can be applied to classes, methods, and fields
@Documented  // Include in JavaDoc
@Inherited   // Inherited by subclasses
@interface EnhancementRequest {
    
    /**
     * Unique identifier for the enhancement request
     * @return the enhancement ID
     */
    String id();
    
    /**
     * Brief description of the enhancement
     * @return the synopsis of the enhancement
     */
    String synopsis();
    
    /**
     * Engineer responsible for the enhancement
     * Default value is "unassigned"
     * @return the engineer name
     */
    String engineer() default "unassigned";
    
    /**
     * Date of the enhancement request
     * Default value is "unknown"
     * @return the date string
     */
    String date() default "unknown";
    
    /**
     * Priority level of the enhancement (optional additional element)
     * @return the priority level
     */
    Priority priority() default Priority.MEDIUM;
    
    /**
     * Tags for categorizing the enhancement (optional additional element)
     * @return array of tags
     */
    String[] tags() default {};
}

/**
 * Enum for enhancement priority levels
 */
enum Priority {
    LOW, MEDIUM, HIGH, CRITICAL
}

/**
 * Demonstration class showing various uses of the EnhancementRequest annotation
 */
@EnhancementRequest(
    id = "ENH-2024-001", 
    synopsis = "Improve user authentication system",
    engineer = "Alice Johnson",
    date = "2024-03-15",
    priority = Priority.HIGH,
    tags = {"security", "authentication", "user-experience"}
)
public class EnhancementRequestDemo {
    
    /**
     * Field-level enhancement request with minimal information
     */
    @EnhancementRequest(
        id = "ENH-2024-002",
        synopsis = "Add caching mechanism for user preferences"
    )
    private UserPreferences userPrefs;
    
    /**
     * Method with enhancement request using default values
     */
    @EnhancementRequest(
        id = "ENH-2024-003",
        synopsis = "Optimize database query performance"
    )
    public void optimizeQueries() {
        System.out.println("Executing optimized database queries...");
    }
    
    /**
     * Method with fully specified enhancement request
     */
    @EnhancementRequest(
        id = "ENH-2024-004",
        synopsis = "Implement real-time notifications",
        engineer = "Bob Smith",
        date = "2024-03-20",
        priority = Priority.CRITICAL,
        tags = {"real-time", "notifications", "websockets"}
    )
    public void implementNotifications() {
        System.out.println("Implementing real-time notification system...");
    }
    
    /**
     * Method with partial specification (some defaults used)
     */
    @EnhancementRequest(
        id = "ENH-2024-005",
        synopsis = "Add multi-language support",
        engineer = "Charlie Davis",
        tags = {"i18n", "localization"}
    )
    public void addInternationalization() {
        System.out.println("Adding internationalization support...");
    }
    
    public static void main(String[] args) {
        System.out.println("=== Enhancement Request Annotation Demo ===\n");
        
        demonstrateAnnotationReflection();
        demonstrateAnnotationProcessing();
        demonstrateDefaultValues();
    }
    
    /**
     * Demonstrates reading annotations using reflection
     */
    private static void demonstrateAnnotationReflection() {
        System.out.println("1. ANNOTATION REFLECTION DEMO");
        System.out.println("=============================");
        
        Class<?> clazz = EnhancementRequestDemo.class;
        
        // Check if class has the annotation
        if (clazz.isAnnotationPresent(EnhancementRequest.class)) {
            EnhancementRequest classAnnotation = clazz.getAnnotation(EnhancementRequest.class);
            System.out.println("Class-level Enhancement Request:");
            printEnhancementDetails(classAnnotation);
            System.out.println();
        }
        
        // Check methods for annotations
        System.out.println("Method-level Enhancement Requests:");
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            if (method.isAnnotationPresent(EnhancementRequest.class)) {
                EnhancementRequest methodAnnotation = method.getAnnotation(EnhancementRequest.class);
                System.out.println("\nMethod: " + method.getName());
                printEnhancementDetails(methodAnnotation);
            }
        }
        System.out.println();
    }
    
    /**
     * Helper method to print enhancement request details
     */
    private static void printEnhancementDetails(EnhancementRequest enhancement) {
        System.out.println("  ID: " + enhancement.id());
        System.out.println("  Synopsis: " + enhancement.synopsis());
        System.out.println("  Engineer: " + enhancement.engineer());
        System.out.println("  Date: " + enhancement.date());
        System.out.println("  Priority: " + enhancement.priority());
        System.out.println("  Tags: " + Arrays.toString(enhancement.tags()));
    }
    
    /**
     * Demonstrates annotation processing and validation
     */
    private static void demonstrateAnnotationProcessing() {
        System.out.println("2. ANNOTATION PROCESSING DEMO");
        System.out.println("=============================");
        
        EnhancementRequestProcessor processor = new EnhancementRequestProcessor();
        processor.processClass(EnhancementRequestDemo.class);
        System.out.println();
    }
    
    /**
     * Demonstrates default value behavior
     */
    private static void demonstrateDefaultValues() {
        System.out.println("3. DEFAULT VALUES DEMONSTRATION");
        System.out.println("===============================");
        
        try {
            Method method = EnhancementRequestDemo.class.getMethod("optimizeQueries");
            EnhancementRequest annotation = method.getAnnotation(EnhancementRequest.class);
            
            System.out.println("Method with minimal annotation values:");
            System.out.println("  ID: " + annotation.id() + " (required - specified)");
            System.out.println("  Synopsis: " + annotation.synopsis() + " (required - specified)");
            System.out.println("  Engineer: " + annotation.engineer() + " (default value used)");
            System.out.println("  Date: " + annotation.date() + " (default value used)");
            System.out.println("  Priority: " + annotation.priority() + " (default value used)");
            System.out.println("  Tags: " + Arrays.toString(annotation.tags()) + " (default empty array)");
            
        } catch (NoSuchMethodException e) {
            System.out.println("Method not found: " + e.getMessage());
        }
        System.out.println();
    }
}

/**
 * Processor class for handling EnhancementRequest annotations
 */
class EnhancementRequestProcessor {
    
    public void processClass(Class<?> clazz) {
        System.out.println("Processing enhancement requests for class: " + clazz.getSimpleName());
        
        // Process class-level annotation
        if (clazz.isAnnotationPresent(EnhancementRequest.class)) {
            EnhancementRequest enhancement = clazz.getAnnotation(EnhancementRequest.class);
            validateAndReport(enhancement, "Class: " + clazz.getSimpleName());
        }
        
        // Process method-level annotations
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            if (method.isAnnotationPresent(EnhancementRequest.class)) {
                EnhancementRequest enhancement = method.getAnnotation(EnhancementRequest.class);
                validateAndReport(enhancement, "Method: " + method.getName());
            }
        }
    }
    
    private void validateAndReport(EnhancementRequest enhancement, String context) {
        System.out.println("\n" + context);
        System.out.println("  Enhancement ID: " + enhancement.id());
        
        // Validate required fields
        if (enhancement.id().trim().isEmpty()) {
            System.out.println("  ⚠️  WARNING: Enhancement ID is empty!");
        }
        
        if (enhancement.synopsis().trim().isEmpty()) {
            System.out.println("  ⚠️  WARNING: Synopsis is empty!");
        }
        
        // Report assignment status
        if ("unassigned".equals(enhancement.engineer())) {
            System.out.println("  📋 Status: Unassigned (needs engineer)");
        } else {
            System.out.println("  👨‍💻 Assigned to: " + enhancement.engineer());
        }
        
        // Report date status
        if ("unknown".equals(enhancement.date())) {
            System.out.println("  📅 Date: Not specified");
        } else {
            System.out.println("  📅 Date: " + enhancement.date());
        }
        
        // Report priority
        System.out.println("  🎯 Priority: " + enhancement.priority());
        
        // Report tags
        if (enhancement.tags().length > 0) {
            System.out.println("  🏷️  Tags: " + String.join(", ", enhancement.tags()));
        }
    }
}

/**
 * Simple class for demonstration of field-level annotation
 */
class UserPreferences {
    private String theme;
    private String language;
    private boolean notifications;
    
    // Constructor, getters, setters would go here
    public UserPreferences() {
        this.theme = "default";
        this.language = "en";
        this.notifications = true;
    }
}

/**
 * Additional examples showing different annotation usage patterns
 */
class MoreEnhancementExamples {
    
    /**
     * Critical bug fix marked as enhancement
     */
    @EnhancementRequest(
        id = "ENH-2024-006",
        synopsis = "Fix memory leak in data processing module",
        engineer = "Diana Wilson",
        date = "2024-03-22",
        priority = Priority.CRITICAL,
        tags = {"bugfix", "memory", "performance"}
    )
    public void fixMemoryLeak() {
        // Implementation would go here
    }
    
    /**
     * Future enhancement with no assignment yet
     */
    @EnhancementRequest(
        id = "ENH-2024-007",
        synopsis = "Add machine learning recommendations",
        priority = Priority.LOW,
        tags = {"ai", "ml", "recommendations", "future"}
    )
    public void addMLRecommendations() {
        // Future implementation
    }
    
    /**
     * Quick enhancement with minimal details
     */
    @EnhancementRequest(
        id = "ENH-2024-008",
        synopsis = "Update copyright notices"
    )
    public void updateCopyright() {
        // Simple task
    }
}