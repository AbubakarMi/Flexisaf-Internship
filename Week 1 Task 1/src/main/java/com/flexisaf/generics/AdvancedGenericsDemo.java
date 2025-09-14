package com.flexisaf.generics;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.math.BigDecimal;

/**
 * Comprehensive demonstration of advanced Java generics concepts through
 * practical examples using the GenericPropertyCounter framework.
 *
 * This demo showcases:
 * - Bounded type parameters and wildcards
 * - Type inference and erasure concepts
 * - Generic method composition
 * - Real-world applications of generics
 * - Performance considerations and caching
 * - Advanced collection operations
 *
 * @author Flexisaf Internship Candidate - Advanced Generics Challenge
 * @version 3.0
 */
public class AdvancedGenericsDemo {

    // Constants for demo data generation
    private static final int DEMO_SIZE = 1000;
    private static final Random RANDOM = new Random(42); // Seed for reproducible results

    public static void main(String[] args) {
        System.out.println("🚀 ADVANCED JAVA GENERICS DEMONSTRATION");
        System.out.println("=" .repeat(60));
        System.out.println("Showcasing enterprise-grade generic programming concepts\n");

        try {
            // Execute all demonstration scenarios
            demonstrateBasicCounting();
            demonstrateAdvancedNumericalProperties();
            demonstrateStringOperations();
            demonstrateCollectionOperations();
            demonstrateGenericComposition();
            demonstratePerformanceOptimizations();
            demonstrateBoundedTypeParameters();
            demonstrateWildcardUsage();
            demonstrateRealWorldScenarios();

            System.out.println("\n✅ ALL DEMONSTRATIONS COMPLETED SUCCESSFULLY!");
            System.out.println("This implementation demonstrates mastery of:");
            System.out.println("• Generic type safety and bounded parameters");
            System.out.println("• Wildcard usage (PECS principle)");
            System.out.println("• Type inference and erasure");
            System.out.println("• Functional programming integration");
            System.out.println("• Performance optimization techniques");
            System.out.println("• Thread-safe generic implementations");

        } catch (Exception e) {
            System.err.println("❌ Demo execution failed: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // Clean up resources
            GenericPropertyCounter.clearCache();
            PropertyCheckers.clearCaches();
        }
    }

    /**
     * Demonstrates basic counting operations with different data types.
     * Shows type safety and basic generic method usage.
     */
    private static void demonstrateBasicCounting() {
        printSectionHeader("Basic Counting Operations");

        // Generate test data with different types
        List<Integer> numbers = IntStream.rangeClosed(1, 100)
                .boxed()
                .collect(Collectors.toList());

        List<String> words = Arrays.asList(
            "radar", "hello", "madam", "world", "level", "java", "noon", "generics",
            "racecar", "algorithm", "palindrome", "civic", "refer", "stats"
        );

        // Count odd numbers
        long oddCount = GenericPropertyCounter.count(numbers, PropertyCheckers.oddNumbers());
        System.out.printf("📊 Odd numbers (1-100): %d out of %d (%.1f%%)\n",
                         oddCount, numbers.size(), (oddCount * 100.0) / numbers.size());

        // Count even numbers using method composition
        long evenCount = GenericPropertyCounter.count(numbers, PropertyCheckers.evenNumbers());
        System.out.printf("📊 Even numbers (1-100): %d out of %d (%.1f%%)\n",
                         evenCount, numbers.size(), (evenCount * 100.0) / numbers.size());

        // Count prime numbers
        long primeCount = GenericPropertyCounter.count(numbers, PropertyCheckers.primeNumbers());
        System.out.printf("📊 Prime numbers (1-100): %d out of %d (%.1f%%)\n",
                         primeCount, numbers.size(), (primeCount * 100.0) / numbers.size());

        // Count palindromes
        long palindromeCount = GenericPropertyCounter.count(words, PropertyCheckers.palindromes());
        System.out.printf("📊 Palindromes in word list: %d out of %d (%.1f%%)\n",
                         palindromeCount, words.size(), (palindromeCount * 100.0) / words.size());

        System.out.println();
    }

    /**
     * Demonstrates advanced numerical property checking with mathematical concepts.
     * Shows bounded type parameters and mathematical algorithm integration.
     */
    private static void demonstrateAdvancedNumericalProperties() {
        printSectionHeader("Advanced Numerical Properties");

        // Generate larger dataset for more interesting results
        List<Integer> largeNumbers = IntStream.rangeClosed(1, 1000)
                .boxed()
                .collect(Collectors.toList());

        // Perfect numbers demonstration
        long perfectCount = GenericPropertyCounter.count(largeNumbers, PropertyCheckers.perfectNumbers());
        System.out.printf("🔢 Perfect numbers (1-1000): %d\n", perfectCount);

        // Show the actual perfect numbers found
        var perfectNumbers = GenericPropertyCounter.partitionByProperty(largeNumbers, PropertyCheckers.perfectNumbers())
                .get(true);
        System.out.printf("   Perfect numbers found: %s\n", perfectNumbers);

        // Range-based counting with bounded generics
        PropertyChecker<Integer> inRange = PropertyCheckers.inRange(100, 200);
        long rangeCount = GenericPropertyCounter.count(largeNumbers, inRange);
        System.out.printf("🔢 Numbers in range [100-200]: %d\n", rangeCount);

        // Composite properties: odd AND prime
        long oddPrimeCount = GenericPropertyCounter.countMultipleProperties(
            largeNumbers,
            PropertyCheckers.oddNumbers(),
            PropertyCheckers.primeNumbers()
        );
        System.out.printf("🔢 Numbers that are both odd AND prime: %d\n", oddPrimeCount);

        // Using detailed counting for comprehensive analysis
        var primeAnalysis = GenericPropertyCounter.countWithDetails(largeNumbers, PropertyCheckers.primeNumbers());
        System.out.printf("📈 Prime Analysis: %d primes out of %d numbers (%.2f%%)\n",
                         primeAnalysis.getMatchCount(), primeAnalysis.getTotalCount(), primeAnalysis.getPercentage());

        System.out.println();
    }

    /**
     * Demonstrates string operations with pattern matching and validation.
     * Shows generic methods with String-specific operations.
     */
    private static void demonstrateStringOperations() {
        printSectionHeader("String Pattern Operations");

        List<String> testStrings = Arrays.asList(
            "radar", "Madam", "A man a plan a canal Panama", "hello world",
            "racecar", "java@example.com", "test@domain.org", "invalid-email",
            "noon", "Level", "programming", "user@company.com"
        );

        // Palindrome detection (case-insensitive)
        long palindromes = GenericPropertyCounter.count(testStrings, PropertyCheckers.palindromes());
        System.out.printf("📝 Palindromes found: %d\n", palindromes);

        // Valid email addresses
        long validEmails = GenericPropertyCounter.count(testStrings, PropertyCheckers.validEmails());
        System.out.printf("📧 Valid email addresses: %d\n", validEmails);

        // Strings containing specific pattern
        PropertyChecker<String> containsJava = PropertyCheckers.containsPattern("java", true);
        long javaStrings = GenericPropertyCounter.count(testStrings, containsJava);
        System.out.printf("☕ Strings containing 'java': %d\n", javaStrings);

        // String length analysis
        PropertyChecker<String> longStrings = PropertyCheckers.hasLength(5);
        var lengthPartition = GenericPropertyCounter.partitionByProperty(testStrings, longStrings);
        System.out.printf("📏 Strings with exactly 5 characters: %d\n", lengthPartition.get(true).size());
        System.out.printf("    Examples: %s\n", lengthPartition.get(true));

        System.out.println();
    }

    /**
     * Demonstrates operations on collections of various types.
     * Shows wildcard usage and collection-specific generics.
     */
    private static void demonstrateCollectionOperations() {
        printSectionHeader("Collection Operations");

        // Create collections of different sizes
        List<Collection<Integer>> collections = Arrays.asList(
            Arrays.asList(1, 2, 3, 4, 5),           // Size 5
            new ArrayList<>(),                        // Size 0
            Collections.singletonList(42),           // Size 1
            IntStream.range(1, 11).boxed().collect(Collectors.toList()), // Size 10
            new HashSet<>(Arrays.asList(1, 2, 3)),   // Size 3
            Arrays.asList(10, 20, 30, 40, 50, 60)   // Size 6
        );

        // Count empty collections
        long emptyCount = GenericPropertyCounter.count(collections, PropertyCheckers.emptyCollections());
        System.out.printf("📦 Empty collections: %d out of %d\n", emptyCount, collections.size());

        // Count collections with specific size
        PropertyChecker<Collection<Integer>> sizeFive = PropertyCheckers.hasSize(5);
        long sizeFiveCount = GenericPropertyCounter.count(collections, sizeFive);
        System.out.printf("📦 Collections with size 5: %d\n", sizeFiveCount);

        // Demonstrate generic transformation counting
        long totalElements = GenericPropertyCounter.countAfterTransform(
            collections,
            Collection::size,
            size -> size > 0
        );
        System.out.printf("📦 Collections with positive size: %d\n", totalElements);

        System.out.println();
    }

    /**
     * Demonstrates advanced generic composition and functional programming.
     * Shows method chaining and complex property combinations.
     */
    private static void demonstrateGenericComposition() {
        printSectionHeader("Generic Composition & Functional Programming");

        List<Integer> numbers = IntStream.rangeClosed(1, 200).boxed().collect(Collectors.toList());

        // Complex composition: (odd OR even) AND prime AND in range [10, 100]
        PropertyChecker<Integer> complexChecker = PropertyCheckers.anyOf(
            PropertyCheckers.oddNumbers(),
            PropertyCheckers.evenNumbers()
        ).and(PropertyCheckers.primeNumbers())
         .and(PropertyCheckers.inRange(10, 100));

        long complexCount = GenericPropertyCounter.count(numbers, complexChecker);
        System.out.printf("🔗 Numbers satisfying complex conditions: %d\n", complexCount);

        // Demonstrate negation
        PropertyChecker<Integer> notPrime = PropertyCheckers.primeNumbers().negate();
        long compositeCount = GenericPropertyCounter.count(numbers, notPrime);
        System.out.printf("🔗 Non-prime numbers: %d\n", compositeCount);

        // Chain multiple operations - using Integer-specific checkers
        PropertyChecker<Integer> rangeChecker = PropertyCheckers.inRange(1, 50);
        PropertyChecker<Integer> chainedChecker = PropertyCheckers.<Integer>positiveNumbers()
                .and(rangeChecker)
                .or(PropertyCheckers.perfectNumbers());

        var chainedResults = GenericPropertyCounter.countWithDetails(numbers, chainedChecker);
        System.out.printf("🔗 Chained operations result: %s\n", chainedResults);

        System.out.println();
    }

    /**
     * Demonstrates performance optimizations and caching mechanisms.
     * Shows enterprise-grade considerations for large-scale applications.
     */
    private static void demonstratePerformanceOptimizations() {
        printSectionHeader("Performance Optimizations & Caching");

        List<Integer> largeDataset = IntStream.rangeClosed(1, 10000).boxed().collect(Collectors.toList());

        // Measure performance with and without caching
        System.out.println("⚡ Performance comparison (10,000 elements):");

        // First run - populate cache
        long startTime = System.nanoTime();
        long primeCount1 = GenericPropertyCounter.countWithCache(
            largeDataset, PropertyCheckers.primeNumbers(), "large_prime_test"
        );
        long firstRunTime = System.nanoTime() - startTime;

        // Second run - use cache
        startTime = System.nanoTime();
        long primeCount2 = GenericPropertyCounter.countWithCache(
            largeDataset, PropertyCheckers.primeNumbers(), "large_prime_test"
        );
        long secondRunTime = System.nanoTime() - startTime;

        System.out.printf("   First run (no cache): %.2f ms, Found: %d primes\n",
                         firstRunTime / 1_000_000.0, primeCount1);
        System.out.printf("   Second run (cached): %.2f ms, Found: %d primes\n",
                         secondRunTime / 1_000_000.0, primeCount2);
        System.out.printf("   Speedup: %.1fx faster with caching\n",
                         (double) firstRunTime / secondRunTime);

        // Show cache statistics
        System.out.printf("📊 Cache Status: %s\n", PropertyCheckers.getCacheStats());
        System.out.printf("📊 Generic Counter Cache Size: %d entries\n", GenericPropertyCounter.getCacheSize());

        System.out.println();
    }

    /**
     * Demonstrates bounded type parameters with inheritance hierarchies.
     * Shows advanced generic concepts with type bounds.
     */
    private static void demonstrateBoundedTypeParameters() {
        printSectionHeader("Bounded Type Parameters & Inheritance");

        // Create mixed numeric data
        List<Number> numbers = Arrays.asList(
            1, 2.5, 3L, 4.7f, 5, 6.8, 7, 8.2f, 9L, 10.1
        );

        // Use bounded wildcards for flexible type handling
        PropertyChecker<Number> positiveCheck = PropertyCheckers.positiveNumbers();
        long positiveCount = GenericPropertyCounter.count(numbers, positiveCheck);
        System.out.printf("🔢 Positive numbers in mixed collection: %d out of %d\n",
                         positiveCount, numbers.size());

        // Demonstrate with BigDecimal (more complex number type)
        List<BigDecimal> decimals = Arrays.asList(
            new BigDecimal("10.5"),
            new BigDecimal("-3.2"),
            new BigDecimal("0"),
            new BigDecimal("99.99"),
            new BigDecimal("-0.01")
        );

        PropertyChecker<BigDecimal> bigPositive = num -> num != null && num.compareTo(BigDecimal.ZERO) > 0;
        long bigPositiveCount = GenericPropertyCounter.count(decimals, bigPositive);
        System.out.printf("💰 Positive BigDecimals: %d out of %d\n", bigPositiveCount, decimals.size());

        // Show type inference in action
        var inferredResult = GenericPropertyCounter.count(
            Arrays.asList(1, 2, 3, 4, 5),
            num -> num % 2 == 0  // Type inferred as PropertyChecker<Integer>
        );
        System.out.printf("🔍 Type inference result: %d even numbers\n", inferredResult);

        System.out.println();
    }

    /**
     * Demonstrates wildcard usage and the PECS principle.
     * Shows advanced generic concepts for maximum flexibility.
     */
    private static void demonstrateWildcardUsage() {
        printSectionHeader("Wildcard Usage & PECS Principle");

        // Producer Extends - reading from collections
        List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
        List<Number> numbers = Arrays.asList(1.5, 2, 3.7f, 4L);

        // Consumer Super - writing to collections
        PropertyChecker<Object> objectChecker = obj -> obj != null;

        // Demonstrate PECS with our counter
        long integerCount = GenericPropertyCounter.count(integers, PropertyCheckers.positiveNumbers());
        long numberCount = GenericPropertyCounter.count(numbers, PropertyCheckers.positiveNumbers());

        System.out.printf("🔄 PECS Demonstration:\n");
        System.out.printf("   Integers (extends Number): %d positive\n", integerCount);
        System.out.printf("   Numbers (mixed types): %d positive\n", numberCount);

        // Unbounded wildcards
        List<?> wildcardList = Arrays.asList("string", 42, 3.14, true);
        PropertyChecker<Object> notNullChecker = PropertyChecker.isNotNull();
        long nonNullCount = GenericPropertyCounter.count((List<Object>) wildcardList, notNullChecker);
        System.out.printf("   Non-null objects in wildcard list: %d\n", nonNullCount);

        System.out.println();
    }

    /**
     * Demonstrates real-world scenarios and practical applications.
     * Shows how the generic framework can be applied to solve actual problems.
     */
    private static void demonstrateRealWorldScenarios() {
        printSectionHeader("Real-World Applications");

        // E-commerce scenario: Product filtering
        List<Product> products = Arrays.asList(
            new Product("Laptop", 1299.99, 4.5, true),
            new Product("Phone", 899.99, 4.2, true),
            new Product("Tablet", 599.99, 3.8, false),
            new Product("Watch", 399.99, 4.7, true),
            new Product("Headphones", 199.99, 4.1, false)
        );

        // Count premium products (price > 500 AND rating > 4.0 AND in stock)
        PropertyChecker<Product> premiumProduct = product ->
            product.getPrice() > 500 &&
            product.getRating() > 4.0 &&
            product.isInStock();

        long premiumCount = GenericPropertyCounter.count(products, premiumProduct);
        System.out.printf("🛍️ Premium products available: %d out of %d\n", premiumCount, products.size());

        // Data analysis scenario: Student performance
        List<Student> students = Arrays.asList(
            new Student("Alice", 95, "Computer Science"),
            new Student("Bob", 87, "Mathematics"),
            new Student("Charlie", 76, "Computer Science"),
            new Student("Diana", 92, "Mathematics"),
            new Student("Eve", 89, "Physics")
        );

        // Count high-performing CS students
        PropertyChecker<Student> topCSStudent = student ->
            student.getGrade() >= 90 && "Computer Science".equals(student.getMajor());

        var csResults = GenericPropertyCounter.countWithDetails(students, topCSStudent);
        System.out.printf("🎓 Top Computer Science students: %s\n", csResults);

        // Financial scenario: Transaction analysis
        List<Transaction> transactions = Arrays.asList(
            new Transaction("2024-01-15", 1500.00, "CREDIT"),
            new Transaction("2024-01-16", -300.50, "DEBIT"),
            new Transaction("2024-01-17", 2200.00, "CREDIT"),
            new Transaction("2024-01-18", -150.75, "DEBIT"),
            new Transaction("2024-01-19", -1000.00, "DEBIT")
        );

        // Count large transactions (absolute value > 1000)
        PropertyChecker<Transaction> largeTransaction = trans -> Math.abs(trans.getAmount()) > 1000;
        long largeTransCount = GenericPropertyCounter.count(transactions, largeTransaction);
        System.out.printf("💳 Large transactions (>$1000): %d out of %d\n", largeTransCount, transactions.size());

        System.out.println();
    }

    // Helper method for section formatting
    private static void printSectionHeader(String title) {
        System.out.println("🔹 " + title);
        System.out.println("-".repeat(title.length() + 3));
    }

    // Helper classes for real-world scenarios

    /**
     * Product class for e-commerce demonstration.
     * Shows practical application of generics in business domains.
     */
    private static class Product {
        private final String name;
        private final double price;
        private final double rating;
        private final boolean inStock;

        public Product(String name, double price, double rating, boolean inStock) {
            this.name = name;
            this.price = price;
            this.rating = rating;
            this.inStock = inStock;
        }

        public String getName() { return name; }
        public double getPrice() { return price; }
        public double getRating() { return rating; }
        public boolean isInStock() { return inStock; }

        @Override
        public String toString() {
            return String.format("%s($%.2f, %.1f⭐, %s)",
                               name, price, rating, inStock ? "In Stock" : "Out of Stock");
        }
    }

    /**
     * Student class for academic demonstration.
     */
    private static class Student implements Comparable<Student> {
        private final String name;
        private final int grade;
        private final String major;

        public Student(String name, int grade, String major) {
            this.name = name;
            this.grade = grade;
            this.major = major;
        }

        public String getName() { return name; }
        public int getGrade() { return grade; }
        public String getMajor() { return major; }

        @Override
        public int compareTo(Student other) {
            return Integer.compare(this.grade, other.grade);
        }

        @Override
        public String toString() {
            return String.format("%s (%d%%, %s)", name, grade, major);
        }
    }

    /**
     * Transaction class for financial demonstration.
     */
    private static class Transaction {
        private final String date;
        private final double amount;
        private final String type;

        public Transaction(String date, double amount, String type) {
            this.date = date;
            this.amount = amount;
            this.type = type;
        }

        public String getDate() { return date; }
        public double getAmount() { return amount; }
        public String getType() { return type; }

        @Override
        public String toString() {
            return String.format("%s: $%.2f (%s)", date, amount, type);
        }
    }
}