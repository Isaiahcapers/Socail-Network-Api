# Social Network API

This is a social network API built with Node.js, Express, and MongoDB. It allows users to create accounts, add friends, and share their thoughts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/social-network-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd social-network-api
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

## Usage

1. Build the project:
    ```sh
    npm run build
    ```
2. Start the server:
    ```sh
    npm start
    ```
3. The server will be running on `http://localhost:3000`.

## API Endpoints

### Users

- **Get all users**
    ```http
    GET /api/users
    ```

- **Get a single user by ID**
    ```http
    GET /api/users/:userId
    ```

- **Create a user**
    ```http
    POST /api/users
    ```

- **Update a user**
    ```http
    PUT /api/users/:userId
    ```

- **Delete a user**
    ```http
    DELETE /api/users/:userId
    ```

- **Add a friend**
    ```http
    POST /api/users/:userId/friends/:friendId
    ```

- **Delete a friend**
    ```http
    DELETE /api/users/:userId/friends/:friendId
    ```

### Thoughts

- **Get all thoughts**
    ```http
    GET /api/thoughts
    ```

- **Get a single thought by ID**
    ```http
    GET /api/thoughts/:thoughtId
    ```

- **Create a thought**
    ```http
    POST /api/thoughts
    ```

- **Update a thought**
    ```http
    PUT /api/thoughts/:thoughtId
    ```

- **Delete a thought**
    ```http
    DELETE /api/thoughts/:thoughtId
    ```

- **Add a reaction**
    ```http
    POST /api/thoughts/:thoughtId/reactions
    ```

- **Delete a reaction**
    ```http
    DELETE /api/thoughts/:thoughtId/reactions/:reactionId
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.