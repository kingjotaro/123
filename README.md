# Turbo Repo

This repository utilizes Turbo Build to automate the process of building, testing, linting, and deploying.

## Technologies Used

### Front-end

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: Declarative and component-based navigation for React.
- **ReactFlow**: Library for building interactive flow diagrams.

### Back-end

- **Koa**: Web framework for Node.js aiming to be a smaller, more expressive foundation for web applications and APIs.
- **MongoDB**: NoSQL database.
- **Mongoose**: Object-Document Mapping (ODM) for MongoDB.
- **dotenv**: Loads environment variables from .env files.
- **koa-bodyparser**: Middleware for Koa that parses request bodies.
- **koa-router**: Middleware for routing in Koa.
- **koa2-cors**: Middleware for Koa to enable Cross-Origin Resource Sharing (CORS).
- **node-fetch**: Module providing an interface for making HTTP requests.
- **router**: Routing library for Node.js.
- **jest**: Testing Library

## Project Configuration

- **turbo.json**: Defines the build pipeline.
- **package.json (front-end)**: Specific configurations for the front-end.
- **package.json (backend)**: Specific configurations for the back-end.
- **package.json (dev-1)**: General project configurations.

## My challenge report and decisions

[Challenge Report](ChallengeReport.md)

## Backend Endpoints

[Backend.MD](Backend.md)

## Frontend Design Data Flow 

![design data front](image-1.png)


## Running the Project

1. **Clone the repository:**

    ```
    git clone https://github.com/kingjotaro/123
    ```

2. **Get into repository source:** 

    ```
    cd 123
    ```

3. **Install all dependencies:**

    ```
    npm install
    ```

4. **Create .env file with MONGO_URI:** 

   Create a `.env` file with your `MONGO_URI` or use that 
   ```
   MONGO_URI='mongodb+srv://rafaelleet:a9n7w9d4@vum-c0.enxoa6a.mongodb.net/?retryWrites=true&w=majority&appName=Vum-c0/'
   ```
    to connect to your data on the backend repository root.


5. **Execute Turbo Dev:**

    ```
    npm run dev
    ```


For more information, refer to the [official Turbo documentation](https://turbo.build/docs).

