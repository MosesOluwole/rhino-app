# rhino-notes-app

## Building and Running the App with Docker

Open a Terminal:
Navigate to the root folder of your project (the folder containing docker-compose.yml).

## Build and Start All Services

Run the following command:

```bash
$ docker-compose up --build
```

This command will:

Build Docker images for PostgreSQL, Redis, backend, and frontend.

Start all containers as defined in the docker-compose.yml file.

The build for the frontend uses a multi-stage Dockerfile (with Node 18 for building and Nginx for serving).

## Verify the Services:

Frontend: Open your browser and navigate to http://localhost:3001 to view the React application.

Backend API: Access http://localhost:3000/notes to verify the backend API endpoints.

PostgreSQL & Redis: These services run in the background. You can connect to PostgreSQL on port 5433 and Redis on port 6380 from your local tools if needed.

## Running Migrations (Very Important)

To run migrations, please run the below script

```bash
$ docker exec -it <backend_container_id_or_name> sh
```

Then run the below

```bash
$ npx mikro-orm migration:create --config src/infrastructure/orm/orm.config.ts
```

```bash
$ npx mikro-orm migration:up --config src/infrastructure/orm/orm.config.ts
```
