import java.time.LocalDate;
import java.time.DayOfWeek;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

public class Friday13th {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a date (YYYY-MM-DD or MM/DD/YYYY): ");
        String dateInput = scanner.nextLine();

        isFriday13th(dateInput);

        scanner.close();
    }

    public static boolean isFriday13th(String dateString) {
        try {
            LocalDate date;

            // Try parsing different formats
            if (dateString.contains("/")) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
                date = LocalDate.parse(dateString, formatter);
            } else {
                date = LocalDate.parse(dateString);
            }

            // Check if it's the 13th and if it's a Friday
            if (date.getDayOfMonth() == 13 && date.getDayOfWeek() == DayOfWeek.FRIDAY) {
                DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
                System.out.println(date.format(outputFormatter) + " is a Friday the 13th!");
                return true;
            } else {
                DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
                System.out.println(date.format(outputFormatter) + " is a " +
                                   date.getDayOfWeek() + ", not a Friday the 13th.");
                return false;
            }

        } catch (DateTimeParseException e) {
            System.out.println("Invalid date format. Please use YYYY-MM-DD or MM/DD/YYYY.");
            return false;
        }
    }
}
