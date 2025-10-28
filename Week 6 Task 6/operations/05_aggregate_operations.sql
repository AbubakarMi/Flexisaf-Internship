-- AGGREGATE operations
-- Count users by occupation
SELECT occupation, COUNT(*) as total_users
FROM users 
GROUP BY occupation 
ORDER BY total_users DESC;

-- Get date statistics
SELECT 
    MIN(date) as earliest_date,
    MAX(date) as latest_date,
    COUNT(*) as total_records
FROM users;

-- Group by multiple columns
SELECT 
    occupation,
    DATE_PART('year', date) as year,
    COUNT(*) as count
FROM users 
GROUP BY occupation, DATE_PART('year', date);