-- Generado por Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   en:        2022-12-06 22:33:52 CLST
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g



DROP TABLE accidente CASCADE CONSTRAINTS;

DROP TABLE actividad CASCADE CONSTRAINTS;

DROP TABLE asesoria CASCADE CONSTRAINTS;

DROP TABLE capacitacion CASCADE CONSTRAINTS;

DROP TABLE checkbox CASCADE CONSTRAINTS;

DROP TABLE checklist_visita CASCADE CONSTRAINTS;

DROP TABLE comuna CASCADE CONSTRAINTS;

DROP TABLE contrato CASCADE CONSTRAINTS;

DROP TABLE coste_act CASCADE CONSTRAINTS;

DROP TABLE cuenta CASCADE CONSTRAINTS;

DROP TABLE detalle_pago CASCADE CONSTRAINTS;

DROP TABLE empresa CASCADE CONSTRAINTS;

DROP TABLE estado_contrato CASCADE CONSTRAINTS;

DROP TABLE evento_asesoria CASCADE CONSTRAINTS;

DROP TABLE mensaje CASCADE CONSTRAINTS;

DROP TABLE pago CASCADE CONSTRAINTS;

DROP TABLE participante_act CASCADE CONSTRAINTS;

DROP TABLE participante_chat CASCADE CONSTRAINTS;

DROP TABLE plan_mejora CASCADE CONSTRAINTS;

DROP TABLE provincia CASCADE CONSTRAINTS;

DROP TABLE region CASCADE CONSTRAINTS;

DROP TABLE sala_chat CASCADE CONSTRAINTS;

DROP TABLE sesion CASCADE CONSTRAINTS;

DROP TABLE solicitud_asesoria CASCADE CONSTRAINTS;

DROP TABLE tipo_actividad CASCADE CONSTRAINTS;

DROP TABLE tipo_usuario CASCADE CONSTRAINTS;

DROP TABLE usuario CASCADE CONSTRAINTS;

DROP TABLE visita CASCADE CONSTRAINTS;

-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE accidente (
    id_accidente NUMBER(12) NOT NULL,
    rut_usuario  VARCHAR2(20),
    descripcion  VARCHAR2(2000) NOT NULL,
    asunto       VARCHAR2(255) NOT NULL
);

ALTER TABLE accidente ADD CONSTRAINT accidente_pk PRIMARY KEY ( id_accidente );

CREATE TABLE actividad (
    id_actividad     NUMBER(12) NOT NULL,
    fecha_actividad  DATE NOT NULL,
    id_tipoactividad NUMBER(12) NOT NULL,
    estado           CHAR(1) NOT NULL
);

ALTER TABLE actividad ADD CONSTRAINT actividad_pk PRIMARY KEY ( id_actividad );

CREATE TABLE asesoria (
    id_asesoria  NUMBER(12) NOT NULL,
    especial     CHAR(1) NOT NULL,
    id_actividad NUMBER(12) NOT NULL
);

ALTER TABLE asesoria ADD CONSTRAINT asesoria_pk PRIMARY KEY ( id_asesoria );

CREATE TABLE capacitacion (
    id_capacitacion          NUMBER(12) NOT NULL,
    descripcion_capacitacion VARCHAR2(2000) NOT NULL,
    descripcion_material     VARCHAR2(2000) NOT NULL,
    id_actividad             NUMBER(12) NOT NULL
);

ALTER TABLE capacitacion ADD CONSTRAINT capacitacion_pk PRIMARY KEY ( id_capacitacion );

CREATE TABLE checkbox (
    id_checkbox  NUMBER(12) NOT NULL,
    descripcion  VARCHAR2(2000) NOT NULL,
    estado       CHAR(1) NOT NULL,
    id_checklist NUMBER(12) NOT NULL
);

ALTER TABLE checkbox ADD CONSTRAINT checkbox_pk PRIMARY KEY ( id_checkbox,
                                                              id_checklist );

CREATE TABLE checklist_visita (
    id_checklist   NUMBER(12) NOT NULL,
    titulo         VARCHAR2(255) NOT NULL,
    modificaciones NUMBER(12) NOT NULL
);

ALTER TABLE checklist_visita ADD CONSTRAINT checklist_visita_pk PRIMARY KEY ( id_checklist );

CREATE TABLE comuna (
    id_comuna    NUMBER(12) NOT NULL,
    comuna       VARCHAR2(255) NOT NULL,
    id_provincia NUMBER(12) NOT NULL
);

ALTER TABLE comuna ADD CONSTRAINT comuna_pk PRIMARY KEY ( id_comuna );

CREATE TABLE contrato (
    id_contrato        NUMBER(12) NOT NULL,
    fecha_inicio       DATE,
    fecha_termino      DATE,
    rut_usuario        VARCHAR2(20),
    archivo_contrato   CLOB,
    id_estado_contrato NUMBER(12) NOT NULL
);

ALTER TABLE contrato ADD CONSTRAINT contrato_pk PRIMARY KEY ( id_contrato );

CREATE TABLE coste_act (
    id_coste         NUMBER(12) NOT NULL,
    costo_fijo       NUMBER(24) NOT NULL,
    costo_extra      NUMBER(24) NOT NULL,
    id_tipoactividad NUMBER(12) NOT NULL
);

ALTER TABLE coste_act ADD CONSTRAINT coste_act_pk PRIMARY KEY ( id_coste );

CREATE TABLE cuenta (
    id_cuenta NUMBER(12) NOT NULL,
    username  VARCHAR2(200) NOT NULL,
    password  VARCHAR2(200) NOT NULL,
    estado    CHAR(1) NOT NULL,
    id_tipo   NUMBER(2) NOT NULL
);

ALTER TABLE cuenta ADD CONSTRAINT cuenta_pk PRIMARY KEY ( id_cuenta );

CREATE TABLE detalle_pago (
    id_detallepago  NUMBER(12) NOT NULL,
    nombre_servicio VARCHAR2(255) NOT NULL,
    coste_servicio  NUMBER(25) NOT NULL,
    cantidad_extra  NUMBER(12) NOT NULL,
    coste_extra     NUMBER(12) NOT NULL,
    coste_total     NUMBER(12) NOT NULL,
    id_pago         NUMBER(12) NOT NULL
);

ALTER TABLE detalle_pago ADD CONSTRAINT detalle_pago_pk PRIMARY KEY ( id_detallepago );

CREATE TABLE empresa (
    rut_empresa  VARCHAR2(20) NOT NULL,
    razon_social VARCHAR2(255) NOT NULL,
    telefono     NUMBER(20),
    nombre       VARCHAR2(255) NOT NULL,
    rut_usuario  VARCHAR2(20),
    calle        VARCHAR2(255) NOT NULL,
    id_comuna    NUMBER(12) NOT NULL
);

ALTER TABLE empresa ADD CONSTRAINT empresa_pk PRIMARY KEY ( rut_empresa );

CREATE TABLE estado_contrato (
    id_estado_contrato NUMBER(12) NOT NULL,
    descripcion        VARCHAR2(255) NOT NULL
);

ALTER TABLE estado_contrato ADD CONSTRAINT estado_contrato_pk PRIMARY KEY ( id_estado_contrato );

CREATE TABLE evento_asesoria (
    id_evento   NUMBER(12) NOT NULL,
    detalle     VARCHAR2(2000),
    id_asesoria NUMBER(12) NOT NULL
);

ALTER TABLE evento_asesoria ADD CONSTRAINT evento_pk PRIMARY KEY ( id_evento );

CREATE TABLE mensaje (
    id_mensaje  NUMBER(12) NOT NULL,
    mensaje     VARCHAR2(2000) NOT NULL,
    id_sala     NUMBER(12) NOT NULL,
    rut_usuario VARCHAR2(20) NOT NULL
);

ALTER TABLE mensaje ADD CONSTRAINT mensaje_pk PRIMARY KEY ( id_mensaje );

CREATE TABLE pago (
    id_pago     NUMBER(12) NOT NULL,
    fecha_pago  DATE NOT NULL,
    estado      VARCHAR2(100) NOT NULL,
    monto       NUMBER(24) NOT NULL,
    tipo_recibo VARCHAR2(255) NOT NULL,
    id_contrato NUMBER(12) NOT NULL
);

ALTER TABLE pago ADD CONSTRAINT pago_pk PRIMARY KEY ( id_pago );

CREATE TABLE participante_act (
    id_asignacion NUMBER(12) NOT NULL,
    id_actividad  NUMBER(12) NOT NULL,
    rut_usuario   VARCHAR2(20) NOT NULL
);

ALTER TABLE participante_act ADD CONSTRAINT participante_pk PRIMARY KEY ( id_asignacion );

CREATE TABLE participante_chat (
    id_participantechat NUMBER(12) NOT NULL,
    rut_usuario         VARCHAR2(20) NOT NULL,
    id_sala             NUMBER(12) NOT NULL
);

ALTER TABLE participante_chat ADD CONSTRAINT participante_chat_pk PRIMARY KEY ( id_participantechat );

CREATE TABLE plan_mejora (
    id_plan        NUMBER(12) NOT NULL,
    pdf            CLOB NOT NULL,
    estado         CHAR(1) NOT NULL,
    fecha_creacion DATE NOT NULL,
    rut_usuario    VARCHAR2(20) NOT NULL
);

ALTER TABLE plan_mejora ADD CONSTRAINT plan_mejora_pk PRIMARY KEY ( id_plan );

CREATE TABLE provincia (
    id_provincia NUMBER(12) NOT NULL,
    provincia    VARCHAR2(255) NOT NULL,
    id_region    NUMBER(12) NOT NULL
);

ALTER TABLE provincia ADD CONSTRAINT provincia_pk PRIMARY KEY ( id_provincia );

CREATE TABLE region (
    id_region   NUMBER(12) NOT NULL,
    region      VARCHAR2(255) NOT NULL,
    abreviatura VARCHAR2(255) NOT NULL,
    capital     VARCHAR2(255) NOT NULL
);

ALTER TABLE region ADD CONSTRAINT region_pk PRIMARY KEY ( id_region );

CREATE TABLE sala_chat (
    id_sala       NUMBER(12) NOT NULL,
    asunto_sala   VARCHAR2(300) NOT NULL,
    id_accidente  NUMBER(12) NOT NULL,
    estado        CHAR(1) NOT NULL,
    id_accidente2 NUMBER(12) NOT NULL
);

ALTER TABLE sala_chat ADD CONSTRAINT sala_chat_pk PRIMARY KEY ( id_sala );

CREATE TABLE sesion (
    id_sesion  NUMBER(12) NOT NULL,
    id_cuenta  NUMBER(12),
    llave      VARCHAR2(300) NOT NULL,
    expiracion DATE NOT NULL
);

ALTER TABLE sesion ADD CONSTRAINT sesion_pk PRIMARY KEY ( id_sesion );

CREATE TABLE solicitud_asesoria (
    id_solicitud  NUMBER(12) NOT NULL,
    motivo        VARCHAR2(2000) NOT NULL,
    resolucion    CHAR(1),
    fecha_emision DATE NOT NULL,
    rut_usuario   VARCHAR2(20) NOT NULL
);

ALTER TABLE solicitud_asesoria ADD CONSTRAINT solicitud_asesoria_pk PRIMARY KEY ( rut_usuario,
                                                                                  id_solicitud );

CREATE TABLE tipo_actividad (
    id_tipoactividad NUMBER(12) NOT NULL,
    nombre           VARCHAR2(255) NOT NULL
);

ALTER TABLE tipo_actividad ADD CONSTRAINT tipo_actividad_pk PRIMARY KEY ( id_tipoactividad );

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
    imagen      CLOB,
    id_cuenta   NUMBER(12) NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( rut_usuario );

CREATE TABLE visita (
    id_visita    NUMBER(12) NOT NULL,
    id_actividad NUMBER(12) NOT NULL,
    id_checklist NUMBER(12)
);

ALTER TABLE visita ADD CONSTRAINT visita_pk PRIMARY KEY ( id_visita );

ALTER TABLE accidente
    ADD CONSTRAINT accidente_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE actividad
    ADD CONSTRAINT actividad_tipo_actividad_fk FOREIGN KEY ( id_tipoactividad )
        REFERENCES tipo_actividad ( id_tipoactividad );

ALTER TABLE asesoria
    ADD CONSTRAINT asesoria_actividad_fk FOREIGN KEY ( id_actividad )
        REFERENCES actividad ( id_actividad );

ALTER TABLE capacitacion
    ADD CONSTRAINT capacitacion_actividad_fk FOREIGN KEY ( id_actividad )
        REFERENCES actividad ( id_actividad );

ALTER TABLE checkbox
    ADD CONSTRAINT checkbox_checklist_visita_fk FOREIGN KEY ( id_checklist )
        REFERENCES checklist_visita ( id_checklist );

ALTER TABLE comuna
    ADD CONSTRAINT comuna_provincia_fk FOREIGN KEY ( id_provincia )
        REFERENCES provincia ( id_provincia );

ALTER TABLE contrato
    ADD CONSTRAINT contrato_estado_contrato_fk FOREIGN KEY ( id_estado_contrato )
        REFERENCES estado_contrato ( id_estado_contrato );

ALTER TABLE contrato
    ADD CONSTRAINT contrato_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE coste_act
    ADD CONSTRAINT coste_act_tipo_actividad_fk FOREIGN KEY ( id_tipoactividad )
        REFERENCES tipo_actividad ( id_tipoactividad );

ALTER TABLE cuenta
    ADD CONSTRAINT cuenta_tipo_usuario_fk FOREIGN KEY ( id_tipo )
        REFERENCES tipo_usuario ( id_tipo );

ALTER TABLE detalle_pago
    ADD CONSTRAINT detalle_pago_pago_fk FOREIGN KEY ( id_pago )
        REFERENCES pago ( id_pago );

ALTER TABLE empresa
    ADD CONSTRAINT empresa_comuna_fk FOREIGN KEY ( id_comuna )
        REFERENCES comuna ( id_comuna );

ALTER TABLE empresa
    ADD CONSTRAINT empresa_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE evento_asesoria
    ADD CONSTRAINT evento_asesoria_asesoria_fk FOREIGN KEY ( id_asesoria )
        REFERENCES asesoria ( id_asesoria );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_sala_chat_fk FOREIGN KEY ( id_sala )
        REFERENCES sala_chat ( id_sala );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE pago
    ADD CONSTRAINT pago_contrato_fk FOREIGN KEY ( id_contrato )
        REFERENCES contrato ( id_contrato );

ALTER TABLE participante_act
    ADD CONSTRAINT participante_act_actividad_fk FOREIGN KEY ( id_actividad )
        REFERENCES actividad ( id_actividad );

ALTER TABLE participante_act
    ADD CONSTRAINT participante_act_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE participante_chat
    ADD CONSTRAINT participante_chat_sala_chat_fk FOREIGN KEY ( id_sala )
        REFERENCES sala_chat ( id_sala );

ALTER TABLE participante_chat
    ADD CONSTRAINT participante_chat_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE plan_mejora
    ADD CONSTRAINT plan_mejora_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE provincia
    ADD CONSTRAINT provincia_region_fk FOREIGN KEY ( id_region )
        REFERENCES region ( id_region );

ALTER TABLE sala_chat
    ADD CONSTRAINT sala_chat_accidente_fk FOREIGN KEY ( id_accidente )
        REFERENCES accidente ( id_accidente );

ALTER TABLE sesion
    ADD CONSTRAINT sesion_cuenta_fk FOREIGN KEY ( id_cuenta )
        REFERENCES cuenta ( id_cuenta );

ALTER TABLE solicitud_asesoria
    ADD CONSTRAINT solicitud_asesoria_usuario_fk FOREIGN KEY ( rut_usuario )
        REFERENCES usuario ( rut_usuario );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_cuenta_fk FOREIGN KEY ( id_cuenta )
        REFERENCES cuenta ( id_cuenta );

ALTER TABLE visita
    ADD CONSTRAINT visita_actividad_fk FOREIGN KEY ( id_actividad )
        REFERENCES actividad ( id_actividad );

ALTER TABLE visita
    ADD CONSTRAINT visita_checklist_visita_fk FOREIGN KEY ( id_checklist )
        REFERENCES checklist_visita ( id_checklist );

CREATE SEQUENCE contrato_id_contrato_seq START WITH 1 NOCACHE ORDER;





-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            28
-- CREATE INDEX                             0
-- ALTER TABLE                             57
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           1
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
-- CREATE SEQUENCE                          1
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
