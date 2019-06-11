AUTO-MART

![Build Status](https://travis-ci.org/teejohn247/Auto-Mart-Website.svg?branch=develop) ![Coverage Status](https://coveralls.io/repos/github/teejohn247/Auto-Mart-Website/badge.svg?branch=develop) ![Maintainability](https://api.codeclimate.com/v1/badges/73178d895a99a8a3de80/maintainability)

Auto Mart is an online marketplace for automobiles of diverse makes, version or body type. With
Auto Mart, sellers can promote their vehicles or buy from trusted dealers

------------------------------------------------------------------------------

## UI

## User Interface (UI)
* HTML
* CSS
* Javascript

### GitHub Pages link for UI
[AutoMart/UI link](https://teejohn247.github.io/Auto-Mart-Website/UI)

---------------------------------------------------------------------

## SERVER

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /automart| GET | swagger documentation |
| /api/v1/auth/signup| POST | Get the user to signup |
| /api/v1/auth/login | POST | Get the user to login |
| /api/v1/car | POST | Get the user to post a car sale advertisement |
| /api/v1/order | POST | Get the user to make a purchase order |
| /api/v1/cars/:id/ | PATCH | Get the user to update the price of his/her posted car sale ad |
| /api/v1/order/:id | PATCH | Get the user to update the price or his/her purchase order |
| /api/v1/car/:id | PATCH | Get user to mark his/her posted AD as sold  |
| /api/v1/car/:id | GET | Get user to view a specific car |
| /api/v1/cars/available | GET | Get user to User can view all unsold cars |
| /api/v1/cars/available/range | GET | Get the user to view all unsold cars within a price range |
| /api/v1/cars/posted | GET | Get the Aamin to view all posted ads whether sold or unsold |
| /api/v1/cars/available/used | GET | Get the user to view all used unsold cars |
| /api/v1/cars/available/new | GET | Get the user to view all new unsold cars |
| /api/v1/car/:id | DELETE | Get the admin to delete a posted AD record |

## Used Tools

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Testing Framework and assertion library
```
 *Mocha* and *Chai*
 ```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### Heroku link Example
[AutoMart heroku link](https://automart-webapp.herokuapp.com/api/v1)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository ```https://github.com/teejohn247/Auto-Mart-Website``` or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```


## Author
- Tolu Ajuwon 
- Email: teejohn247@gmail.com

---

## License & copyright
Copyright (c) Tolu Ajuwon
