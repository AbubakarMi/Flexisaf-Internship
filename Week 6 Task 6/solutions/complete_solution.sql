-- COMPLETE WEEK 6 TASK 6 SOLUTION
-- This file contains all required operations in sequence

-- 1. Create database and table
CREATE DATABASE flexi;
\c flexi;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address TEXT,
    occupation VARCHAR(100),
    date DATE DEFAULT CURRENT_DATE
);

-- 2. INSERT operations
INSERT INTO users (firstname, lastname, address, occupation) VALUES
('John', 'Doe', '123 Main St', 'Software Engineer'),
('Jane', 'Smith', '456 Oak Ave', 'Data Analyst'),
('Mike', 'Johnson', '789 Pine Rd', 'Database Admin'),
('Sarah', 'Wilson', '321 Elm St', 'Web Developer'),
('David', 'Brown', '654 Maple Dr', 'System Admin');

-- 3. UPDATE operations
UPDATE users SET occupation = 'Senior Software Engineer' WHERE id = 1;
UPDATE users SET address = 'Updated: ' || address WHERE lastname = 'Smith';

-- 4. DELETE operations
DELETE FROM users WHERE id = 5;

-- 5. ALTER operations
ALTER TABLE users ADD COLUMN phone VARCHAR(15);
ALTER TABLE users DROP COLUMN phone;

-- 6. AGGREGATE operations
SELECT occupation, COUNT(*) as total_users FROM users GROUP BY occupation;

-- 7. Display final results
SELECT * FROM users;