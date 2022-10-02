-- Package de login ejecutar desde ac�
-------------------------------------------------------------
create or replace package pkg_login AS 
    function fn_login_fetch_username(f_username varchar)
        return varchar;
    function fn_get_user_type(f_username varchar)
        return number;
end pkg_login;
-------------------------------------------------------------
-- Hasta ac�
/

-- Package body de login ejecutar desde ac�
-------------------------------------------------------------
create or replace package body pkg_login as
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
-- Hasta ac�
/


-- Package de login ejecutar desde ac�
-------------------------------------------------------------
create or replace package pkg_register as
    function fn_get_account_id (f_username varchar)
        return number;
    function fn_user_rut_available (f_user_rut varchar)
        return boolean;
    function fn_business_rut_available (f_business_rut varchar)
        return boolean;    
    procedure pcr_create_account(f_username varchar, f_password varchar, f_id_tipo number);
    procedure pcr_create_user(f_rut varchar, f_nombres varchar, f_apellidos varchar, f_email varchar, f_telefono number, f_imagen blob, id_cuenta number);
    procedure pcr_create_business(f_rut varchar, f_razon_social varchar, f_telefono number,  f_nombre varchar, f_rut_usuario varchar);
end pkg_register;
-------------------------------------------------------------
-- Hasta ac�

/

-- Package de login ejecutar desde ac�
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
    
    
    procedure pcr_create_account(f_username varchar, f_password varchar, f_id_tipo number) 
    is
        v_id_cuenta number(10);
        v_usernames_count number(10);
    begin
        select max(id_cuenta)+1 into v_id_cuenta from cuenta;
        select count(*) into v_usernames_count from cuenta where username = f_username;
        
        
        if v_usernames_count = 0 then
            insert into cuenta values(
                v_id_cuenta,
                f_username,
                f_password,
                0,
                f_id_tipo
            );
        end if;
    end;
    
    procedure pcr_create_user(f_rut varchar, f_nombres varchar, f_apellidos varchar, f_email varchar, f_telefono number, f_imagen blob, id_cuenta number)
    is
        v_rut_count number(10);
    begin
        select count(*) into v_rut_count from usuario where rut_usuario = f_rut;
        
        if v_rut_count = 0 then
            insert into usuario values(
                f_rut,
                f_nombres,
                f_apellidos,
                f_email,
                f_telefono,
                f_imagen,
                id_cuenta
            );
        end if;
    
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
    
    end;
    
end pkg_register;
-------------------------------------------------------------
-- Hasta ac�

/
create or replace package pkg_list as
    procedure pcr_list_by_usertype(f_usertype number, p_recordset OUT SYS_REFCURSOR);
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
    
end pkg_list;


/











