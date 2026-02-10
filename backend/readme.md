# POST /api/users/signup

Description
-
Registers a new user account and returns an access token plus the created user object.

Endpoint
-
- Method: `POST`
- Path: `/api/users/signup`
- Content-Type: `application/json`

Request body
-
The endpoint expects a JSON body with the following fields:

- `username` (string) — required, non-empty. Unique.
- `fullname` (string) — required, non-empty.
- `email` (string) — required, must be a valid email, unique.
- `password` (string) — required, minimum length 6 characters.

Validation behavior
-
- If any validation fails, the endpoint responds with HTTP `400` and an `errors` array describing each issue.

Example request
-
```json
{
  "username": "johndoe",
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Success response
-
- Status: `201 Created`
- Content: JSON object containing `success`, `token` and `user` fields.

Example success response
-
```json
{
  "success": true,
  "token": "eyJhbGciOiJI...", 
  "user": {
    "id": "642a1f6e9b1c2a001234abcd",
    "username": "johndoe",
    "fullname": "John Doe",
    "email": "john@example.com",
    "role": "rider"
  }
}
```

Error responses
-
- `400 Bad Request` — validation errors. Example:

```json
{
  "errors": [
    { "msg": "Username is required", "param": "username", "location": "body" },
    { "msg": "Valid email is required", "param": "email", "location": "body" }
  ]
}
```

- `500 Internal Server Error` — unexpected server error. Example:

```json
{
  "success": false,
  "message": "Internal server error"
}
```

Notes
-
- In this project the controller creating users returns a JWT `token` and the saved `user` (without the password).
- Use `Content-Type: application/json` header when calling the endpoint.
- Newly registered users are assigned the default role `rider`.


Curl example
-
```bash
curl -X POST http://localhost:4000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "secret123"
  }'

```

---

# POST /api/users/login

Description
-
Authenticates an existing user and returns an access token plus the user object.

Endpoint
-
- Method: `POST`
- Path: `/api/users/login`
- Content-Type: `application/json`

Request body
-
The endpoint expects a JSON body with the following fields:

- `email` (string) — required, must be a valid email.
- `password` (string) — required, minimum length 6 characters.

Validation & auth behavior
-
- If validation fails, the controller currently responds with HTTP `401` and an `errors` array.
- If credentials are invalid (no user or wrong password), the endpoint responds with HTTP `401` and a message `Invalid email or password`.

Example request
-
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Success response
-
- Status: `200 OK`
- Content: JSON object containing `token` and `user` fields.

Example success response
-
```json
{
  "token": "eyJhbGciOiJI...",
  "user": {
    "_id": "642a1f6e9b1c2a001234abcd",
    "username": "johndoe",
    "fullname": "John Doe",
    "email": "john@example.com",
    "role": "rider"
  }
}
```

Error responses
-
- `401 Unauthorized` — validation or credential errors. Examples:

Validation error example:
```json
{
  "errors": [
    { "msg": "Valid email is required", "param": "email", "location": "body" }
  ]
}
```

Invalid credentials example:
```json
{
  "message": "Invalid email or password"
}
```

Curl example
-
```bash
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```
