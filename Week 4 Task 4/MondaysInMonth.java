import java.time.LocalDate;
import java.time.DayOfWeek;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class MondaysInMonth {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a month (1-12): ");
        int month = scanner.nextInt();

        if (month < 1 || month > 12) {
            System.out.println("Invalid month. Please enter a number between 1 and 12.");
            scanner.close();
            return;
        }

        int currentYear = LocalDate.now().getYear();
        YearMonth yearMonth = YearMonth.of(currentYear, month);

        System.out.println("\nMondays in " + yearMonth.getMonth() + " " + currentYear + ":\n");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");

        // Start from the first day of the month
        LocalDate date = yearMonth.atDay(1);

        // Find the first Monday
        while (date.getDayOfWeek() != DayOfWeek.MONDAY) {
            date = date.plusDays(1);
        }

        // Print all Mondays in the month
        while (date.getMonthValue() == month) {
            System.out.println(date.format(formatter));
            date = date.plusWeeks(1);
        }

        scanner.close();
    }
}
