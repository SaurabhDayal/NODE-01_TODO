/* Replace with your SQL commands */
DROP TABLE IF EXISTS todos;

CREATE TABLE IF NOT EXISTS users
(
    id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name     VARCHAR(255),
    email    VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS todos
(
    id           UUID      DEFAULT gen_random_uuid(),
    todoValue    TEXT,
    isCompleted  BOOLEAN   DEFAULT false,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT NULL,
    archieved_at TIMESTAMP DEFAULT NULL,
    user_id      uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);