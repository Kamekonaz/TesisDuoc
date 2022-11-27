--Hacer secuencia

create or replace trigger tgr_create_contract
after insert on usuario for each row
declare
v_expiration timestamp;
v_id_tipo number(10);

begin
    select id_tipo into v_id_tipo from cuenta where id_cuenta = :new.id_cuenta;
    if v_id_tipo = 3 then
        v_expiration := systimestamp  +  numtodsinterval(30, 'day');
        insert into contrato values (null, systimestamp, v_expiration, :new.rut_usuario, null, 1);
    end if;
end tgr_create_contract;

/


CREATE OR REPLACE TRIGGER contrato_id_contrato_trg BEFORE
    INSERT ON contrato
    FOR EACH ROW
    WHEN ( new.id_contrato IS NULL )
BEGIN
    :new.id_contrato := contrato_id_contrato_seq.nextval;
END;
/