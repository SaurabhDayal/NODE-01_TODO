/* Replace with your SQL commands */
UPDATE
    todos
SET
    isarchieved = NULL
WHERE
    isarchieved IS NOT NULL;