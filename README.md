# Welcome to Bookclub 👋

Bookclub is a simple and small web app for managing book entries. It consists of a back-end written in Express and a barebones html/js front-end.

## Installation and usage

##### 📥 Download ***bookclub's repo*** and make sure you have ***node.js*** installed.

#### For the Bookclubs's API

##### 🏃‍♂️ Traverse to /bookclub-api and hit:

```bash
npm start
```
Look out for some instructional messages in your console

#### For the Bookclubs's UI

##### ⭐ Traverse to /public and hit:

```bash
npx serve
```
You will be hosting a local web-server that serves the bookclub's UI. Visit the address that you see on your screen and voilà!

## Technologies used
- back-end
    - Express
- front-end
    - Bootstrap v5, vanilla html/js

## Bookclub's api cheatsheet
| Action | Endpoint        | Request's body                                                  | Response's body                              | Result                                                                                                                                                                                                                |
|--------|-----------------|-----------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /books          | -                                                               | { books: books[] }                           | Returns an object with the sole key of "books", that it's value is an array of the available books on the Bookclub's database.                                                                                        |
| POST   | /books          | { author: string,  title: string, genre: string, price: number} | { book_insertion: boolean, message: string } | Returns an object containing the "book_insertion" key that it's value indicated whether the book insertion was successful, and the "message" key where it's value is the message that accompanies the API's response. |
| GET    | /books?keyword= | -                                                               | { books: books[] }                           | Returns an object with the sole key of "books", that it's value is an array of the available books on the Bookclub's database that match the given query.                                                             |
