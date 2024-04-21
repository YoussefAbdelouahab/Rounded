![logo E](/img/logo.png)

# Technical documentation

Rounded project - Technical test - 2024
## Information

| Project Name | Rounded |
| ---: | :--- |
| Document Type | Technical documentation |
| Date | 21/04/2024 |
| Version | 1.0 |
| Writer | Abdelouahab Yousef (abdelo_y) |

## Table of content

- [Documentation technique](#technical-documentation)
  - [Information](#information)
  - [Table of content](#table-of-content)
- [Database](#database)
  - [Tips](#ps)
- [Back](#front)
  - [Install dependencies](#install-dependencies)
  - [Start the back](#start-the-back)
    - [Warning](#🔴-warning)
- [Front](#front)
  - [Install dependencies](#install-dependencies-1)
  - [Start the front](#start-the-front)
  - [Or](#or)
- [API](#api)
- [Annexes](#annexes)
  - [Table des illustrations](#table-des-illustrations)

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
### Install dependencies
- Go to front folder : `cd front`
- Install all packages : `npm install`

### Start the front
- run `npm run build` to compile
- run `npm run start` to start 
### Or
- run `npm run dev` to start in dev mode

## API
| URL | Type | Body |
| :--- | :--- | :--- |
| /api/init | GET | 
| /api/call | POST | {"from": "+33678901234","to": "+33123456789","date": "2024-04-02T09:00:00Z","duration": 310,"subject": "appointment","summary": "Madame Ottoc a appelé pour prendre rendez-vous pour une consultation la semaine prochaine"} 
| /api/calls | GET | 
| /api/calls/:to | GET |
| /api/calls/:from | PATCH | {"from": "+33678901234","to": "+33123456789","date": "2024-04-02T09:00:00Z","duration": 310,"subject": "appointment","summary": "Madame Ottoc a appelé pour prendre rendez-vous pour une consultation la semaine prochaine"} 
| /api/calls/:from  | DELETE | 
