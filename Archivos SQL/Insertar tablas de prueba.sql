truncate table empresa;
truncate table contrato;
truncate table usuario;
truncate table cuenta;
truncate table tipo_usuario;
truncate table tipo_actividad;

-- Tipos de usuario: No tocar
insert into tipo_usuario values(1, 'ADMINISTRADOR');
insert into tipo_usuario values(2, 'PROFESIONAL');
insert into tipo_usuario values(3, 'CLIENTE');

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


-- CREAR EMPRESAS
insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario)
values('71.352.444-2', 'Empresa test 4', 912344323, 'Cordillera', '11.987.158-k');

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario)
values('72.996.584-7', 'Empresa test 5', 912344323, 'Maestra', '19.852.563-4');

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario)
values('65.463.248-7', 'Empresa test 6', 912344323, 'Swan', '10.349.167-4');

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario)
values('57.733.549-2', 'Empresa test 7', 912344323, 'Los del NorteChico', '14.843.164-6');

insert into empresa(rut_empresa, razon_social, telefono, nombre, rut_usuario)
values('39.853.241-5', 'Empresa test 8', 912344323, 'Constructora San Luis', '12.811.735-8');


COMMIT WORK;