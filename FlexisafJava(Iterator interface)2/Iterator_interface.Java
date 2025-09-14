import java.util.*;

/**
 * Comprehensive demonstration of Iterator interface with Java Collections
 * Shows safe iteration and modification of Lists, Sets, and Maps
 */
public class Iterator_interface {
    
    public static void main(String[] args) {
        System.out.println("=== Iterator Interface with Java Collections ===\n");
        
        demonstrateListIteration();
        demonstrateSetIteration();
        demonstrateMapIteration();
        demonstrateAdvancedIteratorFeatures();
        demonstrateCommonMistakes();
    }
    
    /**
     * Demonstrates Iterator usage with Lists
     */
    private static void demonstrateListIteration() {
        System.out.println("1. WORKING WITH LISTS");
        System.out.println("====================");
        
        // Create a list with some sample data
        List<String> fruits = new ArrayList<>(Arrays.asList(
            "apple", "banana", "cherry", "date", "elderberry", "fig", "grape"
        ));
        
        System.out.println("Original list: " + fruits);
        
        // Example 1: Basic iteration using Iterator
        System.out.println("\n--- Basic Iterator Traversal ---");
        Iterator<String> basicIterator = fruits.iterator();
        System.out.print("Fruits: ");
        while (basicIterator.hasNext()) {
            String fruit = basicIterator.next();
            System.out.print(fruit + " ");
        }
        System.out.println();
        
        // Example 2: Remove specific words safely
        System.out.println("\n--- Removing words containing 'e' ---");
        Iterator<String> removeIterator = fruits.iterator();
        while (removeIterator.hasNext()) {
            String fruit = removeIterator.next();
            if (fruit.contains("e")) {
                System.out.println("Removing: " + fruit);
                removeIterator.remove(); // Safe removal during iteration
            }
        }
        System.out.println("After removal: " + fruits);
        
        // Example 3: Remove words by length
        List<String> words = new ArrayList<>(Arrays.asList(
            "cat", "elephant", "dog", "hippopotamus", "ant", "butterfly"
        ));
        System.out.println("\n--- Removing long words (>5 characters) ---");
        System.out.println("Original words: " + words);
        
        Iterator<String> lengthIterator = words.iterator();
        while (lengthIterator.hasNext()) {
            String word = lengthIterator.next();
            if (word.length() > 5) {
                System.out.println("Removing long word: " + word);
                lengthIterator.remove();
            }
        }
        System.out.println("After removing long words: " + words);
        
        // Example 4: ListIterator - bidirectional iteration
        System.out.println("\n--- ListIterator (bidirectional) ---");
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        ListIterator<Integer> listIter = numbers.listIterator();
        
        System.out.print("Forward: ");
        while (listIter.hasNext()) {
            System.out.print(listIter.next() + " ");
        }
        
        System.out.print("\nBackward: ");
        while (listIter.hasPrevious()) {
            System.out.print(listIter.previous() + " ");
        }
        System.out.println("\n");
    }
    
    /**
     * Demonstrates Iterator usage with Sets
     */
    private static void demonstrateSetIteration() {
        System.out.println("2. WORKING WITH SETS");
        System.out.println("===================");
        
        // Example 1: HashSet iteration and removal
        Set<String> colors = new HashSet<>(Arrays.asList(
            "red", "green", "blue", "yellow", "orange", "purple", "pink"
        ));
        
        System.out.println("Original colors: " + colors);
        
        System.out.println("\n--- Removing colors starting with 'p' ---");
        Iterator<String> colorIterator = colors.iterator();
        while (colorIterator.hasNext()) {
            String color = colorIterator.next();
            if (color.startsWith("p")) {
                System.out.println("Removing: " + color);
                colorIterator.remove();
            }
        }
        System.out.println("After removal: " + colors);
        
        // Example 2: TreeSet - ordered iteration
        System.out.println("\n--- TreeSet (sorted) iteration ---");
        Set<Integer> sortedNumbers = new TreeSet<>(Arrays.asList(15, 3, 9, 1, 12, 7));
        System.out.println("TreeSet (auto-sorted): " + sortedNumbers);
        
        System.out.println("Removing even numbers:");
        Iterator<Integer> evenIterator = sortedNumbers.iterator();
        while (evenIterator.hasNext()) {
            Integer num = evenIterator.next();
            if (num % 2 == 0) {
                System.out.println("  Removing even number: " + num);
                evenIterator.remove();
            }
        }
        System.out.println("After removing evens: " + sortedNumbers);
        System.out.println();
    }
    
    /**
     * Demonstrates Iterator usage with Maps
     */
    private static void demonstrateMapIteration() {
        System.out.println("3. WORKING WITH MAPS");
        System.out.println("===================");
        
        // Create sample data
        Map<String, Integer> studentGrades = new HashMap<>();
        studentGrades.put("Alice", 92);
        studentGrades.put("Bob", 78);
        studentGrades.put("Charlie", 85);
        studentGrades.put("Diana", 96);
        studentGrades.put("Eve", 72);
        studentGrades.put("Frank", 88);
        
        System.out.println("Original grades: " + studentGrades);
        
        // Example 1: Iterate through entries
        System.out.println("\n--- Iterating through Map entries ---");
        Iterator<Map.Entry<String, Integer>> entryIterator = 
            studentGrades.entrySet().iterator();
        
        while (entryIterator.hasNext()) {
            Map.Entry<String, Integer> entry = entryIterator.next();
            String student = entry.getKey();
            Integer grade = entry.getValue();
            System.out.println(student + ": " + grade + 
                (grade >= 90 ? " (Excellent!)" : grade >= 80 ? " (Good)" : " (Needs improvement)"));
        }
        
        // Example 2: Remove entries based on condition
        System.out.println("\n--- Removing students with grades below 80 ---");
        Iterator<Map.Entry<String, Integer>> removeIterator = 
            studentGrades.entrySet().iterator();
        
        while (removeIterator.hasNext()) {
            Map.Entry<String, Integer> entry = removeIterator.next();
            if (entry.getValue() < 80) {
                System.out.println("Removing " + entry.getKey() + 
                    " (grade: " + entry.getValue() + ")");
                removeIterator.remove();
            }
        }
        System.out.println("After removal: " + studentGrades);
        
        // Example 3: Iterate through keys only
        System.out.println("\n--- Iterating through keys only ---");
        Iterator<String> keyIterator = studentGrades.keySet().iterator();
        System.out.print("Remaining students: ");
        while (keyIterator.hasNext()) {
            System.out.print(keyIterator.next() + " ");
        }
        
        // Example 4: Iterate through values only
        System.out.println("\n--- Iterating through values only ---");
        Iterator<Integer> valueIterator = studentGrades.values().iterator();
        System.out.print("Remaining grades: ");
        while (valueIterator.hasNext()) {
            System.out.print(valueIterator.next() + " ");
        }
        System.out.println("\n");
    }
    
    /**
     * Demonstrates advanced Iterator features
     */
    private static void demonstrateAdvancedIteratorFeatures() {
        System.out.println("4. ADVANCED ITERATOR FEATURES");
        System.out.println("=============================");
        
        // Example 1: Custom iteration logic
        System.out.println("--- Custom word filtering ---");
        List<String> sentences = new ArrayList<>(Arrays.asList(
            "The quick brown fox",
            "jumps over the lazy dog",
            "Programming is fun",
            "Java collections are powerful"
        ));
        
        System.out.println("Original sentences: " + sentences);
        filterAndModifyWords(sentences, "the", "***");
        System.out.println("After filtering 'the': " + sentences);
        
        // Example 2: Multiple iterator operations
        System.out.println("\n--- Multiple operations with iterators ---");
        List<Product> products = Arrays.asList(
            new Product("Laptop", 999.99, "Electronics"),
            new Product("Book", 19.99, "Education"),
            new Product("Phone", 699.99, "Electronics"),
            new Product("Pen", 2.99, "Office"),
            new Product("Monitor", 299.99, "Electronics")
        );
        
        System.out.println("All products:");
        products.forEach(System.out::println);
        
        // Remove expensive electronics
        List<Product> mutableProducts = new ArrayList<>(products);
        removeExpensiveElectronics(mutableProducts, 500.0);
        
        System.out.println("\nAfter removing expensive electronics:");
        mutableProducts.forEach(System.out::println);
        System.out.println();
    }
    
    /**
     * Shows common mistakes when working with iterators
     */
    private static void demonstrateCommonMistakes() {
        System.out.println("5. COMMON MISTAKES AND SOLUTIONS");
        System.out.println("================================");
        
        List<String> items = new ArrayList<>(Arrays.asList("a", "b", "c", "d", "e"));
        
        System.out.println("Original list: " + items);
        
        // WRONG WAY: This will cause ConcurrentModificationException
        System.out.println("\n--- WRONG: Enhanced for-loop with removal ---");
        try {
            for (String item : items) {
                if (item.equals("c")) {
                    // items.remove(item); // This would cause ConcurrentModificationException
                    System.out.println("Cannot safely remove '" + item + "' in enhanced for-loop");
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // CORRECT WAY: Using iterator
        System.out.println("\n--- CORRECT: Using Iterator for safe removal ---");
        Iterator<String> safeIterator = items.iterator();
        while (safeIterator.hasNext()) {
            String item = safeIterator.next();
            if (item.equals("c")) {
                System.out.println("Safely removing: " + item);
                safeIterator.remove();
            }
        }
        System.out.println("After safe removal: " + items);
        
        // Alternative: Using removeIf (Java 8+)
        System.out.println("\n--- ALTERNATIVE: Using removeIf method ---");
        List<String> moreItems = new ArrayList<>(Arrays.asList("x", "y", "z", "y", "w"));
        System.out.println("Before removeIf: " + moreItems);
        moreItems.removeIf(item -> item.equals("y"));
        System.out.println("After removeIf: " + moreItems);
    }
    
    /**
     * Helper method to filter and modify words in sentences
     */
    private static void filterAndModifyWords(List<String> sentences, String targetWord, String replacement) {
        ListIterator<String> iterator = sentences.listIterator();
        while (iterator.hasNext()) {
            String sentence = iterator.next();
            if (sentence.toLowerCase().contains(targetWord.toLowerCase())) {
                String modified = sentence.replaceAll("(?i)" + targetWord, replacement);
                iterator.set(modified); // Replace the current element
            }
        }
    }
    
    /**
     * Helper method to remove expensive electronics
     */
    private static void removeExpensiveElectronics(List<Product> products, double priceThreshold) {
        Iterator<Product> iterator = products.iterator();
        while (iterator.hasNext()) {
            Product product = iterator.next();
            if (product.getCategory().equals("Electronics") && product.getPrice() > priceThreshold) {
                System.out.println("Removing expensive electronic: " + product.getName() + 
                    " ($" + product.getPrice() + ")");
                iterator.remove();
            }
        }
    }
}

/**
 * Simple Product class for demonstration
 */
class Product {
    private String name;
    private double price;
    private String category;
    
    public Product(String name, double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
    
    // Getters
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getCategory() { return category; }
    
    @Override
    public String toString() {
        return String.format("%s - $%.2f (%s)", name, price, category);
    }
}