CREATE TABLE book (
    ISBN varchar(17) PRIMARY KEY,
    author varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    is_deleted boolean DEFAULT false, 
    available_quantity int NOT NULL,
    shelf_location varchar(50),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (available_quantity > -1)
);

CREATE TABLE borrower (
    uid SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    is_deleted boolean DEFAULT false, 
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE borrow_books (
    borrow_book_id SERIAL PRIMARY KEY,
    ISBN varchar(17),
    borrower_id int,
    valid_from timestamp,
    valid_to timestamp,
    return_date timestamp,
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (borrower_id) REFERENCES borrower(uid)
);

-- Example of inserting a borrower with automatic population of created_at and modified_at
INSERT INTO book (ISBN, author, title, available_quantity, shelf_location) 
VALUES 
    ('978-3-16-148411-0', 'J.K. Rowling', 'Harry Potter and the Chamber of Secrets', 150, 'A2'),
    ('978-3-16-148412-0', 'J.K. Rowling', 'Harry Potter and the Prisoner of Azkaban', 120, 'A3'),
    ('978-3-16-148413-0', 'J.K. Rowling', 'Harry Potter and the Goblet of Fire', 110, 'B1'),
    -- Insert more books here
    ('978-3-16-148414-0', 'J.K. Rowling', 'Harry Potter and the Order of the Phoenix', 100, 'B2');

-- Inserting more borrowers
INSERT INTO borrower (name, email) 
VALUES 
    ('John Doe', 'john.doe@example.com'),
    ('Jane Smith', 'jane.smith@example.com'),
    ('Michael Johnson', 'michael.johnson@example.com');
    
-- Create trigger to update modified_at timestamp on UPDATE
CREATE OR REPLACE FUNCTION update_modified_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_book_modified_at
BEFORE UPDATE ON book
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();