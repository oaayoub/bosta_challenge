CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;
-- CREATE EXTENSION pg_cron;

--grant usage to regular users:
-- GRANT USAGE ON SCHEMA cron TO marco;

CREATE TABLE book (
    ISBN varchar(30) PRIMARY KEY,
    author varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    available_quantity int NOT NULL,
    shelf_location varchar(50) DEFAULT 'TBD',
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
    ('978-3-16-148414-0', 'J.K. Rowling', 'Harry Potter and the Order of the Phoenix', 100, 'B2'),
    ('978-3-16-148411-1', 'J.R.R. Tolkien', 'The Lord of the Rings: The Fellowship of the Ring', 50, 'B2'),
    ('978-3-16-148412-2', 'George Orwell', '1984', 80, 'C3'),
    ('978-3-16-148413-3', 'F. Scott Fitzgerald', 'The Great Gatsby', 60, 'D4'),
    ('978-3-16-148414-4', 'Leo Tolstoy', 'War and Peace', 70, 'E5'),
    ('978-3-16-148415-5', 'Jane Austen', 'Pride and Prejudice', 90, 'F6'),
    ('978-3-16-148416-6', 'Mark Twain', 'Adventures of Huckleberry Finn', 85, 'G7'),
    ('978-3-16-148417-7', 'Gabriel Garcia Marquez', 'One Hundred Years of Solitude', 75, 'H8'),
    ('978-3-16-148418-8', 'Emily Bronte', 'Wuthering Heights', 55, 'I9'),
    ('978-3-16-148419-9', 'Harper Lee', 'To Kill a Mockingbird', 65, 'J10'),
    ('978-3-16-148420-0', 'Ray Bradbury', 'Fahrenheit 451', 45, 'K11'),
    ('978-3-16-148421-1', 'Jules Verne', 'Twenty Thousand Leagues Under the Sea', 40, 'L12'),
    ('978-3-16-148422-2', 'Herman Melville', 'Moby-Dick', 30, 'M13'),
    ('978-3-16-148423-3', 'Charles Dickens', 'Great Expectations', 25, 'N14'),
    ('978-3-16-148424-4', 'Victor Hugo', 'Les Misérables', 35, 'O15'),
    ('978-3-16-148425-5', 'Ernest Hemingway', 'The Old Man and the Sea', 20, 'P16'),
    ('978-3-16-148426-6', 'H.G. Wells', 'The War of the Worlds', 15, 'Q17'),
    ('978-3-16-148427-7', 'Aldous Huxley', 'Brave New World', 10, 'R18'),
    ('978-3-16-148428-8', 'Agatha Christie', 'Murder on the Orient Express', 5, 'S19'),
    ('978-3-16-148429-9', 'Mary Shelley', 'Frankenstein', 3, 'T20'),
    ('978-3-16-148430-0', 'Arthur Conan Doyle', 'The Adventures of Sherlock Holmes', 7, 'U21');

-- Inserting more borrowers
INSERT INTO borrower (name, email) 
VALUES 
    ('John Doe', 'john.doe@example.com'),
    ('Abo trika', 'trika@example.com'),
    ('Lorem User', 'Lorem@example.com'),
    ('Jane Ipsium', 'Ipsium@example.com'),
    ('Michael Jordon', 'nba@example.com');

INSERT INTO borrow_books (ISBN, borrower_id, valid_from, valid_to)
SELECT 
    b.ISBN,
    br.uid,
    CURRENT_TIMESTAMP, -- Set valid_from as current timestamp
    CURRENT_TIMESTAMP + INTERVAL '30 days' -- Set valid_to as 30 days from current timestamp
FROM 
    book b
CROSS JOIN 
    borrower br
WHERE 
    random() < 0.2; 
    
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


--INDEXING 
--Since Library Data is usually small So GIN Indexing won't take much time 
--While providing very fast Queries
CREATE INDEX idx_title ON book USING GIN (title); 
CREATE INDEX idx_name ON borrower USING GIN (name); 
--hash is used since mostly ISBN is triggered with "="  
CREATE INDEX idx_ISBN ON book USING HASH (ISBN);  
CREATE INDEX idx_email ON borrower USING HASH (email);  

CREATE INDEX idx_isbn_bid
ON borrow_books(ISBN,borrower_id);

--TODO : Make delte triggered and add filters to all borrowers 🔶 to make cron job useful
--cron job to delete borrowers that deleted their account and 30 days passed since then
-- SELECT cron.schedule('0 0 * * *', $$ -- Schedule the job to run every day at midnight
--   DELETE FROM borrower 
--   WHERE is_deleted = true 
--   AND modified_at < NOW() - INTERVAL '30 days';
-- $$);