-- Create users table with all required columns and constraints
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address TEXT,
    occupation VARCHAR(100),
    date DATE DEFAULT CURRENT_DATE
);

-- Add unique constraint
ALTER TABLE users ADD CONSTRAINT uk_user_fullname UNIQUE (firstname, lastname);