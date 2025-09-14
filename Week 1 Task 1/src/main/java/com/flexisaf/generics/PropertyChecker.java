package com.flexisaf.generics;

/**
 * Functional interface for checking if an element has a specific property.
 * This interface demonstrates the use of generics with functional programming
 * and provides type safety for property checking operations.
 *
 * @param <T> The type of elements to be checked
 * @author Flexisaf Internship Candidate
 * @version 1.0
 */
@FunctionalInterface
public interface PropertyChecker<T> {

    /**
     * Checks if the given element satisfies a specific property.
     *
     * @param element The element to check (can be null depending on implementation)
     * @return true if the element has the property, false otherwise
     * @throws NullPointerException if element is null and implementation doesn't handle nulls
     */
    boolean hasProperty(T element);

    /**
     * Returns a composed PropertyChecker that represents a logical AND
     * of this checker and another checker.
     *
     * @param other The other PropertyChecker to combine with
     * @return A composed PropertyChecker that returns true only if both checkers return true
     * @throws NullPointerException if other is null
     */
    default PropertyChecker<T> and(PropertyChecker<? super T> other) {
        if (other == null) {
            throw new NullPointerException("Other PropertyChecker cannot be null");
        }
        return element -> this.hasProperty(element) && other.hasProperty(element);
    }

    /**
     * Returns a composed PropertyChecker that represents a logical OR
     * of this checker and another checker.
     *
     * @param other The other PropertyChecker to combine with
     * @return A composed PropertyChecker that returns true if either checker returns true
     * @throws NullPointerException if other is null
     */
    default PropertyChecker<T> or(PropertyChecker<? super T> other) {
        if (other == null) {
            throw new NullPointerException("Other PropertyChecker cannot be null");
        }
        return element -> this.hasProperty(element) || other.hasProperty(element);
    }

    /**
     * Returns a PropertyChecker that represents the logical negation
     * of this checker.
     *
     * @return A PropertyChecker that returns the opposite of this checker
     */
    default PropertyChecker<T> negate() {
        return element -> !this.hasProperty(element);
    }

    /**
     * Returns a PropertyChecker that always returns true.
     * Useful as a base case or for testing purposes.
     *
     * @param <T> The type of elements
     * @return A PropertyChecker that always returns true
     */
    static <T> PropertyChecker<T> alwaysTrue() {
        return element -> true;
    }

    /**
     * Returns a PropertyChecker that always returns false.
     * Useful as a base case or for testing purposes.
     *
     * @param <T> The type of elements
     * @return A PropertyChecker that always returns false
     */
    static <T> PropertyChecker<T> alwaysFalse() {
        return element -> false;
    }

    /**
     * Returns a PropertyChecker that checks for null values.
     *
     * @param <T> The type of elements
     * @return A PropertyChecker that returns true for null elements
     */
    static <T> PropertyChecker<T> isNull() {
        return element -> element == null;
    }

    /**
     * Returns a PropertyChecker that checks for non-null values.
     *
     * @param <T> The type of elements
     * @return A PropertyChecker that returns true for non-null elements
     */
    static <T> PropertyChecker<T> isNotNull() {
        return element -> element != null;
    }
}