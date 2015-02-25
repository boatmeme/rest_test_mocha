# API Testing with Mocha
* * *
A guest lecture presented at RefactorU on February 24, 2015 by Jonathan Griggs and Tim Myers of Ombud

Deck
=============
The slide deck is implemented using reveal.js and can be viewed by cloning this repository and running the following from the command line

    cd slides
    npm install
    grunt serve


Code exercises
=============
The interactive coding portion can be worked from the src directory. This contains the unimplemented version of the code exercises.

The goal is to implement a Books API using Test Driven Development, satisfying the following requirements

 * Front-end application needs a RESTful API for managing books
 * Books have a title and author
 * Should be able to get a list of all books
 * Should be able to get the details for a single book
 * Should be able to create new books
 * Should be able to update existing books
 * Should be able to delete a book

Modifications should be made to the following files:

  * **/test/BooksApiTest.js** - Your mocha test implementation code should be done in here.
  * **/api/BooksApi.js** - You should define routes that satisfy your test specification here.
  * **/middleware/BookController** - You should not need to modify this file, but it can be used as a reference for which functions you should pass to your route definitions in BooksApi.

To run your tests:

    cd src
    npm install
    mocha

Reference Implementation
=============

A completed reference implementation of the code exercises is provided in /src_answers



