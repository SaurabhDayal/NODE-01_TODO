/* Replace with your SQL commands */
ALTER TABLE
    todos
ADD
    COLUMN IF NOT EXISTS updated_at TIMESTAMP,
ALTER COLUMN
    isarchieved
SET
    DEFAULT NULL;