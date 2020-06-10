# Stockify

## Introduction

Stockify is a mock stock portfolio management web application where users can exercise trading stocks without financial risks.
Users can purchase and sell owned-stocks with prices updated in real-time. User can track portfolio's performance according to opening and current stock prices.
User's transaction history is recorded to a relational database for future auditing needs.

Please visit the following link and feel free to create an account. Have fun!

https://stockify-stocks.herokuapp.com/

## Technologies

* Node: JavaScript runtime environment

* Express: Node library to handle HTTP requests and additional middleware inclufing passport.js to store cookies.

* React: JavaScript library to keep UI and state in sync through its virtual DOM.

* Redux: State management library that allows data to flow to any component despite the uni-directional data flow paradigm.

* PostgreSQL: Open-source relational database with ACID transactions, optimal for financial related applications that require consistency.

* Sequelize: Object relatational mapping that allows SQL queries to be done in JavaScript and protects the database from SQL injections.

* Mocha: JavaScript test framework for Node applications

* Chai: Test-Driven Development Assertion Library

* IEX API: Stock API to get data regarding each stock tickers.

## Thought Process

1.  Stockify has a well-defined structure in terms of data and simulates financial transactions. Hence, a relational database was selected to
    store and organize the user's data for its ACID transactions. Stockify normalizes its data by creating separate tables for the user's information,
    stock information, and transaction's history information. Stockify is also projected to see a higher write-to-read ratio which makes a normalized database
    more optimal.

2.  Unit tests were written with Mocha and Chai to validate REST APIs and SQL data models, increasing productivity by reducing the need to debug.

3.  Security is another concern for Stockify. To protect a user's account, Stockify's back-end was written to ensure passwords are hashed using
    a NPM package called bcrypt. Security is tightened by adding a randomized salt string to help minimize attacks from hackers using a rainbow table.

4.  As a user, I would like to purchase and sell stocks with the latest price. Data was pulled from IEX Cloud API to ensure I have the latest
    prices for each stock that I am looking to purchase and/or sell. Within a user's portfolio, a stock that is highlighted red indicates the current value
    is less than the opening value. Green on the other hand indicates the current value is higher than the opening value. Grey indicates it is neutral.

5.  React and Redux were used to render the front-end elements. React made it very intuitive to make Stockify a single-page application through its virtual
    DOM. Manipulating the DOM is very expensive, whereas the virtual DOM only makes changes to the DOM where it is necessary. Redux complements React by storing global
    state in a central location. This makes passing data to deeply nested components without having to pass them through from a parent components very easily.
