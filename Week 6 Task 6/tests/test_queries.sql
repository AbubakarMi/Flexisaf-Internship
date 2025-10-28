-- Test queries to verify your solution
-- Test 1: Check database and table existence
SELECT datname FROM pg_database WHERE datname = 'flexi';

-- Test 2: Verify table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Test 3: Count records
SELECT COUNT(*) as total_users FROM users;

-- Test 4: Verify updates
SELECT * FROM users WHERE occupation LIKE '%Senior%';

-- Test 5: Verify deletions
SELECT * FROM users WHERE firstname = 'David';

-- Test 6: Check constraints
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'users';