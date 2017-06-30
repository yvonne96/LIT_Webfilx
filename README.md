Training application that uses,

- Angular 2
- Typescript
- SystemJS
- Karma
- Spring Boot
- Maven
- NodeJS

# Build Instructions
## Database 
There is a postgres SQL script in the "db" folder to complete reconstruct the database with
some dummy data.

    psql -U postgres < recreateDatabase.sql
    
## Server

The server project lives in server/webflix.

- Install the maven dependencies
- Run the Maven "spring-boot:run" goal

To do this in Eclipse,
- Right click on the pom.xml file in the project root
- Select Run As -> Maven install
- Select Run As -> Maven Build
  - Enter the goal as 'spring-boot:run'

The rest service should now be running on http://localhost:8080

## Client

The client project lives in client/webflix

- Install the npm dependencies

        cd client/webflix
        npm install
        
- To compile,

        npm run tsc
        
- To start a client web service

        npm start