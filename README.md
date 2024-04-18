
# Rounded

## Database
- Create a `MySQL` database named `Rounded`
- Take care to have a user named `root` (see `src/db` file)
    #### PS
    Generally a root user is automatically created by installing MySQL so you have nothing to do.

## Back-end
### Install dependencies
- Go to back folder : `cd back`
- Install all packages : `npm install`

### Start the back
- run `npm start`

    the command `npm start` will : 
    - Initialize and start the server
    - Link the database and create the entity named `call`
    - Initialize the data by storing the Json file datas in the database
    #### 🔴 Warning
    Starting the server will add the json in database. Take care to empty your database before starting the server.

## Front-end