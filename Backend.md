# Endpoints

## GET /get

Endpoint to handle GET requests for retrieving a drawer document by name.

### Query Parameters

- **name**: (string) The name of the drawer document to retrieve.

### Responses

- **200 OK**: The drawer document was successfully retrieved.

  - Body: JSON object representing the drawer document.

- **400 Bad Request**: The 'name' parameter is missing or empty in the query string.

  - Body: `{ "error": "Name parameter is missing in the query string" }`

- **404 Not Found**: No drawer document was found for the provided name.

  - Body: `{ "error": "Drawer not found for the provided name" }`

- **500 Internal Server Error**: An unexpected error occurred.
  - Body: `{ "error": "Internal server error" }`

## GET /getall

Endpoint to handle GET requests for retrieving all drawer documents.

### Responses

- **200 OK**: Successfully retrieved all drawer documents.

  - Body: JSON array representing the retrieved drawer documents.

- **404 Not Found**: No data found in the database.

  - Body: `{ "error": "No data found in the database" }`

- **500 Internal Server Error**: An unexpected error occurred.
  - Body: `{ "error": "Internal server error" }`

## POST /execution/:param

Endpoint to handle POST requests for executing conditions based on a parameter.

### Parameters

- **param**: The parameter used to determine which conditions to execute.

### Request Body

The request body should contain the necessary data for processing conditions.

### Responses

- **200 OK**: Successfully executed the conditions.

  - Body: `{ "decision": <decision> }`, where `<decision>` is the result of processing the conditions.

- **400 Bad Request**: Missing parameters.

  - Body: `{ "error": "Missing Parameters" }`

- **500 Internal Server Error**: An unexpected error occurred.
  - Body: `{ "error": <error message> }`, where `<error message>` describes the error encountered.

## POST /post

Endpoint to handle POST requests.

### Request Body

The request body should contain the following fields:

- **name** (string, required): The name of the drawer.
- **nodes** (array, required): An array of nodes associated with the drawer.
- **edges** (array, required): An array of edges associated with the drawer.

### Responses

- **201 Created**: Successfully created a new drawer.

  - Body: The newly created drawer object.

- **200 OK**: Successfully updated an existing drawer.

  - Body: The updated drawer object.

- **400 Bad Request**: Missing request body or missing required fields in the request body.

  - Body: `{ "error": "Missing request body" }` or `{ "error": "Missing required fields in the request body" }`

- **500 Internal Server Error**: An unexpected error occurred.
  - Body: `{ "error": "Internal server error" }`
