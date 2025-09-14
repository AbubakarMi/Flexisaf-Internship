import java.util.*;
import java.util.function.Predicate;

/**
 * Generic utility class for counting elements with specific properties
 */
public class generic_property_counter {
    
    /**
     * Generic method to count elements in a collection that satisfy a given predicate
     * @param <T> the type of elements in the collection
     * @param collection the collection to search through
     * @param predicate the condition to test each element against
     * @return the count of elements that satisfy the predicate
     */
    public static <T> int countWithProperty(Collection<T> collection, Predicate<T> predicate) {
        if (collection == null || predicate == null) {
            return 0;
        }
        
        int count = 0;
        for (T element : collection) {
            if (predicate.test(element)) {
                count++;
            }
        }
        return count;
    }
    
    /**
     * Alternative implementation using Java 8 streams (more concise)
     * @param <T> the type of elements in the collection
     * @param collection the collection to search through
     * @param predicate the condition to test each element against
     * @return the count of elements that satisfy the predicate
     */
    public static <T> long countWithPropertyStream(Collection<T> collection, Predicate<T> predicate) {
        if (collection == null || predicate == null) {
            return 0;
        }
        
        return collection.stream()
                        .filter(predicate)
                        .count();
    }
    
    // Example usage and test methods
    public static void main(String[] args) {
        demonstrateUsage();
    }
    
    private static void demonstrateUsage() {
        System.out.println("=== Generic Property Counter Demonstrations ===\n");
        
        // Example 1: Count odd integers
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        int oddCount = countWithProperty(numbers, n -> n % 2 != 0);
        System.out.println("Numbers: " + numbers);
        System.out.println("Count of odd numbers: " + oddCount);
        
        // Example 2: Count prime numbers (simplified check)
        int primeCount = countWithProperty(numbers, generic_property_counter::isPrime);
        System.out.println("Count of prime numbers: " + primeCount);
        
        // Example 3: Count palindromic strings
        List<String> words = Arrays.asList("radar", "hello", "level", "world", "madam", "java");
        int palindromeCount = countWithProperty(words, generic_property_counter::isPalindrome);
        System.out.println("\nWords: " + words);
        System.out.println("Count of palindromes: " + palindromeCount);
        
        // Example 4: Count strings with specific length
        int shortWordsCount = countWithProperty(words, word -> word.length() <= 4);
        System.out.println("Count of words with 4 or fewer characters: " + shortWordsCount);
        
        // Example 5: Working with custom objects
        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 17),
            new Person("Charlie", 30),
            new Person("Diana", 16),
            new Person("Eve", 45)
        );
        
        int adultsCount = countWithProperty(people, person -> person.getAge() >= 18);
        System.out.println("\nPeople: " + people);
        System.out.println("Count of adults (18+): " + adultsCount);
        
        // Example 6: Using streams version
        long seniorCount = countWithPropertyStream(people, person -> person.getAge() >= 30);
        System.out.println("Count of seniors (30+): " + seniorCount);
        
        // Example 7: Count with multiple conditions
        int youngAdultsCount = countWithProperty(people, 
            person -> person.getAge() >= 18 && person.getAge() < 30);
        System.out.println("Count of young adults (18-29): " + youngAdultsCount);
    }
    
    // Helper method for prime checking (simplified)
    private static boolean isPrime(int n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        
        for (int i = 3; i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    // Helper method for palindrome checking
    private static boolean isPalindrome(String str) {
        if (str == null) return false;
        str = str.toLowerCase();
        int left = 0, right = str.length() - 1;
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}

/**
 * Simple Person class for demonstration
 */
class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}

/**
 * Advanced generic counter with bounded type parameters
 */
class BoundedPropertyCounter {
    
    /**
     * Count elements that are greater than a threshold (works with Comparable types)
     * @param <T> type that extends Comparable
     * @param collection the collection to search
     * @param threshold the threshold value
     * @return count of elements greater than threshold
     */
    public static <T extends Comparable<T>> int countGreaterThan(
            Collection<T> collection, T threshold) {
        return countWithProperty(collection, element -> element.compareTo(threshold) > 0);
    }
    
    /**
     * Count elements within a range (inclusive)
     * @param <T> type that extends Comparable
     * @param collection the collection to search
     * @param min minimum value (inclusive)
     * @param max maximum value (inclusive)
     * @return count of elements within range
     */
    public static <T extends Comparable<T>> int countInRange(
            Collection<T> collection, T min, T max) {
        return countWithProperty(collection, 
            element -> element.compareTo(min) >= 0 && element.compareTo(max) <= 0);
    }
    
    // Reuse the generic method from PropertyCounter
    private static <T> int countWithProperty(Collection<T> collection, Predicate<T> predicate) {
        return generic_property_counter.countWithProperty(collection, predicate);
    }
}