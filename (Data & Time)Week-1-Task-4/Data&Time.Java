import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Stream;

/**
 * Comprehensive demonstration of Java Date and Time API (java.time package)
 * Covers Date-only classes, Date-and-Time classes, Time zones, formatting, and parsing
 */
public class DateTimeDemo {
    
    public static void main(String[] args) {
        System.out.println("=== Java Date and Time API Demo ===\n");
        
        // Main tasks from the assignment
        reportMonthLengthsForYear(2024);
        System.out.println();
        
        listMondaysInCurrentMonth();
        System.out.println();
        
        testFridayThe13th();
        System.out.println();
        
        // Additional demonstrations
        demonstrateDateTimeClasses();
        demonstrateTimeZones();
        demonstrateParsingAndFormatting();
        demonstrateLegacyInterop();
    }
    
    /**
     * Task 1: Write a program that, for a given year, reports the length of each month within that year
     */
    public static void reportMonthLengthsForYear(int year) {
        System.out.println("1. MONTH LENGTHS FOR YEAR " + year);
        System.out.println("==========================================");
        
        // Check if it's a leap year
        boolean isLeapYear = Year.isLeap(year);
        System.out.println("Year " + year + " is " + (isLeapYear ? "a leap year" : "not a leap year"));
        System.out.println();
        
        // Method 1: Using Month enum
        System.out.println("Using Month enum:");
        for (Month month : Month.values()) {
            int length = month.length(isLeapYear);
            System.out.printf("%-12s: %2d days%n", month.getDisplayName(TextStyle.FULL, Locale.ENGLISH), length);
        }
        
        System.out.println();
        
        // Method 2: Using YearMonth class (more precise for the specific year)
        System.out.println("Using YearMonth class:");
        for (int monthNum = 1; monthNum <= 12; monthNum++) {
            YearMonth yearMonth = YearMonth.of(year, monthNum);
            Month month = yearMonth.getMonth();
            int length = yearMonth.lengthOfMonth();
            System.out.printf("%-12s: %2d days%n", month.getDisplayName(TextStyle.FULL, Locale.ENGLISH), length);
        }
        
        // Summary statistics
        System.out.println();
        int totalDays = Year.of(year).length();
        System.out.println("Total days in " + year + ": " + totalDays);
        
        // Show February specifically for leap year demonstration
        YearMonth february = YearMonth.of(year, Month.FEBRUARY);
        System.out.println("February " + year + " has " + february.lengthOfMonth() + " days" + 
                         (isLeapYear ? " (leap year bonus day!)" : ""));
    }
    
    /**
     * Task 2: Write program that, for a given month of the current year, lists all of the Mondays in that month
     */
    public static void listMondaysInCurrentMonth() {
        System.out.println("2. ALL MONDAYS IN CURRENT MONTH");
        System.out.println("===============================");
        
        LocalDate today = LocalDate.now();
        int currentYear = today.getYear();
        Month currentMonth = today.getMonth();
        
        System.out.println("Current date: " + today.format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy")));
        System.out.println("Finding all Mondays in " + currentMonth.getDisplayName(TextStyle.FULL, Locale.ENGLISH) + " " + currentYear);
        System.out.println();
        
        // Method 1: Using TemporalAdjusters
        System.out.println("Method 1 - Using TemporalAdjusters:");
        LocalDate firstOfMonth = today.withDayOfMonth(1);
        LocalDate firstMonday = firstOfMonth.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        
        List<LocalDate> mondays = new ArrayList<>();
        LocalDate monday = firstMonday;
        
        while (monday.getMonth() == currentMonth) {
            mondays.add(monday);
            monday = monday.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        }
        
        for (int i = 0; i < mondays.size(); i++) {
            LocalDate mondayDate = mondays.get(i);
            System.out.printf("Monday #%d: %s (Day %d of month)%n", 
                i + 1, 
                mondayDate.format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy")),
                mondayDate.getDayOfMonth());
        }
        
        System.out.println();
        
        // Method 2: Iterating through all days of the month
        System.out.println("Method 2 - Iterating through all days:");
        YearMonth yearMonth = YearMonth.of(currentYear, currentMonth);
        int daysInMonth = yearMonth.lengthOfMonth();
        
        List<LocalDate> mondaysMethod2 = new ArrayList<>();
        for (int day = 1; day <= daysInMonth; day++) {
            LocalDate date = LocalDate.of(currentYear, currentMonth, day);
            if (date.getDayOfWeek() == DayOfWeek.MONDAY) {
                mondaysMethod2.add(date);
            }
        }
        
        for (LocalDate mondayDate : mondaysMethod2) {
            System.out.println("Monday: " + mondayDate.format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy")));
        }
        
        System.out.println("\nTotal Mondays in " + currentMonth.getDisplayName(TextStyle.FULL, Locale.ENGLISH) + ": " + mondays.size());
    }
    
    /**
     * Task 3: Write program that tests whether a given date occurs on Friday the 13th
     */
    public static void testFridayThe13th() {
        System.out.println("3. FRIDAY THE 13TH CHECKER");
        System.out.println("==========================");
        
        // Test various dates
        LocalDate[] testDates = {
            LocalDate.of(2024, 9, 13),  // Friday the 13th in September 2024
            LocalDate.of(2024, 12, 13), // Friday the 13th in December 2024
            LocalDate.of(2024, 1, 13),  // Not a Friday
            LocalDate.of(2024, 10, 11), // Not the 13th
            LocalDate.now(),            // Today
            LocalDate.of(2025, 6, 13),  // Check future date
        };
        
        System.out.println("Testing various dates for Friday the 13th:");
        System.out.println();
        
        for (LocalDate date : testDates) {
            boolean isFridayThe13th = checkFridayThe13th(date);
            System.out.printf("%-25s: %s%s%n", 
                date.format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy")),
                isFridayThe13th ? "✓ FRIDAY THE 13TH!" : "✗ Not Friday the 13th",
                isFridayThe13th ? " 🎃" : "");
            
            if (!isFridayThe13th) {
                // Explain why not
                if (date.getDayOfMonth() != 13) {
                    System.out.println("                           (Day of month: " + date.getDayOfMonth() + ", not 13)");
                } else {
                    System.out.println("                           (Day of week: " + date.getDayOfWeek() + ", not Friday)");
                }
            }
        }
        
        System.out.println();
        
        // Find all Friday the 13ths in a given year
        int year = 2024;
        System.out.println("All Friday the 13th dates in " + year + ":");
        List<LocalDate> fridayThe13ths = findFridayThe13thsInYear(year);
        
        if (fridayThe13ths.isEmpty()) {
            System.out.println("No Friday the 13th dates found in " + year);
        } else {
            for (LocalDate date : fridayThe13ths) {
                System.out.println("🎃 " + date.format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy")));
            }
        }
        
        System.out.println("Total Friday the 13th dates in " + year + ": " + fridayThe13ths.size());
        
        // Statistical analysis
        System.out.println();
        analyzeFridayThe13thStatistics();
    }
    
    /**
     * Helper method to check if a date is Friday the 13th
     */
    private static boolean checkFridayThe13th(LocalDate date) {
        return date.getDayOfWeek() == DayOfWeek.FRIDAY && date.getDayOfMonth() == 13;
    }
    
    /**
     * Helper method to find all Friday the 13th dates in a year
     */
    private static List<LocalDate> findFridayThe13thsInYear(int year) {
        List<LocalDate> fridayThe13ths = new ArrayList<>();
        
        for (Month month : Month.values()) {
            LocalDate thirteenth = LocalDate.of(year, month, 13);
            if (thirteenth.getDayOfWeek() == DayOfWeek.FRIDAY) {
                fridayThe13ths.add(thirteenth);
            }
        }
        
        return fridayThe13ths;
    }
    
    /**
     * Statistical analysis of Friday the 13th occurrences
     */
    private static void analyzeFridayThe13thStatistics() {
        System.out.println("Friday the 13th Statistics (2020-2029):");
        
        Map<Integer, Integer> yearCounts = new HashMap<>();
        int totalCount = 0;
        
        for (int year = 2020; year <= 2029; year++) {
            List<LocalDate> fridayThe13ths = findFridayThe13thsInYear(year);
            yearCounts.put(year, fridayThe13ths.size());
            totalCount += fridayThe13ths.size();
        }
        
        yearCounts.forEach((year, count) -> 
            System.out.println(year + ": " + count + " occurrence" + (count != 1 ? "s" : "")));
        
        double average = totalCount / 10.0;
        System.out.printf("Average per year (2020-2029): %.1f%n", average);
    }
    
    /**
     * Demonstration of various Date and Time classes
     */
    private static void demonstrateDateTimeClasses() {
        System.out.println("4. DATE AND TIME CLASSES OVERVIEW");
        System.out.println("=================================");
        
        // Date-only classes
        System.out.println("DATE-ONLY CLASSES:");
        LocalDate today = LocalDate.now();
        System.out.println("LocalDate.now(): " + today);
        System.out.println("LocalDate.of(2024, 12, 25): " + LocalDate.of(2024, Month.DECEMBER, 25));
        
        YearMonth currentYearMonth = YearMonth.now();
        System.out.println("YearMonth.now(): " + currentYearMonth);
        System.out.println("Days in current month: " + currentYearMonth.lengthOfMonth());
        
        Year currentYear = Year.now();
        System.out.println("Year.now(): " + currentYear);
        System.out.println("Is leap year: " + currentYear.isLeap());
        
        MonthDay birthday = MonthDay.of(Month.JULY, 4);
        System.out.println("MonthDay (July 4th): " + birthday);
        
        System.out.println();
        
        // Time-only classes
        System.out.println("TIME-ONLY CLASSES:");
        LocalTime now = LocalTime.now();
        System.out.println("LocalTime.now(): " + now);
        System.out.println("LocalTime.of(14, 30): " + LocalTime.of(14, 30));
        
        System.out.println();
        
        // Date and Time classes
        System.out.println("DATE AND TIME CLASSES:");
        LocalDateTime nowDateTime = LocalDateTime.now();
        System.out.println("LocalDateTime.now(): " + nowDateTime);
        
        ZonedDateTime zonedNow = ZonedDateTime.now();
        System.out.println("ZonedDateTime.now(): " + zonedNow);
        
        Instant instant = Instant.now();
        System.out.println("Instant.now(): " + instant);
        
        System.out.println();
    }
    
    /**
     * Demonstration of Time Zones and Offsets
     */
    private static void demonstrateTimeZones() {
        System.out.println("5. TIME ZONES AND OFFSETS");
        System.out.println("=========================");
        
        // Current time in different time zones
        Instant now = Instant.now();
        
        String[] timeZones = {"America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney", "UTC"};
        
        System.out.println("Current time around the world:");
        for (String zoneId : timeZones) {
            ZonedDateTime zonedTime = now.atZone(ZoneId.of(zoneId));
            System.out.printf("%-20s: %s%n", zoneId, zonedTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z")));
        }
        
        System.out.println();
        
        // Offset examples
        System.out.println("Offset examples:");
        ZoneOffset offset = ZoneOffset.ofHours(-5);
        OffsetDateTime offsetDateTime = OffsetDateTime.now(offset);
        System.out.println("UTC-5: " + offsetDateTime);
        
        System.out.println();
    }
    
    /**
     * Demonstration of Parsing and Formatting
     */
    private static void demonstrateParsingAndFormatting() {
        System.out.println("6. PARSING AND FORMATTING");
        System.out.println("=========================");
        
        LocalDateTime dateTime = LocalDateTime.now();
        
        // Various formatting patterns
        System.out.println("Different formatting patterns:");
        System.out.println("ISO format: " + dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        System.out.println("Custom 1: " + dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        System.out.println("Custom 2: " + dateTime.format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy 'at' h:mm a")));
        System.out.println("Custom 3: " + dateTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        
        System.out.println();
        
        // Parsing examples
        System.out.println("Parsing examples:");
        String dateString1 = "2024-12-25";
        LocalDate parsed1 = LocalDate.parse(dateString1);
        System.out.println("Parsed '" + dateString1 + "' as: " + parsed1);
        
        String dateString2 = "25/12/2024 14:30";
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        LocalDateTime parsed2 = LocalDateTime.parse(dateString2, customFormatter);
        System.out.println("Parsed '" + dateString2 + "' as: " + parsed2);
        
        System.out.println();
    }
    
    /**
     * Demonstration of Legacy Date-Time interoperability
     */
    private static void demonstrateLegacyInterop() {
        System.out.println("7. LEGACY DATE-TIME INTEROPERABILITY");
        System.out.println("====================================");
        
        // Converting from legacy java.util.Date
        Date legacyDate = new Date();
        System.out.println("Legacy Date: " + legacyDate);
        
        // Convert to new API
        Instant instant = legacyDate.toInstant();
        LocalDateTime localDateTime = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        System.out.println("Converted to LocalDateTime: " + localDateTime);
        
        // Convert back to legacy
        Date convertedBack = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
        System.out.println("Converted back to Date: " + convertedBack);
        
        System.out.println();
        
        // Calendar interoperability
        Calendar calendar = Calendar.getInstance();
        System.out.println("Legacy Calendar: " + calendar.getTime());
        
        // Convert Calendar to LocalDateTime
        LocalDateTime fromCalendar = LocalDateTime.ofInstant(
            calendar.toInstant(), 
            calendar.getTimeZone().toZoneId()
        );
        System.out.println("Calendar to LocalDateTime: " + fromCalendar);
        
        System.out.println("Migration complete - use java.time package for new code!");
    }
}