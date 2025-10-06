# 🚀 Flexisaf Internship Projects

## **Complete Learning Journey Portfolio**

A comprehensive collection of advanced Java programming projects demonstrating mastery of core concepts, design patterns, and enterprise-level programming practices.

---

## 📁 **Project Structure**

```
Flexisaf/
├── Week 1 Task 1/           # Advanced Java Generics Challenge
├── Week 2 Task 2/           # Iterator Interface Implementation
├── Week 3 Task 3/           # Date and Time Operations
└── Week 4 Task 4/           # Calendar Utilities
```

---

## 🎯 **Week 1 Task 1 - Advanced Java Generics Challenge**

### **Project Overview**
A sophisticated demonstration of advanced Java generics concepts through a comprehensive generic method framework for counting collection elements with specific properties.

### **Key Features**
- **Generic Method Design**: Type-safe, flexible counting operations
- **Bounded Type Parameters**: Ensuring type safety with inheritance constraints
- **Wildcard Usage**: PECS principle implementation for maximum flexibility
- **Type Inference**: Leveraging Java's type system for cleaner code
- **Functional Programming**: Integration with lambda expressions and method references
- **Performance Optimization**: Caching mechanisms and parallel processing

### **Files Structure**
```
Week 1 Task 1/
└── src/main/java/com/flexisaf/generics/
    ├── PropertyChecker.java           # Functional interface for property checking
    ├── GenericPropertyCounter.java    # Core generic counting utilities
    ├── PropertyCheckers.java          # Pre-built property implementations
    └── AdvancedGenericsDemo.java      # Comprehensive demonstration
```

### **Running the Project**
```bash
cd "Week 1 Task 1"
javac -d out src/main/java/com/flexisaf/generics/*.java
java -cp out com.flexisaf.generics.AdvancedGenericsDemo
```

---

## 🔄 **Week 2 Task 2 - Iterator Interface Implementation**

### **Project Overview**
A comprehensive program demonstrating the Iterator interface pattern for looping through lists and performing specific actions such as removing elements based on custom criteria.

### **Key Features**
- **Custom Iterator Interface**: Full implementation with enhanced functionality
- **List Operations**: Remove specific words, characters, and elements based on conditions
- **Predicate-Based Filtering**: Advanced filtering using functional programming
- **Multiple Demonstration Scenarios**: Comprehensive examples for different use cases
- **Clean Architecture**: Well-documented, maintainable code with extensive comments

### **Core Components**
- **CustomListIterator Interface**: Enhanced iterator with additional functionality
- **StringListIterator Implementation**: Concrete implementation for string lists
- **Comprehensive Demos**: Five different scenarios showcasing various operations

### **Demonstrated Operations**
1. **Basic Iteration**: Manual element removal during iteration
2. **Word Removal**: Remove strings containing specific words
3. **Character Filtering**: Remove strings containing specific characters
4. **Length-Based Removal**: Filter based on string length criteria
5. **Complex Operations**: Email validation and transformation examples

### **Running the Project**
```bash
cd "Week 2 Task 2"
javac ListIterator.java
java ListIterator
```

### **Expected Output**
The demonstration showcases:
- Basic iteration and manual removal operations
- Conditional removal based on content matching
- Character-based filtering operations
- Length criteria filtering
- Complex validation and transformation scenarios

---

## 📅 **Week 3 Task 3 - Date and Time Operations**

### **Project Overview**
Advanced date and time manipulation utilities demonstrating Java's modern `java.time` API for various calendar operations and calculations.

### **Key Features**
- **Year Month Length Calculation**: Determine the number of days in each month for any given year
- **Monday Finder**: List all Mondays in a specified month of the current year
- **Friday the 13th Checker**: Validate if a given date falls on Friday the 13th
- **Flexible Date Parsing**: Support for multiple date format inputs
- **Leap Year Handling**: Accurate calculations accounting for leap years

### **Running the Project**
```bash
cd "Week 3 Task 3"
# Compile
javac MonthLengths.java
javac MondaysInMonth.java
javac Friday13th.java

# Run
java MonthLengths
java MondaysInMonth
java Friday13th
```

---

## 📆 **Week 4 Task 4 - Calendar Utilities**

### **Project Overview**
Comprehensive calendar utilities program featuring month length calculations, weekday finding, and special date validation using Java's `java.time` package.

### **Key Features**
- **Month Length Reporter**: Display the number of days in each month for any year
- **Monday Listing**: Generate all Monday dates for a given month in the current year
- **Friday 13th Validator**: Check if any date is Friday the 13th
- **Multi-Format Support**: Accept dates in YYYY-MM-DD or MM/DD/YYYY formats
- **User-Friendly Interface**: Interactive console-based input/output

### **Programs Included**
1. **MonthLengths.java**: Reports days in each month for a specified year
2. **MondaysInMonth.java**: Lists all Mondays in a given month
3. **Friday13th.java**: Tests if a date is Friday the 13th

### **Running the Project**
```bash
cd "Week 4 Task 4"
# Compile all programs
javac MonthLengths.java
javac MondaysInMonth.java
javac Friday13th.java

# Run each program
java MonthLengths
java MondaysInMonth
java Friday13th
```

### **Example Usage**
```
MonthLengths:
- Input: 2024
- Output: Displays all 12 months with their respective day counts

MondaysInMonth:
- Input: 10 (October)
- Output: Lists all Monday dates in October of current year

Friday13th:
- Input: 2024-09-13 or 09/13/2024
- Output: Confirms if date is Friday the 13th
```

---

## 🏗️ **Technical Architecture**

### **Week 1 - Generics Focus**
- Advanced generic method implementations
- Type safety through bounded parameters
- Wildcard usage following PECS principles
- Performance optimization with caching
- Real-world business domain examples

### **Week 2 - Iterator Pattern Focus**
- Custom iterator interface design
- Enhanced functionality beyond standard Iterator
- Predicate-based operations integration
- Comprehensive error handling
- Multiple practical demonstration scenarios

### **Week 3 & 4 - Date/Time API Mastery**
- Modern `java.time` package utilization
- Calendar calculations and validations
- Multiple date format parsing
- Leap year handling and edge cases
- User input validation and error handling

---

## 🎓 **Learning Objectives Achieved**

### **Advanced Java Concepts**
- ✅ Generic methods and type parameters
- ✅ Iterator pattern implementation
- ✅ Functional programming integration
- ✅ Collection manipulation techniques
- ✅ Type safety and error handling
- ✅ Modern date/time API (`java.time`)
- ✅ Calendar calculations and algorithms

### **Software Engineering Practices**
- ✅ Clean code principles
- ✅ Comprehensive documentation
- ✅ Modular design patterns
- ✅ Performance consideration
- ✅ Real-world application examples

---

## 🚀 **Getting Started**

### **Prerequisites**
- Java 11 or higher
- Any Java IDE or command line compilation tools

### **Quick Start Guide**
1. **Clone or navigate to the project directory**
2. **Choose the week's task you want to explore**
3. **Follow the specific running instructions for each project**
4. **Review the source code to understand the implementation details**

---

## 💡 **Code Quality Standards**

Both projects demonstrate:
- **Comprehensive Comments**: Every method and class thoroughly documented
- **Error Handling**: Robust exception management
- **Type Safety**: Proper use of generics and type checking
- **Performance**: Optimized algorithms and data structures
- **Maintainability**: Clean, readable, and well-structured code

---

## 🏆 **Project Highlights**

### **Week 1 Achievements**
- Enterprise-grade generic method framework
- Advanced type system utilization
- Performance benchmarking and optimization
- Real-world business scenario implementations

### **Week 2 Achievements**
- Custom iterator interface with enhanced functionality
- Multiple practical demonstration scenarios
- Predicate-based filtering integration
- Comprehensive error handling and validation

### **Week 3 & 4 Achievements**
- Complete date/time manipulation toolkit
- Calendar utility programs with user interaction
- Multi-format date parsing support
- Accurate leap year and month length calculations
- Friday the 13th validation logic

---

**Created by**: Flexisaf Internship Candidate
**Purpose**: Demonstrate advanced Java programming mastery
**Learning Path**: Progressive skill development through practical implementations

*This portfolio represents enterprise-level Java programming skills with focus on clean code, performance, and real-world applicability.*