-- Package de login ejecutar desde ac?
-------------------------------------------------------------
create or replace package pkg_login AS 
    procedure pcr_update_user(f_accountID varchar, f_image clob, f_username varchar, f_nombres varchar,
    f_apellidos varchar, f_email varchar, f_telefono number, f_estado char);
    procedure pcr_create_sessionkey(f_sessionkey varchar, f_accountID varchar);
    function fn_get_account_by_key(f_sessionkey varchar)
        return number;
    function fn_login_fetch_username(f_username varchar)
        return varchar;
    function fn_get_user_type(f_username varchar)
        return number;
end pkg_login;
-------------------------------------------------------------
-- Hasta ac?
/

-- Package body de login ejecutar desde ac?
-------------------------------------------------------------
create or replace package body pkg_login as
    procedure pcr_update_user(f_accountID varchar, f_image clob, f_username varchar, f_nombres varchar,
    f_apellidos varchar, f_email varchar, f_telefono number, f_estado char)
    is
    begin
        update usuario
        set usuario.imagen = f_image,
        usuario.nombres = f_nombres,
        usuario.apellidos = f_apellidos,
        usuario.telefono = f_telefono
        where usuario.id_cuenta = f_accountID;
        

        update cuenta
        set username = f_username,
        estado = f_estado
        where id_cuenta = f_accountID;
        
        commit work;
        
    end;    

    procedure pcr_create_sessionkey(f_sessionkey varchar, f_accountID varchar) 
        is
        v_sesionID varchar(12);
        v_expiration timestamp;
        begin
            select (count(*)+1) into v_sesionID from sesion;
            if v_sesionID > 1 then
                select (max(id_sesion)+1) into v_sesionID from sesion;
            end if;
            v_expiration := systimestamp  +  numtodsinterval(7, 'day');
            
            insert into sesion
            values(
                v_sesionID,
                f_accountID,
                f_sessionkey,
                v_expiration
            );
            commit work;
        end;
        
    function fn_get_account_by_key(f_sessionkey varchar)
        return number is
        v_key_count number(10);
        v_accountID number(10);
        begin
            select
                count(*)
            into
                v_key_count
            from sesion
            where llave = f_sessionkey;
            
            if v_key_count > 0 then
            -- 0 Es considerada una cuenta invalida
                select id_cuenta into v_accountID from
                sesion where llave = f_sessionkey;
                
            end if;
            
            if v_key_count < 1 then
                v_accountID := 0;
            end if;
            
            return v_accountID;
        end;
        
    function fn_login_fetch_username(f_username varchar)
        return varchar is 
        v_cantidad_cuentas number(10);
        v_tipo_usuario number(5);
        v_password varchar (255);
        begin
            select 
                count(*)
            into 
                v_cantidad_cuentas
            from cuenta
            where username = f_username;
            
            if v_cantidad_cuentas > 1 then
                -- HAY USUARIOS REPETIDOS
                v_password:= null;
            end if;
            
            if v_cantidad_cuentas = 1 then
                select 
                    password, v_tipo_usuario
                into
                    v_password, v_tipo_usuario
                from cuenta
                where username = f_username;
            end if;
            
            if v_cantidad_cuentas < 1 then
                -- NO HAY USUARIO
                v_password:= null;
            end if;
            return v_password;
            --exception
            --when others then 
            -- ERROR ACA es SQLERRM
        end;

    function fn_get_user_type(f_username varchar)
        return number is
        v_usertype number(5);
        begin 
            select 
                id_tipo
            into 
                v_usertype
            from cuenta
            where username = f_username;
            
            return v_usertype;
        end;

end pkg_login;
-------------------------------------------------------------
-- Hasta ac?
/


-- Package de login ejecutar desde ac?
-------------------------------------------------------------
create or replace package pkg_register as
    function fn_get_account_id (f_username varchar)
        return number;
    function fn_user_rut_available (f_user_rut varchar)
        return boolean;
    function fn_business_rut_available (f_business_rut varchar)
        return boolean;    
    procedure pcr_create_user(
        f_imagen clob,
        f_id_tipo number,
        f_estado number,
        f_rut varchar,
        f_username varchar, 
        f_password varchar, 
        f_nombres varchar,
        f_apellidos varchar,
        f_email varchar,
        f_telefono number
    );
    procedure pcr_create_business(f_rut varchar, f_razon_social varchar, f_telefono number,  f_nombre varchar, f_rut_usuario varchar);
    procedure pcr_delete_user(f_id_cuenta varchar);
end pkg_register;
-------------------------------------------------------------
-- Hasta ac?

/
-- Package de login ejecutar desde ac?
-------------------------------------------------------------
create or replace package body pkg_register as
    

    function fn_get_account_id (f_username varchar)
    return number as
        v_account_id number(10);
        v_accounts_count number(10);
    begin
        select count(*) into v_accounts_count from cuenta where username = f_username;
        
        if v_accounts_count = 1 then
            select id_cuenta into v_account_id
            from cuenta where username = f_username;
        else
            v_account_id := null;
        end if;
        return v_account_id;
    end;

    function fn_user_rut_available (f_user_rut varchar)
    return boolean as
        v_rut_count number(5);
        v_is_available boolean;
    begin
        select count(rut_usuario) into v_rut_count
        from usuario 
        where rut_usuario = f_user_rut;  
        
        if v_rut_count >= 1 then
            v_is_available := false;
        else
            v_is_available := true;
        end if;
        return v_is_available;
    end;
    
    function fn_business_rut_available (f_business_rut varchar)
    return boolean as
        v_rut_count number(5);
        v_is_available boolean;
    begin
        select count(rut_empresa) into v_rut_count
        from empresa
        where rut_empresa = f_business_rut;
        
        if v_rut_count >= 1 then
            v_is_available := false;
        else
            v_is_available := true;
        end if;
        return v_is_available;
    end;
    
    procedure pcr_delete_user(f_id_cuenta varchar)
    is
    v_rut_usuario varchar(50);
    begin
        select rut_usuario into v_rut_usuario from usuario where id_cuenta = f_id_cuenta;
        delete from empresa
        where rut_usuario = v_rut_usuario;
        
        delete from usuario
        where id_cuenta = f_id_cuenta;
        
        delete from cuenta
        where id_cuenta = f_id_cuenta;
        
        commit work;
    end;
    
    procedure pcr_create_user(
        f_imagen clob,
        f_id_tipo number,
        f_estado number,
        f_rut varchar,
        f_username varchar, 
        f_password varchar, 
        f_nombres varchar,
        f_apellidos varchar,
        f_email varchar,
        f_telefono number
    ) 
    is
        v_id_cuenta number(10);
        v_usernames_count number(10);
        v_rut_count number(10);
    begin
    
        select max(to_number(id_cuenta))+1 into v_id_cuenta from cuenta;
        select count(*) into v_usernames_count from cuenta where username = f_username;
        select count(*) into v_rut_count from usuario where rut_usuario = f_rut;
        
        if v_usernames_count = 0 then
            insert into cuenta values(
                v_id_cuenta,
                f_username,
                f_password,
                f_estado,
                f_id_tipo
            );
        end if;
        
        if v_rut_count = 0 then
            insert into usuario values(
                f_rut,
                f_nombres,
                f_apellidos,
                f_email,
                f_telefono,
                f_imagen,
                v_id_cuenta
            );
        end if;
        
        commit work;
    end;
    
    
    procedure pcr_create_business(f_rut varchar, f_razon_social varchar, f_telefono number,  f_nombre varchar, f_rut_usuario varchar)
    is
        v_rut_count number(10);
    begin
        select count(*) into v_rut_count from empresa where rut_empresa = f_rut;
        
        if v_rut_count = 0 then
            insert into empresa values(
                f_rut,
                f_razon_social,
                f_telefono,
                f_nombre,
                f_rut_usuario
            );
        end if;
        commit work;
    
    end;
    
end pkg_register;
-------------------------------------------------------------
-- Hasta ac?

/
create or replace package pkg_list as
    procedure pcr_list_by_usertype(f_usertype number, p_recordset OUT SYS_REFCURSOR);
    procedure pcr_list_activities(p_recordset OUT SYS_REFCURSOR);
    procedure pcr_list_participants(p_recordset OUT SYS_REFCURSOR);
end pkg_list;

/
create or replace package body pkg_list as
    
    procedure pcr_list_by_usertype(f_usertype number, p_recordset OUT SYS_REFCURSOR)
    is
    begin
        open p_recordset for
        select * from usuario
        join cuenta on
        usuario.id_cuenta = cuenta.id_cuenta
        join tipo_usuario on
        tipo_usuario.id_tipo = cuenta.id_tipo
        where cuenta.id_tipo = f_usertype;

    end;
    
    procedure pcr_list_activities(p_recordset OUT SYS_REFCURSOR)
    is
    begin
        open p_recordset for
        select * from actividad
        join tipo_actividad on
        actividad.ID_TIPOACTIVIDAD = tipo_actividad.ID_TIPOACTIVIDAD;

    end;
    
    procedure pcr_list_participants(p_recordset OUT SYS_REFCURSOR)
    is
    begin
        open p_recordset for
        select * from participante
        join usuario on
        participante.RUT_USUARIO = usuario.RUT_USUARIO
        join cuenta on
        usuario.id_cuenta = cuenta.id_cuenta
        join tipo_usuario on
        tipo_usuario.id_tipo = cuenta.id_tipo;

    end;
    
end pkg_list;

/


create or replace package pkg_client as
    procedure pcr_report_accident(f_rut_usuario varchar, f_descripcion varchar, f_asunto varchar);
end pkg_client;
/

create or replace package body pkg_client as
    procedure pcr_report_accident(f_rut_usuario varchar, f_descripcion varchar, f_asunto varchar)
    is
        v_id_accidente number(12);
        v_accidentes_count number(12);
        v_max_accidents number(12);
    begin
        select count(*), max(to_number(id_accidente)) into v_accidentes_count, v_max_accidents from accidente;
        if v_accidentes_count > 0 then v_id_accidente := v_max_accidents+1;
        else v_id_accidente := 1;
        end if;
        
        insert into accidente values(
            v_id_accidente,
            f_rut_usuario,
            f_descripcion,
            f_asunto
        );
        
        commit work;
    end;
end pkg_client;
/

create or replace package pkg_util as
    procedure sp_add_participante(id_actividad number, rut_usuario varchar2, f_rut_profesional varchar2);
end pkg_util;

/

create or replace package body pkg_util as
    procedure sp_add_participante(id_actividad number, rut_usuario varchar2, f_rut_profesional varchar2)
    
    is
        v_maintable_id number(12);
        v_maintablerow_count number(12);
        v_maintablemax_id number(12);

    begin
        select count(*), max(to_number(id_asignacion)) into v_maintablerow_count, v_maintablemax_id from participante;
            if v_maintablerow_count > 0 then v_maintable_id := v_maintablemax_id+1;
            else v_maintable_id := 1;
            end if;
        
        insert into participante values(v_maintable_id, id_actividad, rut_usuario);
        insert into participante values(v_maintable_id+1, id_actividad, f_rut_profesional);
        commit work;
    end;
end pkg_util;

/

create or replace package pkg_function_profesional AS 

PROCEDURE SP_CREAR_CAPACITACION (
F_DESCRIPCION_CAPACITACION VARCHAR2,
F_DESCRIPCION_MATERIAL VARCHAR2, F_FECHA_CAPACITACION varchar2, f_rut_usuario varchar2, f_rut_profesional varchar2);

procedure SP_CREAR_ASESORIA (
        f_especial char, f_fecha varchar2, f_rut_usuario varchar2, f_rut_profesional varchar2);
        
procedure SP_CREAR_VISITA (f_fecha varchar2, f_rut_usuario varchar2, f_rut_profesional varchar2);

end pkg_function_profesional;
/
-- PROCEDIMIENTO CREAR CAPACITACION

create or replace package body pkg_function_profesional AS 
    PROCEDURE SP_CREAR_CAPACITACION (
        F_DESCRIPCION_CAPACITACION VARCHAR2,
        F_DESCRIPCION_MATERIAL VARCHAR2, F_FECHA_CAPACITACION varchar2, f_rut_usuario varchar2, f_rut_profesional varchar2)
        IS
            v_fecha_datetime timestamp;
            v_id_actividad number(12);
            v_actividades_count number(12);
            v_max_actividades number(12);
            
            v_maintable_id number(12);
            v_maintablerow_count number(12);
            v_maintablemax_id number(12);
        BEGIN
            select to_date(F_FECHA_CAPACITACION,'ddmmyyyy HH24:MI:SS') into v_fecha_datetime from dual;
            
            select count(*), max(to_number(id_actividad)) into v_actividades_count, v_max_actividades from actividad;
                if v_actividades_count > 0 then v_id_actividad := v_max_actividades+1;
                else v_id_actividad := 1;
                end if;
                
            insert into actividad values(v_id_actividad, v_fecha_datetime, 2, 0);
            
            commit work;
            
            select count(*), max(to_number(id_capacitacion)) into v_maintablerow_count, v_maintablemax_id from capacitacion;
                if v_maintablerow_count > 0 then v_maintable_id := v_maintablemax_id+1;
                else v_maintable_id := 1;
                end if;
            
            
            pkg_util.sp_add_participante(v_id_actividad, f_rut_usuario, f_rut_profesional);
            INSERT INTO CAPACITACION VALUES (v_maintable_id, F_DESCRIPCION_CAPACITACION,F_DESCRIPCION_MATERIAL, v_id_actividad);
        EXCEPTION
            WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE(SQLERRM);
        END ;
        
    PROCEDURE SP_CREAR_ASESORIA(
        f_especial char, f_fecha varchar2, f_rut_usuario varchar2, f_rut_profesional varchar2)
        IS
            v_fecha_datetime timestamp;
            v_id_actividad number(12);
            v_actividades_count number(12);
            v_max_actividades number(12);
            
            v_maintable_id number(12);
            v_maintablerow_count number(12);
            v_maintablemax_id number(12);
        BEGIN
            select to_date(f_fecha,'ddmmyyyy HH24:MI:SS') into v_fecha_datetime from dual;
            
            select count(*), max(to_number(id_actividad)) into v_actividades_count, v_max_actividades from actividad;
                if v_actividades_count > 0 then v_id_actividad := v_max_actividades+1;
                else v_id_actividad := 1;
                end if;
                
            insert into actividad values(v_id_actividad, v_fecha_datetime, 3, 0);
            
            commit work;
            
            select count(*), max(to_number(id_asesoria)) into v_maintablerow_count, v_maintablemax_id from asesoria;
                if v_maintablerow_count > 0 then v_maintable_id := v_maintablemax_id+1;
                else v_maintable_id := 1;
                end if;
                
            pkg_util.sp_add_participante(v_id_actividad, f_rut_usuario, f_rut_profesional);
            INSERT INTO asesoria VALUES (v_maintable_id, f_especial, v_id_actividad);
        EXCEPTION
            WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE(SQLERRM);
        END ;
        
        PROCEDURE SP_CREAR_VISITA (f_fecha varchar2, f_rut_usuario varchar2, f_rut_profesional varchar2)
        IS
            v_fecha_datetime timestamp;
            v_id_actividad number(12);
            v_actividades_count number(12);
            v_max_actividades number(12);
            
            v_maintable_id number(12);
            v_maintablerow_count number(12);
            v_maintablemax_id number(12);
        BEGIN
            select to_date(f_fecha,'ddmmyyyy HH24:MI:SS') into v_fecha_datetime from dual;
            
            select count(*), max(to_number(id_actividad)) into v_actividades_count, v_max_actividades from actividad;
                if v_actividades_count > 0 then v_id_actividad := v_max_actividades+1;
                else v_id_actividad := 1;
                end if;
                
            insert into actividad values(v_id_actividad, v_fecha_datetime, 1, 0);
            
            commit work;
            
            select count(*), max(to_number(id_visita)) into v_maintablerow_count, v_maintablemax_id from visita;
                if v_maintablerow_count > 0 then v_maintable_id := v_maintablemax_id+1;
                else v_maintable_id := 1;
                end if;
                
            pkg_util.sp_add_participante(v_id_actividad, f_rut_usuario, f_rut_profesional);
            INSERT INTO visita VALUES (v_maintable_id, v_id_actividad);
        EXCEPTION
            WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE(SQLERRM);
        END ;
        
        
        



end pkg_function_profesional;
/











