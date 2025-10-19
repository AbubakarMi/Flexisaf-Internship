-- Create a new database
CREATE DATABASE flexi;

-- Connect to the database
\c flexi;

-- Create table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    address TEXT,
    occupation VARCHAR(100),
    date_created DATE DEFAULT CURRENT_DATE
);

-- Insert data
INSERT INTO users (firstname, lastname, address, occupation)
VALUES 
('Muhammad', 'Abubakar', 'Kano, Nigeria', 'Software Engineer'),
('Aisha', 'Bello', 'Abuja, Nigeria', 'Data Analyst'),
('John', 'Doe', 'Lagos, Nigeria', 'Web Developer');

-- Update data
UPDATE users
SET occupation = 'Senior Software Engineer'
WHERE firstname = 'Muhammad';

-- Delete data
DELETE FROM users
WHERE lastname = 'Doe';

-- View all data
SELECT * FROM users;
