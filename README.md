# Welcome to Bookclub 👋

Bookclub is a simple and small web app for managing book entries. It consists of a back-end written in Express and a barebones html/js front-end.

## Installation and usage

##### 📥 Download bookclub's repo.

##### 🏃‍♂️ After making sure you have node.js installed, traverse to /bookclub-api and run:

```bash
npm start
```

##### ⭐ Then, go back, open the index.html file in the /public directory and voila!

## Technologies used
- back-end
    - Express
- front-end
    - Bootstrap v5, vanilla html/js

## Bookclub api specification
| Action | Route           | Request                                                                                                         | Response                                                                       | Result                                                                                           |
| ------ | --------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Get    | /books          | -                                                                                                               | {   books: array of books }                                                    | Returns an object containing an array of the available books.                                    |
| Post   | /books          | {   author: author of the book, title: title of the book, genre: genre of the book, price: price of the book  } | {   book_insertion: boolean   message: message that accompanies the response } | If all go well, adds a book in the database,                                                     |
| Get    | /books?keyword= | -                                                                                                               | {   books: array of books }                                                    | Returns an object containing an array of the books that their titles contain the given keyword.. |


