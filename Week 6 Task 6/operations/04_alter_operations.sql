-- ALTER TABLE operations
-- Add new column
ALTER TABLE users ADD COLUMN email VARCHAR(100);

-- Drop column
ALTER TABLE users DROP COLUMN email;

-- Remove constraint
ALTER TABLE users DROP CONSTRAINT uk_user_fullname;

-- Add new constraint
ALTER TABLE users ADD CONSTRAINT chk_occupation_length CHECK (LENGTH(occupation) > 2);