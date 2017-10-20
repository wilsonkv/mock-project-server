--Remove constraints
ALTER table IF EXISTS "users" DROP CONSTRAINT  IF EXISTS   "fkUsersLocations" RESTRICT ;

--drop tables
Drop Table IF EXISTS "users";
Drop Table IF EXISTS "locations";
