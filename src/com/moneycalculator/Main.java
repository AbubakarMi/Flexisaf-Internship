package com.moneycalculator;

public class Main {
    public static void main(String[] args) {
        // Create currencies
        Currency usd = new Currency("USD", "US Dollar", "$");
        Currency eur = new Currency("EUR", "Euro", "€");
        Currency gbp = new Currency("GBP", "British Pound", "£");
        Currency jpy = new Currency("JPY", "Japanese Yen", "¥");

        // Create exchange rate loader
        ExchangeRateLoader loader = new FileExchangeRateLoader("data/exchangeRates.txt");
        MoneyCalculator calculator = new MoneyCalculator(loader);

        // Create some money objects
        Money money1 = new Money(100, usd);
        Money money2 = new Money(50, eur);
        Money money3 = new Money(75, gbp);

        System.out.println("Money Calculator");
        System.out.println("================");
        
        // Convert currencies
        System.out.println(money1 + " = " + calculator.convert(money1, eur));
        System.out.println(money2 + " = " + calculator.convert(money2, usd));
        System.out.println(money3 + " = " + calculator.convert(money3, jpy));
        
        // Add amounts in different currencies
        Money sum = calculator.add(money1, money2, usd);
        System.out.println(money1 + " + " + money2 + " = " + sum);
        
        // Subtract amounts in different currencies
        Money difference = calculator.subtract(money1, money2, eur);
        System.out.println(money1 + " - " + money2 + " = " + difference);
    }
}