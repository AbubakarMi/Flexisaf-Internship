package com.flexisaf.generics;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

/**
 * A sophisticated generic utility class for counting elements in collections
 * that satisfy specific properties. This class demonstrates advanced concepts
 * including bounded type parameters, wildcards, type inference, and generics inheritance.
 *
 * Features:
 * - Generic methods with bounded type parameters
 * - Wildcard usage for maximum flexibility
 * - Type inference support
 * - Thread-safe caching mechanism
 * - Support for multiple collection types
 * - Advanced filtering and grouping operations
 *
 * @author Flexisaf Internship Candidate
 * @version 2.0
 */
public final class GenericPropertyCounter {

    // Thread-safe cache for memoization of expensive property checks
    private static final Map<String, Object> CACHE = new ConcurrentHashMap<>();

    // Private constructor to prevent instantiation (utility class)
    private GenericPropertyCounter() {
        throw new AssertionError("GenericPropertyCounter is a utility class and should not be instantiated");
    }

    /**
     * Counts elements in a collection that satisfy a given property.
     * This method uses bounded type parameters and demonstrates type safety.
     *
     * @param <T> The type of elements in the collection (must extend Object)
     * @param collection The collection to examine (cannot be null)
     * @param propertyChecker The property checker to apply (cannot be null)
     * @return The number of elements that satisfy the property (non-negative)
     * @throws IllegalArgumentException if collection or propertyChecker is null
     */
    public static <T> long count(Collection<? extends T> collection,
                                PropertyChecker<? super T> propertyChecker) {
        validateInputs(collection, propertyChecker);

        return collection.parallelStream()
                .filter(element -> {
                    try {
                        return propertyChecker.hasProperty(element);
                    } catch (Exception e) {
                        // Log the exception in a real application
                        System.err.println("Warning: Exception during property check for element " +
                                         element + ": " + e.getMessage());
                        return false;
                    }
                })
                .count();
    }

    /**
     * Counts elements with caching support for expensive property checks.
     * Uses a cache key to avoid redundant computations.
     *
     * @param <T> The type of elements in the collection
     * @param collection The collection to examine
     * @param propertyChecker The property checker to apply
     * @param cacheKey Unique key for caching results (optional)
     * @return The number of elements that satisfy the property
     */
    @SuppressWarnings("unchecked")
    public static <T> long countWithCache(Collection<? extends T> collection,
                                         PropertyChecker<? super T> propertyChecker,
                                         String cacheKey) {
        validateInputs(collection, propertyChecker);

        if (cacheKey != null && CACHE.containsKey(cacheKey)) {
            return (Long) CACHE.get(cacheKey);
        }

        long result = count(collection, propertyChecker);

        if (cacheKey != null) {
            CACHE.put(cacheKey, result);
        }

        return result;
    }

    /**
     * Advanced method that counts elements and provides detailed statistics.
     * Demonstrates use of bounded wildcards and complex generics.
     *
     * @param <T> The element type (bounded by Comparable for sorting)
     * @param collection The collection to analyze
     * @param propertyChecker The property to check
     * @return A CountResult containing detailed statistics
     */
    public static <T extends Comparable<? super T>> CountResult<T> countWithDetails(
            Collection<? extends T> collection,
            PropertyChecker<? super T> propertyChecker) {

        validateInputs(collection, propertyChecker);

        List<T> matchingElements = collection.parallelStream()
                .filter(element -> {
                    try {
                        return propertyChecker.hasProperty(element);
                    } catch (Exception e) {
                        System.err.println("Warning: Exception during property check: " + e.getMessage());
                        return false;
                    }
                })
                .sorted()
                .collect(Collectors.toList());

        return new CountResult<>(
            matchingElements.size(),
            collection.size(),
            matchingElements,
            calculatePercentage(matchingElements.size(), collection.size())
        );
    }

    /**
     * Groups elements by whether they satisfy the property or not.
     * Demonstrates advanced use of collectors and generics.
     *
     * @param <T> The type of elements
     * @param collection The collection to partition
     * @param propertyChecker The property checker
     * @return A map with true/false keys and corresponding element lists
     */
    public static <T> Map<Boolean, List<T>> partitionByProperty(
            Collection<? extends T> collection,
            PropertyChecker<? super T> propertyChecker) {

        validateInputs(collection, propertyChecker);

        return collection.parallelStream()
                .collect(Collectors.partitioningBy(element -> {
                    try {
                        return propertyChecker.hasProperty(element);
                    } catch (Exception e) {
                        System.err.println("Warning: Exception during property check: " + e.getMessage());
                        return false;
                    }
                }));
    }

    /**
     * Counts elements that satisfy multiple properties (AND operation).
     * Demonstrates method chaining and functional composition.
     *
     * @param <T> The type of elements
     * @param collection The collection to examine
     * @param checkers Variable number of property checkers
     * @return Count of elements satisfying ALL properties
     */
    @SafeVarargs
    public static <T> long countMultipleProperties(Collection<? extends T> collection,
                                                  PropertyChecker<? super T>... checkers) {
        if (collection == null) {
            throw new IllegalArgumentException("Collection cannot be null");
        }
        if (checkers == null || checkers.length == 0) {
            throw new IllegalArgumentException("At least one property checker must be provided");
        }

        // Compose all checkers using AND operation
        PropertyChecker<T> composedChecker = element -> {
            for (PropertyChecker<? super T> checker : checkers) {
                if (!checker.hasProperty(element)) {
                    return false;
                }
            }
            return true;
        };

        return count(collection, composedChecker);
    }

    /**
     * Generic method that works with different collection types and
     * demonstrates PECS (Producer Extends, Consumer Super) principle.
     *
     * @param <T> The element type
     * @param <R> The result type after transformation
     * @param collection The source collection
     * @param transformer Function to transform elements
     * @param propertyChecker Checker for transformed elements
     * @return Count after transformation
     */
    public static <T, R> long countAfterTransform(
            Collection<? extends T> collection,
            Function<? super T, ? extends R> transformer,
            PropertyChecker<? super R> propertyChecker) {

        if (collection == null || transformer == null || propertyChecker == null) {
            throw new IllegalArgumentException("All parameters must be non-null");
        }

        return collection.parallelStream()
                .map(transformer)
                .filter(element -> {
                    try {
                        return propertyChecker.hasProperty(element);
                    } catch (Exception e) {
                        System.err.println("Warning: Exception during property check: " + e.getMessage());
                        return false;
                    }
                })
                .count();
    }

    /**
     * Clears the internal cache. Useful for memory management in long-running applications.
     */
    public static void clearCache() {
        CACHE.clear();
        System.gc(); // Suggest garbage collection (not guaranteed)
    }

    /**
     * Returns the current cache size for monitoring purposes.
     *
     * @return Number of cached entries
     */
    public static int getCacheSize() {
        return CACHE.size();
    }

    // Private helper methods

    /**
     * Validates common input parameters to prevent null pointer exceptions.
     */
    private static <T> void validateInputs(Collection<? extends T> collection,
                                         PropertyChecker<? super T> propertyChecker) {
        if (collection == null) {
            throw new IllegalArgumentException("Collection cannot be null. Please provide a valid collection.");
        }
        if (propertyChecker == null) {
            throw new IllegalArgumentException("PropertyChecker cannot be null. Please provide a valid property checker.");
        }
    }

    /**
     * Calculates percentage with proper handling of edge cases.
     */
    private static double calculatePercentage(int matches, int total) {
        if (total == 0) {
            return 0.0;
        }
        return (matches * 100.0) / total;
    }

    /**
     * Inner class representing detailed counting results.
     * Demonstrates nested generics and immutable design patterns.
     *
     * @param <T> The type of elements
     */
    public static final class CountResult<T> {
        private final int matchCount;
        private final int totalCount;
        private final List<T> matchingElements;
        private final double percentage;

        // Package-private constructor to maintain encapsulation
        CountResult(int matchCount, int totalCount, List<T> matchingElements, double percentage) {
            this.matchCount = matchCount;
            this.totalCount = totalCount;
            this.matchingElements = List.copyOf(matchingElements); // Defensive copy (Java 10+)
            this.percentage = percentage;
        }

        /**
         * Returns the number of elements that matched the property.
         */
        public int getMatchCount() {
            return matchCount;
        }

        /**
         * Returns the total number of elements examined.
         */
        public int getTotalCount() {
            return totalCount;
        }

        /**
         * Returns an immutable list of elements that matched the property.
         */
        public List<T> getMatchingElements() {
            return matchingElements;
        }

        /**
         * Returns the percentage of elements that matched (0-100).
         */
        public double getPercentage() {
            return percentage;
        }

        /**
         * Returns a detailed string representation of the results.
         */
        @Override
        public String toString() {
            return String.format(
                "CountResult{matches=%d, total=%d, percentage=%.2f%%, elements=%s}",
                matchCount, totalCount, percentage, matchingElements
            );
        }
    }
}