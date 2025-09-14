package com.flexisaf.generics;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

/**
 * A comprehensive collection of pre-built PropertyChecker implementations
 * for common use cases. This class showcases advanced generic concepts
 * including bounded wildcards, type inference, and method references.
 *
 * Features:
 * - Mathematical property checkers (odd, even, prime, perfect, etc.)
 * - String property checkers (palindrome, contains pattern, etc.)
 * - Collection property checkers (empty, size-based, etc.)
 * - Custom property checkers with advanced logic
 * - Cached implementations for performance optimization
 *
 * @author Flexisaf Internship Candidate
 * @version 2.0
 */
public final class PropertyCheckers {

    // Cache for expensive computations (thread-safe)
    private static final Set<Integer> PRIME_CACHE = new HashSet<>();
    private static final Set<Integer> PERFECT_NUMBER_CACHE = new HashSet<>();

    // Static initialization for commonly used primes
    static {
        // Pre-populate with some known primes for performance
        int[] knownPrimes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97};
        for (int prime : knownPrimes) {
            PRIME_CACHE.add(prime);
        }
    }

    // Private constructor to prevent instantiation
    private PropertyCheckers() {
        throw new AssertionError("PropertyCheckers is a utility class and should not be instantiated");
    }

    // ================== NUMERIC PROPERTY CHECKERS ==================

    /**
     * Returns a PropertyChecker that identifies odd integers.
     * Demonstrates basic generic method with type safety.
     *
     * @return PropertyChecker for odd integers
     */
    public static PropertyChecker<Integer> oddNumbers() {
        return number -> number != null && number % 2 != 0;
    }

    /**
     * Returns a PropertyChecker that identifies even integers.
     * Uses method reference for concise implementation.
     *
     * @return PropertyChecker for even integers
     */
    public static PropertyChecker<Integer> evenNumbers() {
        return number -> number != null && number % 2 == 0;
    }

    /**
     * Returns a PropertyChecker that identifies prime numbers.
     * Uses advanced caching mechanism and optimized algorithm.
     * Demonstrates sophisticated generic implementation with performance considerations.
     *
     * @return PropertyChecker for prime numbers
     */
    public static PropertyChecker<Integer> primeNumbers() {
        return number -> {
            if (number == null) {
                return false;
            }

            // Handle edge cases
            if (number < 2) {
                return false;
            }
            if (number == 2) {
                return true;
            }
            if (number % 2 == 0) {
                return false;
            }

            // Check cache first
            if (PRIME_CACHE.contains(number)) {
                return true;
            }

            // Optimized primality test
            boolean isPrime = isPrimeOptimized(number);

            // Cache the result if it's prime
            if (isPrime) {
                synchronized (PRIME_CACHE) {
                    PRIME_CACHE.add(number);
                }
            }

            return isPrime;
        };
    }

    /**
     * Returns a PropertyChecker that identifies perfect numbers.
     * A perfect number is equal to the sum of its proper positive divisors.
     * Examples: 6 (1+2+3), 28 (1+2+4+7+14), 496, 8128
     *
     * @return PropertyChecker for perfect numbers
     */
    public static PropertyChecker<Integer> perfectNumbers() {
        return number -> {
            if (number == null || number < 1) {
                return false;
            }

            // Check cache first
            if (PERFECT_NUMBER_CACHE.contains(number)) {
                return true;
            }

            // Calculate sum of proper divisors
            int sum = 1; // 1 is always a proper divisor for numbers > 1
            if (number == 1) {
                return false; // 1 is not considered perfect
            }

            // Find divisors up to sqrt(number) for efficiency
            for (int i = 2; i * i <= number; i++) {
                if (number % i == 0) {
                    sum += i;
                    // Add the corresponding divisor if it's different
                    if (i * i != number) {
                        sum += number / i;
                    }
                }
            }

            boolean isPerfect = (sum == number);

            // Cache perfect numbers for future use
            if (isPerfect) {
                synchronized (PERFECT_NUMBER_CACHE) {
                    PERFECT_NUMBER_CACHE.add(number);
                }
            }

            return isPerfect;
        };
    }

    /**
     * Returns a PropertyChecker for numbers within a specific range.
     * Demonstrates bounded wildcards and flexible type handling.
     *
     * @param min The minimum value (inclusive)
     * @param max The maximum value (inclusive)
     * @param <T> Number type that extends Comparable
     * @return PropertyChecker for numbers in range
     */
    public static <T extends Number & Comparable<T>> PropertyChecker<T> inRange(T min, T max) {
        if (min == null || max == null) {
            throw new IllegalArgumentException("Range bounds cannot be null");
        }
        if (min.compareTo(max) > 0) {
            throw new IllegalArgumentException("Minimum value cannot be greater than maximum value");
        }

        return number -> number != null &&
                        number.compareTo(min) >= 0 &&
                        number.compareTo(max) <= 0;
    }

    /**
     * Returns a PropertyChecker for positive numbers.
     *
     * @param <T> Number type
     * @return PropertyChecker for positive numbers
     */
    public static <T extends Number> PropertyChecker<T> positiveNumbers() {
        return number -> number != null && number.doubleValue() > 0;
    }

    /**
     * Returns a PropertyChecker for negative numbers.
     *
     * @param <T> Number type
     * @return PropertyChecker for negative numbers
     */
    public static <T extends Number> PropertyChecker<T> negativeNumbers() {
        return number -> number != null && number.doubleValue() < 0;
    }

    // ================== STRING PROPERTY CHECKERS ==================

    /**
     * Returns a PropertyChecker that identifies palindromic strings.
     * Ignores case and whitespace for flexible palindrome detection.
     *
     * @return PropertyChecker for palindromes
     */
    public static PropertyChecker<String> palindromes() {
        return str -> {
            if (str == null) {
                return false;
            }

            // Normalize string: remove whitespace and convert to lowercase
            String normalized = str.replaceAll("\\s+", "").toLowerCase();

            if (normalized.isEmpty()) {
                return true; // Empty string is considered a palindrome
            }

            // Check if string reads the same forwards and backwards
            int left = 0;
            int right = normalized.length() - 1;

            while (left < right) {
                if (normalized.charAt(left) != normalized.charAt(right)) {
                    return false;
                }
                left++;
                right--;
            }

            return true;
        };
    }

    /**
     * Returns a PropertyChecker for strings containing a specific pattern.
     * Demonstrates parameterized property checkers.
     *
     * @param pattern The pattern to search for
     * @param ignoreCase Whether to ignore case during matching
     * @return PropertyChecker for strings containing pattern
     */
    public static PropertyChecker<String> containsPattern(String pattern, boolean ignoreCase) {
        if (pattern == null) {
            throw new IllegalArgumentException("Pattern cannot be null");
        }

        final String searchPattern = ignoreCase ? pattern.toLowerCase() : pattern;

        return str -> {
            if (str == null) {
                return false;
            }

            String searchStr = ignoreCase ? str.toLowerCase() : str;
            return searchStr.contains(searchPattern);
        };
    }

    /**
     * Returns a PropertyChecker for strings with specific length.
     *
     * @param length The required string length
     * @return PropertyChecker for strings of specific length
     */
    public static PropertyChecker<String> hasLength(int length) {
        if (length < 0) {
            throw new IllegalArgumentException("Length cannot be negative");
        }

        return str -> str != null && str.length() == length;
    }

    /**
     * Returns a PropertyChecker for strings that are valid email addresses.
     * Uses a simple but effective regex pattern.
     *
     * @return PropertyChecker for valid emails
     */
    public static PropertyChecker<String> validEmails() {
        // Simple but effective email validation pattern
        final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

        return str -> str != null && str.matches(EMAIL_PATTERN);
    }

    // ================== COLLECTION PROPERTY CHECKERS ==================

    /**
     * Returns a PropertyChecker for empty collections.
     * Demonstrates wildcard usage with collections.
     *
     * @param <T> Collection type
     * @return PropertyChecker for empty collections
     */
    public static <T> PropertyChecker<java.util.Collection<T>> emptyCollections() {
        return collection -> collection != null && collection.isEmpty();
    }

    /**
     * Returns a PropertyChecker for collections with specific size.
     *
     * @param size The required collection size
     * @param <T> Collection type
     * @return PropertyChecker for collections of specific size
     */
    public static <T> PropertyChecker<java.util.Collection<T>> hasSize(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("Size cannot be negative");
        }

        return collection -> collection != null && collection.size() == size;
    }

    // ================== ADVANCED COMPOSITION METHODS ==================

    /**
     * Creates a PropertyChecker that combines multiple checkers with AND logic.
     * Demonstrates advanced generic method composition.
     *
     * @param checkers Variable number of property checkers to combine
     * @param <T> The element type
     * @return Combined PropertyChecker using AND logic
     */
    @SafeVarargs
    public static <T> PropertyChecker<T> allOf(PropertyChecker<? super T>... checkers) {
        if (checkers == null || checkers.length == 0) {
            return PropertyChecker.alwaysTrue();
        }

        return element -> {
            for (PropertyChecker<? super T> checker : checkers) {
                if (checker == null || !checker.hasProperty(element)) {
                    return false;
                }
            }
            return true;
        };
    }

    /**
     * Creates a PropertyChecker that combines multiple checkers with OR logic.
     *
     * @param checkers Variable number of property checkers to combine
     * @param <T> The element type
     * @return Combined PropertyChecker using OR logic
     */
    @SafeVarargs
    public static <T> PropertyChecker<T> anyOf(PropertyChecker<? super T>... checkers) {
        if (checkers == null || checkers.length == 0) {
            return PropertyChecker.alwaysFalse();
        }

        return element -> {
            for (PropertyChecker<? super T> checker : checkers) {
                if (checker != null && checker.hasProperty(element)) {
                    return true;
                }
            }
            return false;
        };
    }

    // ================== PRIVATE HELPER METHODS ==================

    /**
     * Optimized algorithm for checking if a number is prime.
     * Uses trial division with optimizations.
     */
    private static boolean isPrimeOptimized(int n) {
        if (n < 2) return false;
        if (n == 2 || n == 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;

        // Check for divisors of the form 6k ± 1 up to √n
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Clears all internal caches. Useful for memory management.
     */
    public static void clearCaches() {
        synchronized (PRIME_CACHE) {
            PRIME_CACHE.clear();
        }
        synchronized (PERFECT_NUMBER_CACHE) {
            PERFECT_NUMBER_CACHE.clear();
        }
    }

    /**
     * Returns statistics about cache usage for monitoring.
     *
     * @return String containing cache statistics
     */
    public static String getCacheStats() {
        return String.format("Cache Stats - Primes: %d, Perfect Numbers: %d",
                           PRIME_CACHE.size(), PERFECT_NUMBER_CACHE.size());
    }
}