# POST /users/register

Description
-
Registers a new user account and returns an access token plus the created user object.

Endpoint
-
- Method: `POST`
- Path: `/users/register`
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
- In this project the controller creating users returns a JWT `token` and the saved `user` (without the password). Adjust the path (`/signup` vs `/users/register`) if your route mapping differs.
- Use `Content-Type: application/json` header when calling the endpoint.

Curl example
-
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","fullname":"John Doe","email":"john@example.com","password":"secret123"}'
```
