/**
 * Annotation type for enhancement requests
 */
public @interface EnhancementRequest {
    /**
     * Unique identifier for the enhancement request
     */
    int id();

    /**
     * Brief description of the enhancement
     */
    String synopsis();

    /**
     * Engineer assigned to the enhancement
     * Default value is "unassigned"
     */
    String engineer() default "unassigned";

    /**
     * Date of the enhancement request
     * Default value is "unknown"
     */
    String date() default "unknown";
}