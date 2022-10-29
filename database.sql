CREATE DATABASE bookly;

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password text NOT NULL,
    age INT NOT NULL,
    school VARCHAR(255) NOT NULL
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
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Comments(
    id SERIAL PRIMARY KEY,
    text text NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    book_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Books(id)
);

