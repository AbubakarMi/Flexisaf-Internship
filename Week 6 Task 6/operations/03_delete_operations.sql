-- DELETE operations
-- Delete specific user
DELETE FROM users 
WHERE firstname = 'David' AND lastname = 'Brown';

-- Delete by occupation
DELETE FROM users 
WHERE occupation = 'System Administrator';

-- Delete by date condition
DELETE FROM users 
WHERE date < '2024-01-17';