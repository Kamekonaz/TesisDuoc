DROP USER GURO CASCADE;

-- CREAR USUARIO 
CREATE USER GURO IDENTIFIED BY GURO;
ALTER USER "GURO"
DEFAULT TABLESPACE "USERS"
TEMPORARY TABLESPACE "TEMP"
ACCOUNT UNLOCK ;

-- QUOTAS
ALTER USER "GURO" QUOTA UNLIMITED ON "USERS";

-- SYSTEM PRIVILEGES
GRANT ALTER SESSION,CREATE SESSION TO GURO;

-- TABLE PRIVILEGES
GRANT CREATE TABLE TO GURO;
GRANT SELECT ANY TABLE TO GURO;
GRANT ALTER ANY TABLE TO GURO;
GRANT DROP ANY TABLE TO GURO;

-- SEQUENCE PRIVILEGES
GRANT CREATE SEQUENCE TO GURO;
GRANT SELECT ANY SEQUENCE TO GURO;
GRANT ALTER ANY SEQUENCE TO GURO;
GRANT DROP ANY SEQUENCE TO GURO;

-- TRIGGER PRIVILEGES
GRANT CREATE TRIGGER TO GURO;
GRANT ALTER ANY TRIGGER TO GURO;
GRANT DROP ANY TRIGGER TO GURO;

-- PROCEDURE PRIVILEGES
GRANT CREATE PROCEDURE TO GURO;
GRANT SELECT ANY SEQUENCE TO GURO;
GRANT ALTER ANY PROCEDURE TO GURO;
GRANT DROP ANY PROCEDURE TO GURO;



