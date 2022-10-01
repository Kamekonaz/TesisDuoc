truncate table empresa;
truncate table usuario;
truncate table cuenta;
truncate table tipo_usuario;

insert into tipo_usuario values(1, 'ADMINISTRADOR');
insert into tipo_usuario values(2, 'PROFESIONAL');
insert into tipo_usuario values(3, 'CLIENTE');

insert into cuenta values(1, 'robert_mansen', 
'pbkdf2:sha256:260000$yXUkfCr9aGZZJE8W$a02456628256cd096f1834e243fb7eba613283ef70360e92d9c098e8641bd600', 1, 1);
insert into cuenta values(2, 'robert_mansen2', 
'pbkdf2:sha256:260000$yXUkfCr9aGZZJE8W$a02456628256cd096f1834e243fb7eba613283ef70360e92d9c098e8641bd600', 1, 2);
insert into cuenta values(3, 'robert_mansen3', 
'pbkdf2:sha256:260000$yXUkfCr9aGZZJE8W$a02456628256cd096f1834e243fb7eba613283ef70360e92d9c098e8641bd600', 1, 2);


insert into usuario values('11.123.321-1', 'Robert1 Christopher', 'Mansen Guzman', 'robtopher@gmail.com', 991233214, null, 1);
insert into usuario values('11.123.321-2', 'Robert2 Christopher', 'Mansen Guzman', 'robtopher@gmail.com', 991233214, null, 2);
insert into usuario values('11.123.321-3', 'Robert3 Christopher', 'Mansen Guzman', 'robtopher@gmail.com', 991233214, null, 3);


insert into empresa values('71.123.321-1', 'Empresa test 1', 912344321, 'Los tests 1', '11.123.321-1');
insert into empresa values('71.123.321-2', 'Empresa test 2', 912344322, 'Los tests 2', '11.123.321-2');
insert into empresa values('71.123.321-3', 'Empresa test 3', 912344323, 'Los tests 3', '11.123.321-3');


COMMIT WORK;
