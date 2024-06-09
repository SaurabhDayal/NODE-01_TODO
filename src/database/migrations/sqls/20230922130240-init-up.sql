/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS todos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    todoValue VARCHAR(200),
    isCompleted BOOLEAN DEFAULT false,
    createdAt TIMESTAMP DEFAULT now(),
    isArchieved TIMESTAMP DEFAULT now()
)