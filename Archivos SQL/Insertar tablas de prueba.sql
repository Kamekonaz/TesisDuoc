truncate table empresa;
truncate table contrato;
truncate table usuario;
truncate table cuenta;
truncate table tipo_usuario;
truncate table tipo_actividad;
truncate table estado_contrato;

-- Tipos de usuario: No tocar
insert into tipo_usuario values(1, 'ADMINISTRADOR');
insert into tipo_usuario values(2, 'PROFESIONAL');
insert into tipo_usuario values(3, 'CLIENTE');

insert into estado_contrato values(1, 'CREADO');
insert into estado_contrato values(2, 'PENDIENTE');
insert into estado_contrato values(3, 'PAGADO');

insert into tipo_actividad values(1, 'VISITA');
insert into tipo_actividad values(2, 'CAPACITACION');
insert into tipo_actividad values(3, 'ASESORIA');

insert into coste_act values(1, 10000, 2000, 1);
insert into coste_act values(2, 0, 2500, 2);
insert into coste_act values(3, 12000, 1800, 3);

-- CREAR CUENTAS
-------ADMINISTRADORES--------------------------------------------------------------------------------------------------------------------------
insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(4, 'camila_pena', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 1, 1);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(5, 'maximiliano_flores', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 1);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(6, 'manuel_bravo', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 1, 1);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(7, 'michael_jara', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 1, 1);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(8, 'jean_devaud', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 1);

-------PROFESIONALES----------------------------------------------------------------------------------------------------------------------------
insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(9, 'jo_perez', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 2);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(10, 'ma_torres', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 1, 2);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(11, 'fe_correa', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 2);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(12, 'lu_flores', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 2);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(13, 'ju_guerra', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 2);

-------CLIENTES---------------------------------------------------------------------------------------------------------------------------------
insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(14, 'ama_lorenz', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 1, 3);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(15, 'fla_josefo', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 1, 3);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(16, 'ari_dela', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 3);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(17, 'dal_revis', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 1, 3);

insert into cuenta(id_cuenta, username, password, estado, id_tipo)
values(18, 'liz_pizarra', '$2b$10$k2Rqi7YuNC323rraouJzIe9ycjSVt16V79hZY3LQ/Xizd6HZDq7qu', 0, 3);



-- CREAR USUARIOS
-------ADMINISTRADORES-------------------------------------------------------------------------------------
insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('20.123.321-1', 'Camila Paz', 'Pena Pereira', 'cami@gmail.com', 991233214, null, 4);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta) 
values('19.123.321-2', 'Maximiliano Antonio', 'Flores Guzman', 'maxi@gmail.com', 991233214, null, 5);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('19.999.321-k', 'Manuel Christopher', 'Bravo penaloza', 'manu@gmail.com', 991233214, null, 6);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('20.753.381-4', 'Michael Luis', 'Jara Torrez', 'mike@gmail.com', 991233214, null, 7);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta) 
values('20.533.117-4', 'Jean Pierre', 'Devaud Devaud', 'jean@gmail.com', 991233214, null, 8);

-------PROFESIONALES-------------------------------------------------------------------------------------
insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('11.738.385-4', 'Jose Luis', 'Perez Correa', 'jopeco@gmail.com', 991233214, null, 9);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('15.554.224-k', 'Maria Andrea', 'Torres Diaz', 'matodi@gmail.com', 991233214, null, 10);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta) 
values('16.274.875-2', 'Federico Rodrigo', 'Correa Gonzalez', 'fecogo@gmail.com', 991233214, null, 11);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('14.344.656-2', 'Luis Alberto', 'Flores Dias', 'luflodi@gmail.com', 991233214, null, 12);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('15.743.952-4', 'Juan Luis', 'Guerra Perez', 'juguepe@gmail.com', 991233214, null, 13);

-------CLIENTES---------------------------------------------------------------------------------------
insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta) 
values('11.987.158-k', 'Amanda Ana', 'Lorenz Gonzalez', 'amalogo@gmail.com', 991233214, null, 14);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('19.852.563-4', 'Flavio Josefino', 'Gonzalez Torres', 'flagote@gmail.com', 991233214, null, 15);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('10.349.167-4', 'Ariana Paz', 'Dela Diaz', 'aridedi@gmail.com', 991233214, null, 16);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta) 
values('14.843.164-6', 'Dalas Antonio', 'Revis Perez', 'darepe@gmail.com', 991233214, null, 17);

insert into usuario(rut_usuario, nombres, apellidos, email, telefono, imagen, id_cuenta)
values('12.811.735-8', 'Lizeth Andrea', 'Pizarra Garcia', 'lipiga@gmail.com', 991233214, null, 18);





INSERT INTO region VALUES (1,'Arica y Parinacota','AP','Arica');
INSERT INTO region VALUES (2,'Tarapac??','TA','Iquique');
INSERT INTO region VALUES (3,'Antofagasta','AN','Antofagasta');
INSERT INTO region VALUES (4,'Atacama','AT','Copiap??');
INSERT INTO region VALUES (5,'Coquimbo','CO','La Serena');
INSERT INTO region VALUES (6,'Valparaiso','VA','valpara??so');
INSERT INTO region VALUES (7,'Metropolitana de Santiago','RM','Santiago');
INSERT INTO region VALUES (8,'Libertador General Bernardo OHiggins','OH','Rancagua');
INSERT INTO region VALUES (9,'Maule','MA','Talca');
INSERT INTO region VALUES (10,'??uble','NB','Chill??n');
INSERT INTO region VALUES (11,'Biob??o','BI','Concepci??n');
INSERT INTO region VALUES (12,'La Araucan??a','IAR','Temuco');
INSERT INTO region VALUES (13,'Los R??os','LR','Valdivia');
INSERT INTO region VALUES (14,'Los Lagos','LL','Puerto Montt');
INSERT INTO region VALUES (15,'Ays??n del General Carlos Ib????ez del Campo','AI','Coyhaique');
INSERT INTO region VALUES (16,'Magallanes y de la Ant??rtica Chilena','MG','Punta Arenas');



INSERT INTO provincia values (1,'Arica',1);
INSERT INTO provincia values (2,'Parinacota',1);
INSERT INTO provincia values (3,'Iquique',2);
INSERT INTO provincia values (4,'El Tamarugal',2);
INSERT INTO provincia values (5,'Tocopilla',3);
INSERT INTO provincia values (6,'El Loa',3);
INSERT INTO provincia values (7,'Antofagasta',3);
INSERT INTO provincia values (8,'Cha??aral',4);
INSERT INTO provincia values (9,'Copiap??',4);
INSERT INTO provincia values (10,'Huasco',4);
INSERT INTO provincia values (11,'Elqui',5);
INSERT INTO provincia values (12,'Limar??',5);
INSERT INTO provincia values (13,'Choapa',5);
INSERT INTO provincia values (14,'Petorca',6);
INSERT INTO provincia values (15,'Los Andes',6);
INSERT INTO provincia values (16,'San Felipe de Aconcagua',6);
INSERT INTO provincia values (17,'Quillota',6);
INSERT INTO provincia values (18,'Valparaiso',6);
INSERT INTO provincia values (19,'San Antonio',6);
INSERT INTO provincia values (20,'Isla de Pascua',6);
INSERT INTO provincia values (21,'Marga Marga',6);
INSERT INTO provincia values (22,'Chacabuco',7);
INSERT INTO provincia values (23,'Santiago',7);
INSERT INTO provincia values (24,'Cordillera',7);
INSERT INTO provincia values (25,'Maipo',7);
INSERT INTO provincia values (26,'Melipilla',7);
INSERT INTO provincia values (27,'Talagante',7);
INSERT INTO provincia values (28,'Cachapoal',8);
INSERT INTO provincia values (29,'Colchagua',8);
INSERT INTO provincia values (30,'Cardenal Caro',8);
INSERT INTO provincia values (31,'Curic??',9);
INSERT INTO provincia values (32,'Talca',9);
INSERT INTO provincia values (33,'Linares',9);
INSERT INTO provincia values (34,'Cauquenes',9);
INSERT INTO provincia values (35,'Diguill??n',10);
INSERT INTO provincia values (36,'Itata',10);
INSERT INTO provincia values (37,'Punilla',10);
INSERT INTO provincia values (38,'Bio B??o',11);
INSERT INTO provincia values (39,'Concepci??n',11);
INSERT INTO provincia values (40,'Arauco',11);
INSERT INTO provincia values (41,'Malleco',12);
INSERT INTO provincia values (42,'Caut??n',12);
INSERT INTO provincia values (43,'Valdivia',13);
INSERT INTO provincia values (44,'Ranco',13);
INSERT INTO provincia values (45,'Osorno',14);
INSERT INTO provincia values (46,'Llanquihue',14);
INSERT INTO provincia values (47,'Chilo??',14);
INSERT INTO provincia values (48,'Palena',14);
INSERT INTO provincia values (49,'Coyhaique',15);
INSERT INTO provincia values (50,'Ays??n',15);
INSERT INTO provincia values (51,'General Carrera',15);
INSERT INTO provincia values (52,'Capit??n Prat',15);
INSERT INTO provincia values (53,'??ltima Esperanza',16);
INSERT INTO provincia values (54,'Magallanes',16);
INSERT INTO provincia values (55,'Tierra del Fuego',16);
INSERT INTO provincia values (56,'Ant??rtica Chilena',16);



INSERT INTO comuna VALUES (1,'Arica',1);
INSERT INTO comuna VALUES (2,'Camarones',1);
INSERT INTO comuna VALUES (3,'General Lagos',2);
INSERT INTO comuna VALUES (4,'Putre',2);
INSERT INTO comuna VALUES (5,'Alto Hospicio',3);
INSERT INTO comuna VALUES (6,'Iquique',3);
INSERT INTO comuna VALUES (7,'Cami??a',4);
INSERT INTO comuna VALUES (8,'Colchane',4);
INSERT INTO comuna VALUES (9,'Huara',4);
INSERT INTO comuna VALUES (10,'Pica',4);
INSERT INTO comuna VALUES (11,'Pozo Almonte',4);
INSERT INTO comuna VALUES (12,'Tocopilla',5);
INSERT INTO comuna VALUES (13,'Mar??a Elena',5);
INSERT INTO comuna VALUES (14,'Calama',6);
INSERT INTO comuna VALUES (15,'Ollague',6);
INSERT INTO comuna VALUES (16,'San Pedro de Atacama',6);
INSERT INTO comuna VALUES (17,'Antofagasta',7);
INSERT INTO comuna VALUES (18,'Mejillones',7);
INSERT INTO comuna VALUES (19,'Sierra Gorda',7);
INSERT INTO comuna VALUES (20,'Taltal',7);
INSERT INTO comuna VALUES (21,'Cha??aral',8);
INSERT INTO comuna VALUES (22,'Diego de Almagro',8);
INSERT INTO comuna VALUES (23,'Copiap??',9);
INSERT INTO comuna VALUES (24,'Caldera',9);
INSERT INTO comuna VALUES (25,'Tierra Amarilla',9);
INSERT INTO comuna VALUES (26,'Vallenar',10);
INSERT INTO comuna VALUES (27,'Alto del Carmen',10);
INSERT INTO comuna VALUES (28,'Freirina',10);
INSERT INTO comuna VALUES (29,'Huasco',10);
INSERT INTO comuna VALUES (30,'La Serena',11);
INSERT INTO comuna VALUES (31,'Coquimbo',11);
INSERT INTO comuna VALUES (32,'Andacollo',11);
INSERT INTO comuna VALUES (33,'La Higuera',11);
INSERT INTO comuna VALUES (34,'Paihuano',11);
INSERT INTO comuna VALUES (35,'Vicu??a',11);
INSERT INTO comuna VALUES (36,'Ovalle',12);
INSERT INTO comuna VALUES (37,'Combarbal??',12);
INSERT INTO comuna VALUES (38,'Monte Patria',12);
INSERT INTO comuna VALUES (39,'Punitaqui',12);
INSERT INTO comuna VALUES (40,'R??o Hurtado',12);
INSERT INTO comuna VALUES (41,'Illapel',13);
INSERT INTO comuna VALUES (42,'Canela',13);
INSERT INTO comuna VALUES (43,'Los Vilos',13);
INSERT INTO comuna VALUES (44,'Salamanca',13);
INSERT INTO comuna VALUES (45,'La Ligua',14);
INSERT INTO comuna VALUES (46,'Cabildo',14);
INSERT INTO comuna VALUES (47,'Zapallar',14);
INSERT INTO comuna VALUES (48,'Papudo',14);
INSERT INTO comuna VALUES (49,'Petorca',14);
INSERT INTO comuna VALUES (50,'Los Andes',15);
INSERT INTO comuna VALUES (51,'San Esteban',15);
INSERT INTO comuna VALUES (52,'Calle Larga',15);
INSERT INTO comuna VALUES (53,'Rinconada',15);
INSERT INTO comuna VALUES (54,'San Felipe',16);
INSERT INTO comuna VALUES (55,'Llaillay',16);
INSERT INTO comuna VALUES (56,'Putaendo',16);
INSERT INTO comuna VALUES (57,'Santa Mar??a',16);
INSERT INTO comuna VALUES (58,'Catemu',16);
INSERT INTO comuna VALUES (59,'Panquehue',16);
INSERT INTO comuna VALUES (60,'Quillota',17);
INSERT INTO comuna VALUES (61,'La Cruz',17);
INSERT INTO comuna VALUES (62,'La Calera',17);
INSERT INTO comuna VALUES (63,'Nogales',17);
INSERT INTO comuna VALUES (64,'Hijuelas',17);
INSERT INTO comuna VALUES (65,'Valpara??so',18);	
INSERT INTO comuna VALUES (66,'Vi??a del Mar',18);
INSERT INTO comuna VALUES (67,'Conc??n',18);
INSERT INTO comuna VALUES (68,'Quintero',18);
INSERT INTO comuna VALUES (69,'Puchuncav??',18);
INSERT INTO comuna VALUES (70,'Casablanca',18);
INSERT INTO comuna VALUES (71,'Juan Fern??ndez',18);
INSERT INTO comuna VALUES (72,'San Antonio',19);
INSERT INTO comuna VALUES (73,'Cartagena',19);
INSERT INTO comuna VALUES (74,'El Tabo',19);
INSERT INTO comuna VALUES (75,'El Quisco',19);
INSERT INTO comuna VALUES (76,'Algarrobo',19);
INSERT INTO comuna VALUES (77,'Santo Domingo',19);
INSERT INTO comuna VALUES (78,'Isla de Pascua',20);
INSERT INTO comuna VALUES (79,'Quilpu??',21);
INSERT INTO comuna VALUES (80,'Limache',21);
INSERT INTO comuna VALUES (81,'Olmu??',21);
INSERT INTO comuna VALUES (82,'Villa Alemana',21);
INSERT INTO comuna VALUES (83,'Colina',22);
INSERT INTO comuna VALUES (84,'Lampa',22);
INSERT INTO comuna VALUES (85,'Tiltil',22);
INSERT INTO comuna VALUES (86,'Santiago',23);
INSERT INTO comuna VALUES (87,'Vitacura',23);
INSERT INTO comuna VALUES (88,'San Ram??n',23);
INSERT INTO comuna VALUES (89,'San Miguel',23);
INSERT INTO comuna VALUES (90,'San Joaqu??n',23);
INSERT INTO comuna VALUES (91,'Renca',23);
INSERT INTO comuna VALUES (92,'Recoleta',23);
INSERT INTO comuna VALUES (93,'Quinta Normal',23);
INSERT INTO comuna VALUES (94,'Quilicura',23);
INSERT INTO comuna VALUES (95,'Pudahuel',23);
INSERT INTO comuna VALUES (96,'Providencia',23);
INSERT INTO comuna VALUES (97,'Pe??alol??n',23);
INSERT INTO comuna VALUES (98,'Pedro Aguirre Cerda',23);
INSERT INTO comuna VALUES (99,'??u??oa',23);
INSERT INTO comuna VALUES (100,'Maip??',23);
INSERT INTO comuna VALUES (101,'Macul',23);
INSERT INTO comuna VALUES (102,'Lo Prado',23);
INSERT INTO comuna VALUES (103,'Lo Espejo',23);
INSERT INTO comuna VALUES (104,'Lo Barnechea',23);
INSERT INTO comuna VALUES (105,'Las Condes',23);
INSERT INTO comuna VALUES (106,'La Reina',23);
INSERT INTO comuna VALUES (107,'La Pintana',23);
INSERT INTO comuna VALUES (108,'La Granja',23);
INSERT INTO comuna VALUES (109,'La Florida',23);
INSERT INTO comuna VALUES (110,'La Cisterna',23);
INSERT INTO comuna VALUES (111,'Independencia',23);
INSERT INTO comuna VALUES (112,'Huechuraba',23);
INSERT INTO comuna VALUES (113,'Estaci??n Central',23);
INSERT INTO comuna VALUES (114,'El Bosque',23);
INSERT INTO comuna VALUES (115,'Conchal??',23);
INSERT INTO comuna VALUES (116,'Cerro Navia',23);
INSERT INTO comuna VALUES (117,'Cerrillos',23);
INSERT INTO comuna VALUES (118,'Puente Alto',24);
INSERT INTO comuna VALUES (119,'San Jos?? de Maipo',24);
INSERT INTO comuna VALUES (120,'Pirque',24);
INSERT INTO comuna VALUES (121,'San Bernardo',25);
INSERT INTO comuna VALUES (122,'Buin',25);
INSERT INTO comuna VALUES (123,'Paine',25);
INSERT INTO comuna VALUES (124,'Calera de Tango',25);
INSERT INTO comuna VALUES (125,'Melipilla',26);
INSERT INTO comuna VALUES (126,'Alhu??',26);
INSERT INTO comuna VALUES (127,'Curacav??',26);
INSERT INTO comuna VALUES (128,'Mar??a Pinto',26);
INSERT INTO comuna VALUES (129,'San Pedro',26);
INSERT INTO comuna VALUES (130,'Isla de Maipo',27);
INSERT INTO comuna VALUES (131,'El Monte',27);
INSERT INTO comuna VALUES (132,'Padre Hurtado',27);
INSERT INTO comuna VALUES (133,'Pe??aflor',27);
INSERT INTO comuna VALUES (134,'Talagante',27);
INSERT INTO comuna VALUES (135,'Codegua',28);
INSERT INTO comuna VALUES (136,'Co??nco',28);
INSERT INTO comuna VALUES (137,'Coltauco',28);
INSERT INTO comuna VALUES (138,'Do??ihue',28);
INSERT INTO comuna VALUES (139,'Graneros',28);
INSERT INTO comuna VALUES (140,'Las Cabras',28);
INSERT INTO comuna VALUES (141,'Machal??',28);
INSERT INTO comuna VALUES (142,'Malloa',28);
INSERT INTO comuna VALUES (143,'Mostazal',28);
INSERT INTO comuna VALUES (144,'Olivar',28);
INSERT INTO comuna VALUES (145,'Peumo',28);
INSERT INTO comuna VALUES (146,'Pichidegua',28);
INSERT INTO comuna VALUES (147,'Quinta de Tilcoco',28);
INSERT INTO comuna VALUES (148,'Rancagua',28);
INSERT INTO comuna VALUES (149,'Rengo',28);
INSERT INTO comuna VALUES (150,'Requ??noa',28);
INSERT INTO comuna VALUES (151,'San Vicente de Tagua Tagua',28);
INSERT INTO comuna VALUES (152,'Ch??pica',29);
INSERT INTO comuna VALUES (153,'Chimbarongo',29);
INSERT INTO comuna VALUES (154,'Lolol',29);
INSERT INTO comuna VALUES (155,'Nancagua',29);
INSERT INTO comuna VALUES (156,'Palmilla',29);
INSERT INTO comuna VALUES (157,'Peralillo',29);
INSERT INTO comuna VALUES (158,'Placilla',29);
INSERT INTO comuna VALUES (159,'Pumanque',29);
INSERT INTO comuna VALUES (160,'San Fernando',29);
INSERT INTO comuna VALUES (161,'Santa Cruz',29);
INSERT INTO comuna VALUES (162,'La Estrella',30);
INSERT INTO comuna VALUES (163,'Litueche',30);
INSERT INTO comuna VALUES (164,'Marchig??e',30);
INSERT INTO comuna VALUES (165,'Navidad',30);
INSERT INTO comuna VALUES (166,'Paredones',30);
INSERT INTO comuna VALUES (167,'Pichilemu',30);
INSERT INTO comuna VALUES (168,'Curic??',31);
INSERT INTO comuna VALUES (169,'Huala????',31);
INSERT INTO comuna VALUES (170,'Licant??n',31);
INSERT INTO comuna VALUES (171,'Molina',31);
INSERT INTO comuna VALUES (172,'Rauco',31);
INSERT INTO comuna VALUES (173,'Romeral',31);
INSERT INTO comuna VALUES (174,'Sagrada Familia',31);
INSERT INTO comuna VALUES (175,'Teno',31);
INSERT INTO comuna VALUES (176,'Vichuqu??n',31);
INSERT INTO comuna VALUES (177,'Talca',32);
INSERT INTO comuna VALUES (178,'San Clemente',32);
INSERT INTO comuna VALUES (179,'Pelarco',32);
INSERT INTO comuna VALUES (180,'Pencahue',32);
INSERT INTO comuna VALUES (181,'Maule',32);
INSERT INTO comuna VALUES (182,'San Rafael',32);
INSERT INTO comuna VALUES (183,'Curepto',33);
INSERT INTO comuna VALUES (184,'Constituci??n',32);
INSERT INTO comuna VALUES (185,'Empedrado',32);
INSERT INTO comuna VALUES (186,'R??o Claro',32);
INSERT INTO comuna VALUES (187,'Linares',33);
INSERT INTO comuna VALUES (188,'San Javier',33);
INSERT INTO comuna VALUES (189,'Parral',33);
INSERT INTO comuna VALUES (190,'Villa Alegre',33);
INSERT INTO comuna VALUES (191,'Longav??',33);
INSERT INTO comuna VALUES (192,'Colb??n',33);
INSERT INTO comuna VALUES (193,'Retiro',33);
INSERT INTO comuna VALUES (194,'Yerbas Buenas',33);
INSERT INTO comuna VALUES (195,'Cauquenes',34);
INSERT INTO comuna VALUES (196,'Chanco',34);
INSERT INTO comuna VALUES (197,'Pelluhue',34);
INSERT INTO comuna VALUES (198,'Bulnes',35);
INSERT INTO comuna VALUES (199,'Chill??n',35);
INSERT INTO comuna VALUES (200,'Chill??n Viejo',35);
INSERT INTO comuna VALUES (201,'El Carmen',35);
INSERT INTO comuna VALUES (202,'Pemuco',35);
INSERT INTO comuna VALUES (203,'Pinto',35);
INSERT INTO comuna VALUES (204,'Quill??n',35);
INSERT INTO comuna VALUES (205,'San Ignacio',35);
INSERT INTO comuna VALUES (206,'Yungay',35);
INSERT INTO comuna VALUES (207,'Cobquecura',36);
INSERT INTO comuna VALUES (208,'Coelemu',36);
INSERT INTO comuna VALUES (209,'Ninhue',36);
INSERT INTO comuna VALUES (210,'Portezuelo',36);
INSERT INTO comuna VALUES (211,'Quirihue',36);
INSERT INTO comuna VALUES (212,'R??nquil',36);
INSERT INTO comuna VALUES (213,'Treguaco',36);
INSERT INTO comuna VALUES (214,'San Carlos',37);
INSERT INTO comuna VALUES (215,'Coihueco',37);
INSERT INTO comuna VALUES (216,'San Nicol??s',37);
INSERT INTO comuna VALUES (217,'??iqu??n',37);
INSERT INTO comuna VALUES (218,'San Fabi??n',37);
INSERT INTO comuna VALUES (219,'Alto Biob??o',38);
INSERT INTO comuna VALUES (220,'Antuco',38);
INSERT INTO comuna VALUES (221,'Cabrero',38);
INSERT INTO comuna VALUES (222,'Laja',38);
INSERT INTO comuna VALUES (223,'Los ??ngeles',38);
INSERT INTO comuna VALUES (224,'Mulch??n',38);
INSERT INTO comuna VALUES (225,'Nacimiento',38);
INSERT INTO comuna VALUES (226,'Negrete',38);
INSERT INTO comuna VALUES (227,'Quilaco',38);
INSERT INTO comuna VALUES (228,'Quilleco',38);
INSERT INTO comuna VALUES (229,'San Rosendo',38);
INSERT INTO comuna VALUES (230,'Santa B??rbara',38);
INSERT INTO comuna VALUES (231,'Tucapel',38);
INSERT INTO comuna VALUES (232,'Yumbel',38);
INSERT INTO comuna VALUES (233,'Concepci??n',39);
INSERT INTO comuna VALUES (234,'Coronel',39);
INSERT INTO comuna VALUES (235,'Chiguayante',39);
INSERT INTO comuna VALUES (236,'Florida',39);
INSERT INTO comuna VALUES (237,'Hualp??n',39);
INSERT INTO comuna VALUES (238,'Hualqui',39);
INSERT INTO comuna VALUES (239,'Lota',39);
INSERT INTO comuna VALUES (240,'Penco',39);
INSERT INTO comuna VALUES (241,'San Pedro de La Paz',39);
INSERT INTO comuna VALUES (242,'Santa Juana',39);
INSERT INTO comuna VALUES (243,'Talcahuano',39);
INSERT INTO comuna VALUES (244,'Tom??',39);
INSERT INTO comuna VALUES (245,'Arauco',40);
INSERT INTO comuna VALUES (246,'Ca??ete',40);
INSERT INTO comuna VALUES (247,'Contulmo',40);
INSERT INTO comuna VALUES (248,'Curanilahue',40);
INSERT INTO comuna VALUES (249,'Lebu',40);
INSERT INTO comuna VALUES (250,'Los ??lamos',40);
INSERT INTO comuna VALUES (251,'Tir??a',40);
INSERT INTO comuna VALUES (252,'Angol',41);
INSERT INTO comuna VALUES (253,'Collipulli',41);
INSERT INTO comuna VALUES (254,'Curacaut??n',41);
INSERT INTO comuna VALUES (255,'Ercilla',41);
INSERT INTO comuna VALUES (256,'Lonquimay',41);
INSERT INTO comuna VALUES (257,'Los Sauces',41);
INSERT INTO comuna VALUES (258,'Lumaco',41);
INSERT INTO comuna VALUES (259,'Pur??n',41);
INSERT INTO comuna VALUES (260,'Renaico',41);
INSERT INTO comuna VALUES (261,'Traigu??n',41);
INSERT INTO comuna VALUES (262,'Victoria',41);
INSERT INTO comuna VALUES (263,'Temuco',42);
INSERT INTO comuna VALUES (264,'Carahue',42);
INSERT INTO comuna VALUES (265,'Cholchol',42);
INSERT INTO comuna VALUES (266,'Cunco',42);
INSERT INTO comuna VALUES (267,'Curarrehue',42);
INSERT INTO comuna VALUES (268,'Freire',42);
INSERT INTO comuna VALUES (269,'Galvarino',42);
INSERT INTO comuna VALUES (270,'Gorbea',42);
INSERT INTO comuna VALUES (271,'Lautaro',42);
INSERT INTO comuna VALUES (272,'Loncoche',42);
INSERT INTO comuna VALUES (273,'Melipeuco',42);
INSERT INTO comuna VALUES (274,'Nueva Imperial',42);
INSERT INTO comuna VALUES (275,'Padre Las Casas',42);
INSERT INTO comuna VALUES (276,'Perquenco',42);
INSERT INTO comuna VALUES (277,'Pitrufqu??n',42);
INSERT INTO comuna VALUES (278,'Puc??n',42);
INSERT INTO comuna VALUES (279,'Saavedra',42);
INSERT INTO comuna VALUES (280,'Teodoro Schmidt',42);
INSERT INTO comuna VALUES (281,'Tolt??n',42);
INSERT INTO comuna VALUES (282,'Vilc??n',42);
INSERT INTO comuna VALUES (283,'Villarrica',42);
INSERT INTO comuna VALUES (284,'Valdivia',43);
INSERT INTO comuna VALUES (285,'Corral',43);
INSERT INTO comuna VALUES (286,'Lanco',43);
INSERT INTO comuna VALUES (287,'Los Lagos',43);
INSERT INTO comuna VALUES (288,'M??fil',43);
INSERT INTO comuna VALUES (289,'Mariquina',43);
INSERT INTO comuna VALUES (290,'Paillaco',43);
INSERT INTO comuna VALUES (291,'Panguipulli',43);
INSERT INTO comuna VALUES (292,'La Uni??n',44);
INSERT INTO comuna VALUES (293,'Futrono',44);
INSERT INTO comuna VALUES (294,'Lago Ranco',44);
INSERT INTO comuna VALUES (295,'R??o Bueno',44);
INSERT INTO comuna VALUES (296,'Osorno',45);
INSERT INTO comuna VALUES (297,'Puerto Octay',45);
INSERT INTO comuna VALUES (298,'Purranque',45);
INSERT INTO comuna VALUES (299,'Puyehue',45);
INSERT INTO comuna VALUES (300,'R??o Negro',45);
INSERT INTO comuna VALUES (301,'San Juan de la Costa',45);
INSERT INTO comuna VALUES (302,'San Pablo',45);
INSERT INTO comuna VALUES (303,'Calbuco',46);
INSERT INTO comuna VALUES (304,'Cocham??',46);
INSERT INTO comuna VALUES (305,'Fresia',46);
INSERT INTO comuna VALUES (306,'Frutillar',46);
INSERT INTO comuna VALUES (307,'Llanquihue',46);
INSERT INTO comuna VALUES (308,'Los Muermos',46);
INSERT INTO comuna VALUES (309,'Maull??n',46);
INSERT INTO comuna VALUES (310,'Puerto Montt',46);
INSERT INTO comuna VALUES (311,'Puerto Varas',46);
INSERT INTO comuna VALUES (312,'Ancud',47);
INSERT INTO comuna VALUES (313,'Castro',47);
INSERT INTO comuna VALUES (314,'Chonchi',47);
INSERT INTO comuna VALUES (315,'Curaco de V??lez',47);
INSERT INTO comuna VALUES (316,'Dalcahue',47);
INSERT INTO comuna VALUES (317,'Puqueld??n',47);
INSERT INTO comuna VALUES (318,'Queil??n',47);
INSERT INTO comuna VALUES (319,'Quell??n',47);
INSERT INTO comuna VALUES (320,'Quemchi',47);
INSERT INTO comuna VALUES (321,'Quinchao',47);
INSERT INTO comuna VALUES (322,'Chait??n',48);
INSERT INTO comuna VALUES (323,'Futaleuf??',48);
INSERT INTO comuna VALUES (324,'Hualaihu??',48);
INSERT INTO comuna VALUES (325,'Palena',48);
INSERT INTO comuna VALUES (326,'Lago Verde',49);
INSERT INTO comuna VALUES (327,'Coihaique',49);
INSERT INTO comuna VALUES (328,'Ays??n',50);
INSERT INTO comuna VALUES (329,'Cisnes',50);
INSERT INTO comuna VALUES (330,'Guaitecas',50);
INSERT INTO comuna VALUES (331,'R??o Ib????ez',51);
INSERT INTO comuna VALUES (332,'Chile Chico',51);
INSERT INTO comuna VALUES (333,'Cochrane',52);
INSERT INTO comuna VALUES (334,'OHiggins',52);
INSERT INTO comuna VALUES (335,'Tortel',52);
INSERT INTO comuna VALUES (336,'Natales',53);
INSERT INTO comuna VALUES (337,'Torres del Paine',53);
INSERT INTO comuna VALUES (338,'Laguna Blanca',54);
INSERT INTO comuna VALUES (339,'Punta Arenas',54);
INSERT INTO comuna VALUES (340,'R??o Verde',54);
INSERT INTO comuna VALUES (341,'San Gregorio',54);
INSERT INTO comuna VALUES (342,'Porvenir',55);
INSERT INTO comuna VALUES (343,'Primavera',55);
INSERT INTO comuna VALUES (344,'Timaukel',55);
INSERT INTO comuna VALUES (345,'Cabo de Hornos',56);
INSERT INTO comuna VALUES (346,'Ant??rtica',56);


insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario, calle, id_comuna)
values('71.352.444-2', 'Empresa test 4', 912344323, 'Cordillera', '11.987.158-k', 'test', 1);

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario, calle, id_comuna)
values('72.996.584-7', 'Empresa test 5', 912344323, 'Maestra', '19.852.563-4', 'test', 2);

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario, calle, id_comuna)
values('65.463.248-7', 'Empresa test 6', 912344323, 'Swan', '10.349.167-4', 'test', 3);

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario, calle, id_comuna)
values('57.733.549-2', 'Empresa test 7', 912344323, 'Los del NorteChico', '14.843.164-6', 'test', 4);

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario, calle, id_comuna)
values('39.853.241-5', 'Empresa test 8', 912344323, 'Constructora San Luis', '12.811.735-8', 'test', 5);


COMMIT WORK;