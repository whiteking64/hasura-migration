# Hasura-Prisma-Auth0 Integration Project

This project integrates Hasura, Prisma, and Auth0 to create a secure, GraphQL-based API with a PostgreSQL database backend.

## Features

- Express.js server with TypeScript
- PostgreSQL database managed with Prisma
- Hasura GraphQL API
- Auth0 authentication
- JWT-based authorization
- CRUD operations for User model

## Prerequisites

- Node.js and npm
- Docker and Docker Compose
- Auth0 account

## Setup & Usage

1. Clone the repository.

2. Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL=postgresql://postgresuser:postgrespassword@postgres:5432/postgresdb
   AUTH0_DOMAIN=<your-auth0-domain.auth0.com>
   AUTH0_CLIENT_ID=<your-auth0-client-id>
   AUTH0_CLIENT_SECRET=<your-auth0-client-secret>
   SESSION_SECRET=<your-session-secret>
   HASURA_GRAPHQL_ADMIN_SECRET=<your-hasura-admin-secret>
   ```
   For local development, `HASURA_GRAPHQL_ADMIN_SECRET` can be found at docker-compose.yml file.

3. Edit the Prisma schema file at `prisma/schema.prisma` to define your database schema. The default `User` model is:
   ```prisma
   model User {
     id    Int     @id @default(autoincrement())
     name  String
     email String  @unique
   }
   ```

4. Run `docker-compose up -d` to start the Docker services (PostgreSQL and Hasura).

5. Install dependencies:
   ```bash
   npm install
   ```

6. Generate and apply Prisma migrations, and generate the Prisma client:
   ```bash
   npm run migrate
   ```

7. Access the Hasura console at http://localhost:8080 and set up the database connection:
   - Navigate to the Data tab.
   - Click "Connect Database" and choose "Connect existing database".
   - Name the database (e.g., "default").
   - Use the environment variable `HASURA_GRAPHQL_METADATA_DATABASE_URL` for the Database URL.
   - Click "Connect Database".
  NOTE: You can also use Hasura metadata in `hasura/` directory to set up the database. Use:
   ```bash
   cd hasura
   hasura metadata apply --admin-secret <your-hasura-admin-secret>
   ```

8. Track the `User` table in Hasura:
   - In the public schema, find the User table and click "Track".

9. Set up permissions for the `User` table in Hasura:
   - Go to the "Permissions" tab for the `User` table.
   - Add permissions for the `user` role as needed (refer to your Hasura metadata for exact permissions).

10. Compile the TypeScript files and start the Express server:
    ```bash
    npm run build
    npm start
    ```

11. The server should now be running at `http://localhost:3000`.

## API Endpoints

- GET `/`: Hello World response
- GET `/login`: Initiates Auth0 login flow
- GET `/callback`: Auth0 callback URL
- GET `/logout`: Logs out the user
- GET `/profile`: Returns the user profile (protected route)
- POST `/api/users`: Create a new user (protected route for API)
- GET `/api/users/:id`: Get a user by ID (protected route for API)
- PUT `/api/users/:id`: Update a user (protected route for API)
- DELETE `/api/users/:id`: Delete a user (protected route for API)

## Testing the API

To test the protected routes, you need to obtain a JWT token from Auth0. Follow these steps:

1. Run:
   ```bash
   TOKEN=$(curl --request POST \
      --url https://<your-auth0-client-domain>.us.auth0.com/oauth/token \
      --header 'content-type: application/json' \
      --data '{
         "client_id":"your-auth0-client-id",
         "client_secret":"your-auth0-client-secret",
         "audience":"your-auth0-audience",
         "grant_type":"client_credentials"
      }' | jq -r '.access_token')
   ```
2. Use this token in your API requests:
   ```bash
   curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/users/1
   ```

## Hasura GraphQL API

You can also interact with your data through the Hasura GraphQL API:

1. Open the Hasura console at `http://localhost:8080`.
2. Go to the "API" tab to write and execute GraphQL queries.

Example query to fetch all users:
```graphql
query {
  User {
    id
    name
    email
  }
}
```

## Development

- `src/`: TypeScript source files
- `prisma/schema.prisma`: Prisma schema file
- `hasura/metadata`: Hasura metadata files
