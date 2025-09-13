package com.moneycalculator;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class FileExchangeRateLoader implements ExchangeRateLoader {
    private final Map<String, Double> rates = new HashMap<>();
    private final String filename;

    public FileExchangeRateLoader(String filename) {
        this.filename = filename;
        loadRates();
    }

    private void loadRates() {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split("=");
                if (parts.length == 2) {
                    rates.put(parts[0], Double.parseDouble(parts[1]));
                }
            }
        } catch (IOException e) {
            System.err.println("Error loading exchange rates: " + e.getMessage());
        }
    }

    @Override
    public ExchangeRate load(Currency from, Currency to) {
        String key = from.getCode() + "_" + to.getCode();
        if (rates.containsKey(key)) {
            return new ExchangeRate(from, to, rates.get(key));
        }
        throw new RuntimeException("Exchange rate not found: " + key);
    }
}