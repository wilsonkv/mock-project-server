CREATE TABLE IF NOT EXISTS "locations"(
  "id"      SERIAL PRIMARY KEY NOT NULL,
  "name"    VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "users"(
  "id"                              SERIAL            PRIMARY KEY  NOT NULL,
  "firstName"                       VARCHAR(100)      NOT NULL,
  "lastName"                        VARCHAR(100)      NOT NULL,
  "nickName"                        VARCHAR(100)      NULL,
  "email"                           VARCHAR(200)      NOT NULL,
  "passwordDigest"                  VARCHAR(100)      NULL,
  "locationId"                      INT               NULL, 
  "manager"                         VARCHAR(200)      NULL,
  "role"                            VARCHAR(100)      NULL,
  "imageUrl"                        VARCHAR(100)      NULL,
  "aboutMe"                         VARCHAR(100)      NULL,
  "isAdmin"                         BOOLEAN           NOT NULL DEFAULT FALSE,
  "isActive"                        BOOLEAN           NOT NULL DEFAULT FALSE,
  "createdAt"                       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"                       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,

  constraint "fkUsersLocations"      foreign key ("locationId")
  REFERENCES "locations" ("id")
);
