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
            v_expiration := LOCALTIMESTAMP  +  numtodsinterval(7, 'day');
            
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
    procedure pcr_create_business(f_rut varchar, f_razon_social varchar, f_telefono number,  f_nombre varchar, f_rut_usuario varchar, f_calle varchar, f_id_comuna number);
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
    
    
    procedure pcr_create_business(f_rut varchar, f_razon_social varchar, f_telefono number,  f_nombre varchar, f_rut_usuario varchar, f_calle varchar, f_id_comuna number)
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
                f_rut_usuario,
                f_calle , 
                f_id_comuna
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
    procedure pcr_list_clients_with_contract(p_recordset OUT SYS_REFCURSOR);
    procedure pcr_list_payments(p_recordset OUT SYS_REFCURSOR);
end pkg_list;

/
create or replace package body pkg_list as

    procedure pcr_list_payments(p_recordset OUT SYS_REFCURSOR)
    is
    begin
        open p_recordset for
        select * from pago
        join contrato on pago.id_contrato = contrato.id_contrato
        join usuario on contrato.rut_usuario = usuario.rut_usuario
        join empresa on empresa.rut_usuario = usuario.rut_usuario
        join cuenta on usuario.id_cuenta = cuenta.id_cuenta
        left join empresa on usuario.rut_usuario = empresa.rut_usuario
        order by pago.fecha_pago desc;
    end;
    
    
    
    procedure pcr_list_by_usertype(f_usertype number, p_recordset OUT SYS_REFCURSOR)
    is
    begin
    
        open p_recordset for
        select * from usuario
        join cuenta on
        usuario.id_cuenta = cuenta.id_cuenta
        join tipo_usuario on
        tipo_usuario.id_tipo = cuenta.id_tipo
        left join empresa on usuario.rut_usuario = empresa.rut_usuario
        where cuenta.id_tipo = f_usertype;

    end;
    
    procedure pcr_list_clients_with_contract(p_recordset OUT SYS_REFCURSOR)
    is
    begin
    
        open p_recordset for
        select 
            *
        from usuario
                join cuenta on
                usuario.id_cuenta = cuenta.id_cuenta
                join tipo_usuario on
                tipo_usuario.id_tipo = cuenta.id_tipo
                left join empresa on usuario.rut_usuario = empresa.rut_usuario
                join contrato on contrato.rut_usuario = usuario.rut_usuario
                join (
                    select 
                   
                        contrato.rut_usuario as rut_usuario,
                        contrato.id_contrato,
                        contrato.fecha_inicio
                    
                        
                    from contrato
                        WHERE contrato.fecha_inicio = ( SELECT MAX( g2.fecha_inicio )
                          FROM contrato g2
                          WHERE contrato.rut_usuario = g2.rut_usuario )
                    ) sq on contrato.id_contrato = sq.id_contrato 
                join (
                    select 
                   
                        usuario.rut_usuario as rut_usuario,
                        pkg_client.pcr_get_contract_debt(usuario.rut_usuario) as deuda                    
                    from usuario
                    ) qs on usuario.rut_usuario = qs.rut_usuario 

  
        where cuenta.id_tipo = 3;

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
        select * from participante_act pa
        join usuario on
        pa.RUT_USUARIO = usuario.RUT_USUARIO
        join cuenta on
        usuario.id_cuenta = cuenta.id_cuenta
        join tipo_usuario on
        tipo_usuario.id_tipo = cuenta.id_tipo;

    end;
    
end pkg_list;

/


create or replace package pkg_client as
    procedure pcr_report_accident(f_rut_usuario varchar, f_descripcion varchar, f_asunto varchar);
    function pcr_get_contract_status(f_user_rut varchar) return number;
    function pcr_get_contract_debt(f_rut_usuario varchar) return number;
    procedure pcr_get_contract_info(f_rut_usuario varchar, p_recordset OUT SYS_REFCURSOR);
    procedure pcr_pay_contract(f_id_cuenta number, f_estado varchar, f_monto number, f_tipo_recibo varchar);
end pkg_client;
/


create or replace package body pkg_client as
    procedure pcr_pay_contract(f_id_cuenta number, f_estado varchar, f_monto number, f_tipo_recibo varchar)
    is
        v_id_contract number(12);
        v_id_pago number(12);
        v_rut_usuario varchar(50);
        
        v_inicio_contrato timestamp;
        v_expiration timestamp;
        
        v_visita_amount number(12);
        v_capacitacion_amount number(12);
        v_asesoria_amount number(12);
        
        v_normal_service_cost number(12);
        v_contract_cost number(12);
        v_extra_service_cost number(12);
        v_id_detalle number(12);
        
        v_visita_extra number(12);
        v_capacitacion_extra number(12);
        v_asesoria_extra number(12);
    begin
        select rut_usuario into v_rut_usuario from usuario where id_cuenta = f_id_cuenta;
    
        select id_contrato into v_id_contract from contrato
        where contrato.rut_usuario = v_rut_usuario
        and contrato.id_estado_contrato = 2;
        
        select nvl(max(id_pago), 0)+1 into v_id_pago from pago;
        
        insert into pago values(
            v_id_pago,
            LOCALTIMESTAMP,
            f_estado,
            f_monto,
            f_tipo_recibo,
            v_id_contract
        );
        
        select 
        nvl(sum(case when checklist_visita.modificaciones>0 then checklist_visita.modificaciones end),0) as modificaciones_visita,
        count(case when actividad.id_tipoactividad=2 then 1 end) as capacitaciones,
        count(case when actividad.id_tipoactividad=3 then 1 end) as asesorias
        into
            v_visita_amount,
            v_capacitacion_amount,
            v_asesoria_amount 
        from actividad
                    left join visita on actividad.id_actividad = visita.id_actividad
                    left join checklist_visita on checklist_visita.id_visita = visita.id_visita
                    join participante_act pa on pa.id_actividad = actividad.id_actividad
                    join contrato on contrato.rut_usuario = pa.rut_usuario
                    where pa.rut_usuario = v_rut_usuario
                    and actividad.fecha_actividad >= contrato.fecha_inicio
                    and actividad.fecha_actividad <= contrato.fecha_termino
                    and contrato.id_estado_contrato = 2;
                
        select sum(costo_fijo) into v_contract_cost from coste_act;
        
        select nvl(max(id_detallepago),0) into v_id_detalle from detalle_pago;
        
        select costo_fijo into v_normal_service_cost from coste_act where id_tipoactividad = 1;
        select costo_extra into v_extra_service_cost from coste_act where id_tipoactividad = 1;
        
        if v_visita_amount > 2 then      
            v_visita_extra := (v_visita_amount - 2) * v_extra_service_cost;
            v_contract_cost := v_contract_cost + ((v_visita_amount - 2) * v_extra_service_cost);  
            
            v_visita_amount:= v_visita_amount-2;
        else v_visita_amount:= 0;
        end if;
        
        insert into detalle_pago
                values(
                    v_id_detalle + 1,
                    'Modificaciones a checklist de visita',
                    v_normal_service_cost,
                    v_id_pago,
                    v_visita_amount,
                    v_extra_service_cost * v_visita_amount,
                    v_normal_service_cost + v_extra_service_cost*v_visita_amount
                );
        
        select costo_extra into v_extra_service_cost from coste_act where id_tipoactividad = 2;
        select costo_fijo into v_normal_service_cost from coste_act where id_tipoactividad = 2;
        if v_capacitacion_amount > 0 then
            v_capacitacion_extra := v_capacitacion_amount * v_extra_service_cost;
            v_contract_cost := v_contract_cost + (v_capacitacion_amount * v_extra_service_cost);
            
        end if;
        
        insert into detalle_pago
                values(
                    v_id_detalle + 2,
                    'Capacitaciónes',
                    v_normal_service_cost,
                    v_id_pago,
                    v_capacitacion_amount,
                    v_extra_service_cost * v_capacitacion_amount,
                    v_normal_service_cost + v_extra_service_cost*v_capacitacion_amount
                );
                
        select costo_fijo into v_normal_service_cost from coste_act where id_tipoactividad = 3;
        select costo_extra into v_extra_service_cost from coste_act where id_tipoactividad = 3;
         if v_asesoria_amount > 10 then
            
            v_asesoria_extra := (v_asesoria_amount - 10) * v_extra_service_cost;
            v_contract_cost := v_contract_cost + ((v_asesoria_amount - 10) * v_extra_service_cost);
            
            v_asesoria_amount:= v_asesoria_amount-10;
        else v_asesoria_amount:= 0;
        end if;
        
        insert into detalle_pago
                values(
                    v_id_detalle + 3,
                    'Asesorías',
                    v_normal_service_cost,
                    v_id_pago,
                    v_asesoria_amount,
                    v_extra_service_cost * v_asesoria_amount,
                    v_normal_service_cost + v_extra_service_cost*v_asesoria_amount
                );
        
        update contrato
            set id_estado_contrato = 3
        where id_contrato = v_id_contract;
        
        select max(fecha_termino) into v_inicio_contrato from contrato where rut_usuario = v_rut_usuario;
            
        v_expiration := v_inicio_contrato  +  numtodsinterval(30, 'day');
        insert into contrato values (null, v_inicio_contrato, v_expiration, v_rut_usuario, null, 1);
        
        commit work;
    end;
    
    
    procedure pcr_get_contract_info(f_rut_usuario varchar, p_recordset OUT SYS_REFCURSOR)
    is
    begin
        open p_recordset for
        select * from contrato
        where contrato.rut_usuario = f_rut_usuario
        and contrato.id_estado_contrato = 2;
    end;

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
    
    function pcr_get_contract_status(f_user_rut varchar) return number
    is 
        v_valid_contract_count number(10);
        
    begin
        select count(*) into v_valid_contract_count from contrato
            where contrato.rut_usuario = f_user_rut
            and rownum = 1
            and contrato.id_estado_contrato = 2
            order by contrato.fecha_inicio desc;
        
        if v_valid_contract_count = 1 then
            return 1;
        else return 0;
        end if;
        
    end;
    
    function pcr_get_contract_debt(f_rut_usuario varchar) return number
    is
        v_visita_amount number(10) := 0;
        v_capacitacion_amount number(10) := 0;
        v_asesoria_amount number(10) := 0;
        
        v_contract_cost number(10) := 0;
        v_extra_service_cost number(10) := 0;
        
        
    begin
        select nvl(sum(case when checklist_visita.modificaciones>0 then checklist_visita.modificaciones end),0) into v_visita_amount from actividad
            join visita on actividad.id_actividad = visita.id_actividad
            join checklist_visita on checklist_visita.id_visita = visita.id_visita
            join participante_act pa on pa.id_actividad = actividad.id_actividad
            join contrato on contrato.rut_usuario = pa.rut_usuario
            where pa.rut_usuario = f_rut_usuario
            and actividad.fecha_actividad >= contrato.fecha_inicio
            and actividad.fecha_actividad <= contrato.fecha_termino
            and contrato.id_estado_contrato != 3;
            
        select count(case when actividad.id_tipoactividad=2 then 1 end) into v_capacitacion_amount from actividad
            join participante_act pa on pa.id_actividad = actividad.id_actividad
             join contrato on contrato.rut_usuario = pa.rut_usuario
            where pa.rut_usuario = f_rut_usuario
            and actividad.fecha_actividad >= contrato.fecha_inicio
            and actividad.fecha_actividad <= contrato.fecha_termino
            and contrato.id_estado_contrato != 3;
            
        select count(case when actividad.id_tipoactividad=3 then 1 end) into v_asesoria_amount from actividad
            join participante_act pa on pa.id_actividad = actividad.id_actividad
             join contrato on contrato.rut_usuario = pa.rut_usuario
            where pa.rut_usuario = f_rut_usuario
            and actividad.fecha_actividad >= contrato.fecha_inicio
            and actividad.fecha_actividad <= contrato.fecha_termino
            and contrato.id_estado_contrato != 3;
        
        select sum(costo_fijo) into v_contract_cost from coste_act;
        
        
        if v_visita_amount > 2 then
            select costo_extra into v_extra_service_cost from coste_act where id_tipoactividad = 1;
            v_contract_cost := v_contract_cost + ((v_visita_amount - 2) * v_extra_service_cost);
        end if;
        
        select costo_extra into v_extra_service_cost from coste_act where id_tipoactividad = 2;
        v_contract_cost := v_contract_cost + (v_capacitacion_amount * v_extra_service_cost);
        
         if v_asesoria_amount > 10 then
            select costo_extra into v_extra_service_cost from coste_act where id_tipoactividad = 3;
            v_contract_cost := v_contract_cost + ((v_asesoria_amount - 10) * v_extra_service_cost);
        end if;

        
        return v_contract_cost;
        
        exception when others then return 1;
    end;
end pkg_client;
/
create or replace package pkg_util as
    procedure sp_add_participante(id_actividad number, rut_usuario varchar2, f_rut_profesional varchar2);
    procedure sp_change_contract_status(f_id_contract number, f_new_status number);
    procedure sp_get_costs_by_rut(f_rut_usuario varchar, rf_cur out sys_refcursor);
    procedure sp_get_detalle_boleta(f_id_pago number, rf_cur out sys_refcursor);
end pkg_util;

/

create or replace package body pkg_util as

    procedure sp_get_costs_by_rut(f_rut_usuario varchar, rf_cur out sys_refcursor)
        is

            
            
        begin
            open rf_cur for 
            select 
                *
                from dual
                cross join 
                (
                select 
                    nvl(sum(case when checklist_visita.modificaciones>0 then checklist_visita.modificaciones end),0) as modificaciones_visita,
                    count(case when actividad.id_tipoactividad=2 then 1 end) as capacitaciones,
                    count(case when actividad.id_tipoactividad=3 then 1 end) as asesorias
                from actividad
                            left join visita on actividad.id_actividad = visita.id_actividad
                            left join checklist_visita on checklist_visita.id_visita = visita.id_visita
                            join participante_act pa on pa.id_actividad = actividad.id_actividad
                            join contrato on contrato.rut_usuario = pa.rut_usuario
                            where pa.rut_usuario = f_rut_usuario
                            and actividad.fecha_actividad >= contrato.fecha_inicio
                            and actividad.fecha_actividad <= contrato.fecha_termino
                            and contrato.id_estado_contrato != 3
                ) actividad
                cross join
                (
                select 
                    sum(case when coste_act.id_tipoactividad=1 then costo_fijo end) as coste_visita,
                    sum(case when coste_act.id_tipoactividad=2 then costo_fijo end) as coste_capacitacion,
                    sum(case when coste_act.id_tipoactividad=3 then costo_fijo end) as coste_asesoria,
                    sum(case when coste_act.id_tipoactividad=1 then costo_extra end) as coste_extra_visita,
                    sum(case when coste_act.id_tipoactividad=2 then costo_extra end) as coste_extra_capacitacion,
                    sum(case when coste_act.id_tipoactividad=3 then costo_extra end) as coste_extra_asesoria
                from coste_act
                ) costes;
          
        end;

    procedure sp_change_contract_status(f_id_contract number, f_new_status number)
        is
        begin

            
            
            update contrato
                set id_estado_contrato = f_new_status
            where id_contrato = f_id_contract;
  

            commit work;
    end;
    procedure sp_add_participante(id_actividad number, rut_usuario varchar2, f_rut_profesional varchar2)
    
    is
        v_maintable_id number(12);
        v_maintablerow_count number(12);
        v_maintablemax_id number(12);

    begin
        select count(*), max(to_number(id_asignacion)) into v_maintablerow_count, v_maintablemax_id from participante_act;
            if v_maintablerow_count > 0 then v_maintable_id := v_maintablemax_id+1;
            else v_maintable_id := 1;
            end if;
        
        insert into participante_act values(v_maintable_id, id_actividad, rut_usuario);
        insert into participante_act values(v_maintable_id+1, id_actividad, f_rut_profesional);
        commit work;
    end;
    
    procedure sp_get_detalle_boleta(f_id_pago number, rf_cur out sys_refcursor) 
    is
    begin
        open rf_cur for
        select * from detalle_pago
            join pago on detalle_pago.id_pago = pago.id_pago
            join contrato on pago.id_contrato = contrato.id_contrato
            join usuario on usuario.rut_usuario = contrato.rut_usuario
            join empresa on usuario.rut_usuario = empresa.rut_usuario
            join comuna on comuna.id_comuna = empresa.id_comuna
            join provincia on provincia.id_provincia = comuna.id_provincia
            join region on provincia.id_region = region.id_region
            where
        detalle_pago.id_pago = f_id_pago;
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











