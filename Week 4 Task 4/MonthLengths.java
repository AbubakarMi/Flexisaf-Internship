import java.time.Year;
import java.time.Month;
import java.util.Scanner;

public class MonthLengths {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a year: ");
        int year = scanner.nextInt();

        System.out.println("\nMonth lengths for year " + year + ":\n");

        for (Month month : Month.values()) {
            int days = month.length(Year.isLeap(year));
            System.out.println(month + ": " + days + " days");
        }

        scanner.close();
    }
}
