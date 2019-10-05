# Ad-Form-assignment

## Deployment steps

- git clone  
  https://github.com/SrinivasaKK/Ad-Form-assignment.git
- cd Ad-Form-assignment
- npm install
- pm2 start index.js
- Server runs on PORT provided by env variable if present or 4000

## Paths:

- GET “/owner” lists all the owners. (Reading from json file (owners.json) - already present in server)
- GET “/pets” lists all the pets present (Reads from pets.json file. It is created when an owner creates new pet)
- GET “/owner/id” - lists all the pets belongs to that corresponding owner
- POST "/pets" - post the pet data to pets.json file.
- PUT "/pets/id" - updates the pet with the corresponding id.
