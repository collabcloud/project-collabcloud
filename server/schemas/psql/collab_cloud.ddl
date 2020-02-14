CREATE TABLE account(
    uid uuid,
    username VARCHAR(15),
    password VARCHAR(15),
    PRIMARY KEY (uuid)
);

CREATE TABLE projects(
    pid SERIAL,
    project_name VARCHAR(20),
    uid uuid REFERENCES account(uid),
    PRIMARY KEY (uid, pid)
);