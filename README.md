# Enchanced_authentication_api

This project about enchansing the user authentication

## Pre-requisites

- Node.js and npm installed
- Google API credentials (client ID and client secret)

### Environment Detail

# Create a .env file and add it inside root folder and paste the following env variables.

PORT=\*\*\*\*(Valid 4 digit number as 3000)

1. Create a project in the Google Developers Console 'https://console.cloud.google.com/'
2. Enable the Google Login API for your project.
3. Obtain the client ID and client secret.
4. Add the client Id and client secret as following below inside .env file

GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

## Project Setup

1. Run command "npm install" after cloning from github
2. Start the application: `npm start`
3. Open your browser(chrome/edge) and navigate to 'http://localhost:3000/restapi' to get the swagger page inorder to access the API detail and trigger.
4. For google login we can open browser and navigate to 'http://localhost:3000/api/v1/auth/google'

## API's curl command for all the API

# API for Image upload during profile pic upload

curl -X POST \
 'http://localhost:3000/api/v1/users/uploadImage' \
 --header 'Accept: _/_' \
 --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
 --form 'image=@c:\Users\pavan\Downloads\nodejs.webp'

# API for register User

curl -X POST \
 'http://localhost:3000/api/v1/users/register' \
 --header 'Accept: _/_' \
 --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
 --header 'Content-Type: application/json' \
 --data-raw '{
"name": "sreevidya",
"email": "sreevidyachowlur@gmail.com",
"phone": 15622555898,
"profilePic": "https://example.com/profile5.jpg",
"password": "abc123xyz",
"bio": "jsxbhjsbhjbd",
"role":"USER",
"profileType":"PRIVATE"
}'

# API for login

curl -X POST \
 'http://localhost:3000/api/v1/users/login' \
 --header 'Accept: _/_' \
 --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
 --header 'Content-Type: application/json' \
 --data-raw '{
"email": "abc@gmail.com",
"password": "abc123xyz"
}'

# API for Google login

http://localhost:3000/api/v1/auth/google

# API for getOwn profile Details

curl -X GET \
 'http://localhost:3000/api/v1/users/viewMyProfile' \
 --header 'Accept: _/_' \
 --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
 --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQUJDIiwicm9sZSI6IlVTRVIiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJwcm9maWxlVHlwZSI6IlBVQkxJQyIsImlhdCI6MTcxMjY3NjgxMX0.g4A6RNXm1kyAxCuHOKo01dOq8I_E3vTYY5vc5DH8CFk'

# API for get User Profiles

curl -X GET \
 'http://localhost:3000/api/v1/users/viewProfile/66153763bccc347154d91bd9' \
 --header 'Accept: _/_' \
 --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
 --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQUJDIiwicm9sZSI6IlVTRVIiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJwcm9maWxlVHlwZSI6IlBVQkxJQyIsImlhdCI6MTcxMjY3NjgxMX0.g4A6RNXm1kyAxCuHOKo01dOq8I_E3vTYY5vc5DH8CFk'

# API for make user profile public and private

curl -X PATCH \
 'http://localhost:3000/api/v1/users/switchProfileType/inactive' \
 --header 'Accept: _/_' \
 --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
 --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQUJDIiwicm9sZSI6IlVTRVIiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJwcm9maWxlVHlwZSI6IlBVQkxJQyIsImlhdCI6MTcxMjY3NjgxMX0.g4A6RNXm1kyAxCuHOKo01dOq8I_E3vTYY5vc5DH8CFk'
