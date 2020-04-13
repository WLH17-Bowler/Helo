INSERT INTO users (username, password)
VALUES ($1, $2)
returning username, user_id;