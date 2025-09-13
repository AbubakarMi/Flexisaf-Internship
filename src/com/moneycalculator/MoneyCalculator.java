package com.moneycalculator;

public class MoneyCalculator {
    private final ExchangeRateLoader loader;

    public MoneyCalculator(ExchangeRateLoader loader) {
        this.loader = loader;
    }

    public Money convert(Money money, Currency to) {
        if (money.getCurrency().equals(to)) {
            return money;
        }

        ExchangeRate rate = loader.load(money.getCurrency(), to);
        double convertedAmount = money.getAmount() * rate.getRate();
        return new Money(convertedAmount, to);
    }

    public Money add(Money money1, Money money2, Currency resultCurrency) {
        Money converted1 = convert(money1, resultCurrency);
        Money converted2 = convert(money2, resultCurrency);
        return new Money(converted1.getAmount() + converted2.getAmount(), resultCurrency);
    }

    public Money subtract(Money money1, Money money2, Currency resultCurrency) {
        Money converted1 = convert(money1, resultCurrency);
        Money converted2 = convert(money2, resultCurrency);
        return new Money(converted1.getAmount() - converted2.getAmount(), resultCurrency);
    }
}