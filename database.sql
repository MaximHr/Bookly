CREATE DATABASE bookly;
CREATE EXTENSION pg_trgm;

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password text NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    school VARCHAR(255) NOT NULL,
    ratedBooks INT[], 
    readBooks INT[] --масив с id-то на прочетените книги
);

CREATE TABLE Books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description text NOT NULL,
    views INT DEFAULT 0,
    price INT DEFAULT 0,
    tags VARCHAR(255)[],
    file text UNIQUE NOT NULL, -- път към pdf файла
    cover text NOT NULL, -- линк към вече качената снимка в imgur
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    summedRating DECIMAL DEFAULT 0,
    numberOfRatings INT DEFAULT 0
    -- за да вземем рейтинга, разделяме summedRatings на numberOfRatings
);

CREATE TABLE Comments(
    id SERIAL PRIMARY KEY,
    text text NOT NULL,
    user_id INT NOT NULL, -- човекът, който пише коментара
    FOREIGN KEY (user_id) REFERENCES Users(id),
    book_id INT NOT NULL, --книгата, на която е написан коментарът
    FOREIGN KEY (book_id) REFERENCES Books(id)
);

