# Ad-Form-assignment

## Deployment steps

- git clone  
 https://github.com/SrinivasaKK/Pet-Shop.git
- cd Pet-Shop
- npm install
- pm2 start index.js
- Server runs on PORT provided by env variable if present or 4000
- launch the application in browser (if used with custom ip - then 'http://custom-ip:port' else http://localhost:port)

## Running unit tests

- Run the command - npm test

- used mocha framework and chai assertion library to test the application

## Linting

- Used JSHint liting tool for linting the application.
- jshint --verbose fileName.js

## Logging

- Used Morgan to create logs.
- log directory is created when the server is started for the first time.
- each request is logged.
- logs are rotated on a daily basis.

## Test cases written

1. /GET owners - to test the listing of owners
2. /GET pets - When pets.json file is not present (negative test case)
3. /POST pets - to write the pet data into pets.json file (positive test case with all expected values. Added two pets to the file which would help demonstrate update operation on one of the pets)
4. /GET pets - to get all the pets (positive test case)
5. /POST pets - negative test cases

   - name, type, color, breed, age, ownedBy are all required fields
   - tested by removing each required field
   - type of pet is restricted to cat or dog only.
   - age must be greater than 0 and less than 50

6. /PUT/:id pets - negative test cases

   - name, type, color, breed, age, ownedBy are all required fields
   - tested by removing each required field
   - type of pet is restricted to cat or dog only.
   - age must be greater than 0 and less than 50

7. /PUT/:id pets - positive test case. It will update the pet with given id with new values provided

8. /GET/:id owner - Get pets belonging to particular owner (positive test case)

9. /GET/:id owner - it should not GET a pet by the given owner id (negative case)

   (total 27 test cases are written)

## Paths

- GET “/owner” lists all the owners. (Reading from json file (owners.json) - already present in server)
- GET “/pets” lists all the pets present (Reads from pets.json file. pets.json file is created when an owner creates new pet)
- GET “/owner/id” - lists all the pets belongs to that corresponding owner
- POST "/pets" - post the pet data to pets.json file.
- PUT "/pets/id" - updates the pet with the corresponding pet id.

## Project Structure

- index.js is the entry point of the application
- config.js file has required configurations
- dist directory
  - This directory has the files generated after compiling the fron end angular application created for this project. I have not inclued the complete angular application here - https://github.com/SrinivasaKK/Pet-Shop-Front-End.git
  - The angular application can be found in the link -
- data directory
  - has owner.json file which holds all the details about owners
  - once user post the pet data, pets.json file is created in the directory
- lib directory
  - has helpers.js file. It includes all common functions used across the application
- log directory
  - each request is logged
  - logs are rotated on a daily basis
- routes directory
  - has owner and pets route
- test directory
  - has test.js file. used for unit testing of the application.
- not-important directory

  - It is not common practice to include .env file when the project is pushed to git.
    Since this is an assignment, to demonstrate my approach, I have included this directory which has

    - Logs directory which has some logs of my previous testing.
    - .env
