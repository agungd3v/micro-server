module.exports = {
    "up": `CREATE TABLE jobs
        (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        )`,
    "down": "DROP TABLE jobs"
}