# laundrywise-backend application

laundrywise-frontend application can be found [here](https://gitlab.lrz.de/seba-master-2021/team-39/backend.git)

## Prerequisites

Both for the backend and frontend application:

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

Just for the backend application:

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)

## Setup (before first run)

Go to your project root folder via command line
```
cd path/to/workspace/seba-master-movie-backend
```

**Install node dependencies**

```
npm install
```

**Set up your database**

* Create a new directory where your database will be stored (it's a good idea to separate data and business logic - the data directory should be on a different place than your app)
* Start the database server
```
mongod --dbpath "path/to/database"
```

## Start the project

**Development environment**
```bash
npm run devstart
```

**Production environment**
```bash
npm start
```


**Alternative (Recommended)**
Auto restart server on change 
First install nodemon
```bash
npm install nodemon
```
then run
```bash
nodemon index.js
```
The system will fetch the latest version of code base everytime you save your changes, no need to start everytime!
