-- UPDATE operations
-- Update specific user's occupation
UPDATE users 
SET occupation = 'Senior Software Engineer' 
WHERE firstname = 'John' AND lastname = 'Doe';

-- Update address for multiple users
UPDATE users 
SET address = 'UPDATED: ' || address 
WHERE occupation LIKE '%Engineer%';

-- Update date for records before specific date
UPDATE users 
SET date = CURRENT_DATE 
WHERE date < '2024-01-18';