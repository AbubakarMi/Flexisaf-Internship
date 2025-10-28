-- INSERT operations
-- Insert single record
INSERT INTO users (firstname, lastname, address, occupation) 
VALUES ('Robert', 'Davis', '555 Cedar Lane, Denver', 'DevOps Engineer');

-- Insert multiple records
INSERT INTO users (firstname, lastname, address, occupation) 
VALUES 
    ('Emily', 'Clark', '777 Birch Street, Portland', 'UX Designer'),
    ('James', 'Miller', '888 Spruce Avenue, Miami', 'Project Manager');

-- Insert with specific date
INSERT INTO users (firstname, lastname, address, occupation, date) 
VALUES ('Lisa', 'Taylor', '999 Oak Road, Atlanta', 'Business Analyst', '2024-01-25');