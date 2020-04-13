CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(150) NOT NULL, 
    password VARCHAR(150) NOT NULL, 
    profile_pic TEXT
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY, 
    title TEXT NOT NULL, 
    img TEXT, 
    content TEXT NOT NULL, 
    author_id INT REFERENCES users(user_id)
);

-- CREATE TABLE user_profile (
--     profile_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id)
-- );

-- CREATE TABLE profile_items (
--     profile_item_id SERIAL PRIMARY KEY, 
--     profile_id INT REFERENCES user_profile(profile_id),
--     post_id INT REFERENCES posts(post_id)
-- );
