import java.util.*;

/**
 * Custom Iterator Interface for List Operations
 * This interface defines methods for iterating through lists and performing specific actions
 * such as removing elements based on certain criteria.
 */
interface CustomListIterator<T> {
    /**
     * Checks if there are more elements to iterate over
     * @return true if there are more elements, false otherwise
     */
    boolean hasNext();

    /**
     * Returns the next element in the iteration
     * @return the next element
     * @throws NoSuchElementException if no more elements exist
     */
    T next();

    /**
     * Removes the last element returned by next() from the underlying collection
     * @throws IllegalStateException if next() has not been called or remove() has already been called
     */
    void remove();

    /**
     * Removes all elements that match the given predicate
     * @param condition the condition to test elements against
     * @return the number of elements removed
     */
    int removeIf(java.util.function.Predicate<T> condition);

    /**
     * Performs the given action on each remaining element
     * @param action the action to perform on each element
     */
    void forEachRemaining(java.util.function.Consumer<T> action);
}

/**
 * Implementation of CustomListIterator for String lists
 * Provides functionality to iterate through strings and perform operations like
 * removing specific words or characters.
 */
class StringListIterator implements CustomListIterator<String> {
    private List<String> list;
    private int currentIndex;
    private boolean canRemove;

    /**
     * Constructor to initialize the iterator with a list
     * @param list the list to iterate over
     */
    public StringListIterator(List<String> list) {
        this.list = list;
        this.currentIndex = 0;
        this.canRemove = false;
    }

    /**
     * Checks if there are more elements to iterate over
     * @return true if current index is less than list size
     */
    @Override
    public boolean hasNext() {
        return currentIndex < list.size();
    }

    /**
     * Returns the next element in the iteration
     * @return the next string element
     * @throws NoSuchElementException if no more elements exist
     */
    @Override
    public String next() {
        if (!hasNext()) {
            throw new NoSuchElementException("No more elements in the list");
        }
        canRemove = true;
        return list.get(currentIndex++);
    }

    /**
     * Removes the last element returned by next()
     * @throws IllegalStateException if next() has not been called or remove() has already been called
     */
    @Override
    public void remove() {
        if (!canRemove) {
            throw new IllegalStateException("Cannot remove element. Call next() first.");
        }
        list.remove(--currentIndex);
        canRemove = false;
    }

    /**
     * Removes all elements that match the given predicate
     * @param condition the condition to test elements against
     * @return the number of elements removed
     */
    @Override
    public int removeIf(java.util.function.Predicate<String> condition) {
        int removedCount = 0;
        int originalIndex = currentIndex;

        // Reset iterator to beginning for full scan
        currentIndex = 0;

        while (currentIndex < list.size()) {
            if (condition.test(list.get(currentIndex))) {
                list.remove(currentIndex);
                removedCount++;
                // Don't increment index after removal as elements shift
            } else {
                currentIndex++;
            }
        }

        // Adjust current index if it's beyond the new list size
        currentIndex = Math.min(originalIndex, list.size());
        canRemove = false;

        return removedCount;
    }

    /**
     * Performs the given action on each remaining element
     * @param action the action to perform on each element
     */
    @Override
    public void forEachRemaining(java.util.function.Consumer<String> action) {
        while (hasNext()) {
            action.accept(next());
        }
        canRemove = false;
    }
}

/**
 * Demonstration class showing various iterator operations on string lists
 * Includes examples of removing specific words, characters, and performing transformations
 */
public class ListIterator {

    /**
     * Main method demonstrating iterator interface usage with various operations
     * @param args command line arguments (not used)
     */
    public static void main(String[] args) {
        System.out.println("=== Iterator Interface Demo ===\n");

        // Demo 1: Basic iteration and manual removal
        demonstrateBasicIteration();

        // Demo 2: Remove specific words
        demonstrateWordRemoval();

        // Demo 3: Remove strings containing specific characters
        demonstrateCharacterRemoval();

        // Demo 4: Remove based on length criteria
        demonstrateLengthBasedRemoval();

        // Demo 5: Complex filtering and transformation
        demonstrateComplexOperations();
    }

    /**
     * Demonstrates basic iteration through a list with manual element removal
     */
    private static void demonstrateBasicIteration() {
        System.out.println("1. Basic Iteration and Manual Removal:");
        System.out.println("--------------------------------------");

        List<String> fruits = new ArrayList<>(Arrays.asList(
            "apple", "banana", "orange", "grape", "apple", "kiwi"
        ));

        System.out.println("Original list: " + fruits);

        StringListIterator iterator = new StringListIterator(fruits);

        // Iterate and remove first occurrence of "apple"
        boolean removed = false;
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            if ("apple".equals(fruit) && !removed) {
                iterator.remove();
                System.out.println("Removed: " + fruit);
                removed = true;
            }
        }

        System.out.println("After removing first 'apple': " + fruits);
        System.out.println();
    }

    /**
     * Demonstrates removal of specific words from the list
     */
    private static void demonstrateWordRemoval() {
        System.out.println("2. Remove Specific Words:");
        System.out.println("-------------------------");

        List<String> sentences = new ArrayList<>(Arrays.asList(
            "Hello world", "This is great", "Hello everyone",
            "Great job", "Hello again", "Wonderful work"
        ));

        System.out.println("Original list: " + sentences);

        StringListIterator iterator = new StringListIterator(sentences);

        // Remove all strings containing "Hello"
        int removedCount = iterator.removeIf(s -> s.contains("Hello"));

        System.out.println("Removed " + removedCount + " items containing 'Hello'");
        System.out.println("Updated list: " + sentences);
        System.out.println();
    }

    /**
     * Demonstrates removal of strings containing specific characters
     */
    private static void demonstrateCharacterRemoval() {
        System.out.println("3. Remove Strings with Specific Characters:");
        System.out.println("------------------------------------------");

        List<String> words = new ArrayList<>(Arrays.asList(
            "programming", "java", "python", "javascript",
            "coding", "algorithm", "data", "structure"
        ));

        System.out.println("Original list: " + words);

        StringListIterator iterator = new StringListIterator(words);

        // Remove all strings containing the letter 'a'
        int removedCount = iterator.removeIf(word -> word.toLowerCase().contains("a"));

        System.out.println("Removed " + removedCount + " words containing letter 'a'");
        System.out.println("Updated list: " + words);
        System.out.println();
    }

    /**
     * Demonstrates removal based on string length criteria
     */
    private static void demonstrateLengthBasedRemoval() {
        System.out.println("4. Remove Based on Length Criteria:");
        System.out.println("-----------------------------------");

        List<String> languages = new ArrayList<>(Arrays.asList(
            "C", "C++", "Java", "Python", "JavaScript",
            "Go", "Rust", "TypeScript", "Swift"
        ));

        System.out.println("Original list: " + languages);

        StringListIterator iterator = new StringListIterator(languages);

        // Remove all strings shorter than 4 characters
        int removedCount = iterator.removeIf(lang -> lang.length() < 4);

        System.out.println("Removed " + removedCount + " languages with less than 4 characters");
        System.out.println("Updated list: " + languages);
        System.out.println();
    }

    /**
     * Demonstrates complex filtering and transformation operations
     */
    private static void demonstrateComplexOperations() {
        System.out.println("5. Complex Operations (Filter and Transform):");
        System.out.println("--------------------------------------------");

        List<String> emails = new ArrayList<>(Arrays.asList(
            "user@gmail.com", "admin@company.org", "test@yahoo.com",
            "invalid-email", "support@outlook.com", "info@domain.net"
        ));

        System.out.println("Original email list: " + emails);

        StringListIterator iterator = new StringListIterator(emails);

        // Remove invalid email addresses (those not containing '@' and '.')
        int removedCount = iterator.removeIf(email ->
            !email.contains("@") || !email.contains(".") ||
            email.indexOf("@") > email.lastIndexOf(".")
        );

        System.out.println("Removed " + removedCount + " invalid email addresses");
        System.out.println("Valid emails: " + emails);

        // Use forEachRemaining to display remaining emails in uppercase
        System.out.println("\nRemaining emails in uppercase:");
        StringListIterator displayIterator = new StringListIterator(new ArrayList<>(emails));
        displayIterator.forEachRemaining(email ->
            System.out.println("  " + email.toUpperCase())
        );

        System.out.println();
    }
}