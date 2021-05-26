module.exports = {
    "up": `CREATE TABLE users
        (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE email (email)
        )`,
    "down": "DROP TABLE users"
}