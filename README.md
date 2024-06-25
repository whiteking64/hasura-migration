# hasura-migration


## Setup & Usage
Following these steps will set up your Prisma and Hasura environment, allowing you to manage your PostgreSQL database with Prisma and expose it through a Hasura GraphQL endpoint.

1. Clone the repository.
2. Create a .env file in the root directory with the following content:
    ```
    DATABASE_URL=postgresql://postgresuser:postgrespassword@postgres:5432/postgresdb
    ```
3. Edit Prisma schema file at `prisma/schema.prisma` to define your own database schema. By default, it contains a simple `User` model.
4. Run ```docker-compose up -d``` to start the Docker services.
5. Generate and apply Prisma migrations, and generate the Prisma client using the provided script (`migration.sh`). Run `npm install` before it.
6. Access the Hasura console at http://localhost:8080 and track the new table.
    - Navigate to the Data tab.
    - Select the database (Postgres) and click Connect Existing Database.
    - Name the database.
    - For Database connection URL, use the environment variable: `HASURA_GRAPHQL_METADATA_DATABASE_URL`.
    - Click Connect Database.
    - In the public schema, find the User table and click Track.
7. Compile the TypeScript file and run the script:
    ```bash
    npm run build
    npm start
    ```
8. Go to the API tab to execute GraphQL queries. Example query to fetch all users:
    ```graphql
    query {
        User {
            id
            name
            email
        }
    }
    ```



