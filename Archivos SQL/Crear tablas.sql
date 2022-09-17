-- Generado por Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   en:        2022-09-16 18:29:12 CLST
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g



DROP TABLE accidente CASCADE CONSTRAINTS;

DROP TABLE actividad CASCADE CONSTRAINTS;

DROP TABLE asesoria CASCADE CONSTRAINTS;

DROP TABLE boleta CASCADE CONSTRAINTS;

DROP TABLE capacitacion CASCADE CONSTRAINTS;

DROP TABLE checklist_visita CASCADE CONSTRAINTS;

DROP TABLE con_actpro CASCADE CONSTRAINTS;

DROP TABLE con_proplan CASCADE CONSTRAINTS;

DROP TABLE con_useract CASCADE CONSTRAINTS;

DROP TABLE contrato CASCADE CONSTRAINTS;

DROP TABLE cuenta CASCADE CONSTRAINTS;

DROP TABLE empresa CASCADE CONSTRAINTS;

DROP TABLE evento CASCADE CONSTRAINTS;

DROP TABLE plan_mejora CASCADE CONSTRAINTS;

DROP TABLE profesional CASCADE CONSTRAINTS;

DROP TABLE sesion CASCADE CONSTRAINTS;

DROP TABLE tipo_usuario CASCADE CONSTRAINTS;

DROP TABLE usuario CASCADE CONSTRAINTS;

DROP TABLE visita CASCADE CONSTRAINTS;

-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE accidente (
    id_accidente NUMBER(12) NOT NULL,
    rut_usuario  VARCHAR2(20),
    descripcion  VARCHAR2(2000) NOT NULL,
    tipo         VARCHAR2(200) NOT NULL
);

ALTER TABLE accidente ADD CONSTRAINT accidente_pk PRIMARY KEY ( id_accidente );

CREATE TABLE actividad (
    id_actividad    NUMBER(12) NOT NULL,
    fecha_inicio    DATE NOT NULL,
    fecha_limite    DATE NOT NULL,
    costo_extra     NUMBER(16) NOT NULL,
    id_capacitacion NUMBER(12) NOT NULL,
    id_visita       NUMBER(12) NOT NULL,
    id_asesoria     NUMBER(12) NOT NULL
);

ALTER TABLE actividad ADD CONSTRAINT actividad_pk PRIMARY KEY ( id_actividad );

CREATE TABLE asesoria (
    id_asesoria    NUMBER(12) NOT NULL,
    id_evento      NUMBER(12) NOT NULL,
    fecha_asesoria DATE,
    especial       CHAR(1) NOT NULL,
    estado         CHAR(1) NOT NULL
);

ALTER TABLE asesoria ADD CONSTRAINT asesoria_pk PRIMARY KEY ( id_asesoria );

CREATE TABLE boleta (
    id_boleta   NUMBER(12) NOT NULL,
    estado      VARCHAR2(100) NOT NULL,
    fecha_pago  DATE NOT NULL,
    id_contrato NUMBER(12) NOT NULL
);

ALTER TABLE boleta ADD CONSTRAINT boleta_pk PRIMARY KEY ( id_boleta );

CREATE TABLE capacitacion (
    id_capacitacion          NUMBER(12) NOT NULL,
    descripcion_capacitacion VARCHAR2(2000) NOT NULL,
    descripcion_material     VARCHAR2(2000) NOT NULL,
    fecha_capacitacion       DATE,
    estado                   CHAR(1) NOT NULL
);

ALTER TABLE capacitacion ADD CONSTRAINT capacitacion_pk PRIMARY KEY ( id_capacitacion );

CREATE TABLE checklist_visita (
    id_checklist NUMBER(12) NOT NULL,
    descripcion  VARCHAR2(2000) NOT NULL,
    estado       CHAR(1) NOT NULL
);

ALTER TABLE checklist_visita ADD CONSTRAINT checklist_visita_pk PRIMARY KEY ( id_checklist );

CREATE TABLE con_actpro (
    id_actividad    NUMBER(12) NOT NULL,
    rut_profesional VARCHAR2(20) NOT NULL
);

ALTER TABLE con_actpro ADD CONSTRAINT con_actpro_pk PRIMARY KEY ( id_actividad,
                                                                  rut_profesional );

CREATE TABLE con_proplan (
    rut_profesional VARCHAR2(20) NOT NULL,
    id_plan         NUMBER(12) NOT NULL
);

ALTER TABLE con_proplan ADD CONSTRAINT con_proplan_pk PRIMARY KEY ( rut_profesional,
                                                                    id_plan );

CREATE TABLE con_useract (
    rut_usuario  VARCHAR2(20) NOT NULL,
    id_actividad NUMBER(12) NOT NULL
);

ALTER TABLE con_useract ADD CONSTRAINT con_useract_pk PRIMARY KEY ( rut_usuario,
                                                                    id_actividad );

CREATE TABLE contrato (
    id_contrato   NUMBER(12) NOT NULL,
    fecha_inicio  DATE NOT NULL,
    fecha_termino DATE NOT NULL,
    rut_usuario   VARCHAR2(20),
    estado        VARCHAR2(255) NOT NULL,
    detalle       VARCHAR2(2000) NOT NULL
);

ALTER TABLE contrato ADD CONSTRAINT contrato_pk PRIMARY KEY ( id_contrato );

CREATE TABLE cuenta (
    id_cuenta VARCHAR2(12) NOT NULL,
    username  VARCHAR2(200) NOT NULL,
    password  VARCHAR2(200) NOT NULL,
    id_tipo   NUMBER(2) NOT NULL
);

ALTER TABLE cuenta ADD CONSTRAINT cuenta_pk PRIMARY KEY ( id_cuenta );

CREATE TABLE empresa (
    rut_empresa  VARCHAR2(20) NOT NULL,
    ubicacion    VARCHAR2(255) NOT NULL,
    razon_social VARCHAR2(255) NOT NULL,
    telefono     NUMBER(20),
    nombre       VARCHAR2(255) NOT NULL,
    rut_usuario  VARCHAR2(20) NOT NULL
);

ALTER TABLE empresa ADD CONSTRAINT empresa_pk PRIMARY KEY ( rut_empresa );

CREATE TABLE evento (
    id_evento NUMBER(12) NOT NULL,
    detalle   VARCHAR2(2000)
);

ALTER TABLE evento ADD CONSTRAINT evento_pk PRIMARY KEY ( id_evento );

CREATE TABLE plan_mejora (
    id_plan     NUMBER(12) NOT NULL,
    rut_cliente VARCHAR2(20) NOT NULL,
    detalle     VARCHAR2(2000) NOT NULL
);

ALTER TABLE plan_mejora ADD CONSTRAINT plan_mejora_pk PRIMARY KEY ( id_plan );

CREATE TABLE profesional (
    rut_profesional VARCHAR2(20) NOT NULL,
    sector          VARCHAR2(100) NOT NULL
);

ALTER TABLE profesional ADD CONSTRAINT profesional_pk PRIMARY KEY ( rut_profesional );

CREATE TABLE sesion (
    id_sesion  NUMBER(12) NOT NULL,
    id_cuenta  VARCHAR2(12),
    llave      VARCHAR2(300) NOT NULL,
    expiracion DATE NOT NULL
);

ALTER TABLE sesion ADD CONSTRAINT sesion_pk PRIMARY KEY ( id_sesion );

CREATE TABLE tipo_usuario (
    id_tipo NUMBER(2) NOT NULL,
    nombre  VARCHAR2(100) NOT NULL
);

ALTER TABLE tipo_usuario ADD CONSTRAINT tipo_usuario_pk PRIMARY KEY ( id_tipo );

CREATE TABLE usuario (
    rut_usuario VARCHAR2(20) NOT NULL,
    nombres     VARCHAR2(150) NOT NULL,
    apellidos   VARCHAR2(150) NOT NULL,
    email       VARCHAR2(200) NOT NULL,
    telefono    NUMBER(12) NOT NULL,
    id_cuenta   VARCHAR2(12) NOT NULL,
    imagen      BLOB
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( rut_usuario );

CREATE TABLE visita (
    id_visita    NUMBER(12) NOT NULL,
    user_role    VARCHAR2(200) NOT NULL,
    fecha_visita DATE,
    estado       CHAR(1) NOT NULL,
    id_checklist NUMBER(12) NOT NULL
);

ALTER TABLE visita ADD CONSTRAINT visita_pk PRIMARY KEY ( id_visita );

ALTER TABLE accidente
    ADD CONSTRAINT accidente_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE actividad
    ADD CONSTRAINT actividad_asesoria_fk FOREIGN KEY ( id_asesoria )
        REFERENCES asesoria ( id_asesoria );

ALTER TABLE actividad
    ADD CONSTRAINT actividad_capacitacion_fk FOREIGN KEY ( id_capacitacion )
        REFERENCES capacitacion ( id_capacitacion );

ALTER TABLE actividad
    ADD CONSTRAINT actividad_visita_fk FOREIGN KEY ( id_visita )
        REFERENCES visita ( id_visita );

ALTER TABLE asesoria
    ADD CONSTRAINT asesoria_evento_fk FOREIGN KEY ( id_evento )
        REFERENCES evento ( id_evento );

ALTER TABLE boleta
    ADD CONSTRAINT boleta_contrato_fk FOREIGN KEY ( id_contrato )
        REFERENCES contrato ( id_contrato );

ALTER TABLE con_actpro
    ADD CONSTRAINT con_actpro_actividad_fk FOREIGN KEY ( id_actividad )
        REFERENCES actividad ( id_actividad );

ALTER TABLE con_actpro
    ADD CONSTRAINT con_actpro_profesional_fk FOREIGN KEY ( rut_profesional )
        REFERENCES profesional ( rut_profesional );

ALTER TABLE con_proplan
    ADD CONSTRAINT con_proplan_plan_mejora_fk FOREIGN KEY ( id_plan )
        REFERENCES plan_mejora ( id_plan );

ALTER TABLE con_proplan
    ADD CONSTRAINT con_proplan_profesional_fk FOREIGN KEY ( rut_profesional )
        REFERENCES profesional ( rut_profesional );

ALTER TABLE con_useract
    ADD CONSTRAINT con_useract_actividad_fk FOREIGN KEY ( id_actividad )
        REFERENCES actividad ( id_actividad );

ALTER TABLE con_useract
    ADD CONSTRAINT con_useract_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE contrato
    ADD CONSTRAINT contrato_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE cuenta
    ADD CONSTRAINT cuenta_tipo_usuario_fk FOREIGN KEY ( id_tipo )
        REFERENCES tipo_usuario ( id_tipo );

ALTER TABLE empresa
    ADD CONSTRAINT empresa_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE sesion
    ADD CONSTRAINT sesion_cuenta_fk FOREIGN KEY ( id_cuenta )
        REFERENCES cuenta ( id_cuenta );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_cuenta_fk FOREIGN KEY ( id_cuenta )
        REFERENCES cuenta ( id_cuenta );

ALTER TABLE visita
    ADD CONSTRAINT visita_checklist_visita_fk FOREIGN KEY ( id_checklist )
        REFERENCES checklist_visita ( id_checklist );



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            19
-- CREATE INDEX                             0
-- ALTER TABLE                             37
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
