const bcrypt = require('bcrypt')
const oracledb = require('oracledb')
const BdValidation = require('./bd_validation')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

var crypto = require('crypto');
const { Console } = require('console');

var generate_key = function() {
    return crypto.randomBytes(32).toString('base64');
};

//console.log(generate_key())

const db_credentials = {
      user: "GURO",
      password: "GURO",
      connectString: "localhost/xe"
}


class BdManager {

  static async create_checklist(req, res){
    try {

      const { sessionKey } = req.body
      const { tittle } = req.body
      const { options } = req.body

      if (!BdValidation.is_key_valid(BdManager, sessionKey, ["2"])) return res.send("Usuario incorrecto")


      const Connection = await oracledb.getConnection(db_credentials);

      const result = await Connection.execute(
        `BEGIN
          pkg_util.sp_change_contract_status(:v_rut_usuario, :v_newStatus);
        END;`,
        {  
          v_rut_usuario: rut_usuario,
          v_newStatus: newStatus
        }
      );
      await Connection.close()

      res.send("Actualizado exitosamente");


    } catch (error) {
        return res.send("Error")
    }
  }

    static async change_contract_status(req, res){
      try {

        const { sessionKey } = req.body
        const { rut_usuario } = req.body
        const { newStatus } = req.body

        if (!BdValidation.is_key_valid(BdManager, sessionKey, ["1"])) return res.send("Usuario incorrecto")


        const Connection = await oracledb.getConnection(db_credentials);

        const result = await Connection.execute(
          `BEGIN
            pkg_util.sp_change_contract_status(:v_rut_usuario, :v_newStatus);
          END;`,
          {  
            v_rut_usuario: rut_usuario,
            v_newStatus: newStatus
          }
        );
        await Connection.close()

        res.send("Actualizado exitosamente");


      } catch (error) {
          return res.send("Error")
      }
    }

    static async get_detalle_boleta(req, res){
      try {

        const { id_pago } = req.body


        const Connection = await oracledb.getConnection(db_credentials);

        const result = await Connection.execute(
          `BEGIN
          pkg_util.sp_get_detalle_boleta(:v_id_pago,:v_users);
           END;`,
          {  
            v_id_pago: id_pago,
            v_users: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
          }
        );
        const cursor = result.outBinds.v_users;
        const filas = await cursor.getRows();

        await Connection.close()

        res.send(filas);


      } catch (error) {
          return res.send("Error")
      }
    }
  
    static async get_detail_by_rut(req, res){
      try {

        const { sessionKey } = req.body
        const { rut_usuario } = req.body

        if (!BdValidation.is_key_valid(BdManager, sessionKey, ["1"])) return res.send("Usuario incorrecto")


        const Connection = await oracledb.getConnection(db_credentials);

        const result = await Connection.execute(
          `BEGIN
          pkg_util.sp_get_costs_by_rut(:v_rut_usuario,:v_users);
           END;`,
          {  
            v_rut_usuario: rut_usuario,
            v_users: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
          }
        );
        const cursor = result.outBinds.v_users;
        const filas = await cursor.getRows();

        await Connection.close()

        res.send(filas);


      } catch (error) {
          return res.send("Error")
      }
    }

    static async get_payments(req, res){
      try {

        const { sessionKey } = req.body

        if (!BdValidation.is_key_valid(BdManager, sessionKey, ["1"])) return res.send("Usuario incorrecto")


        const Connection = await oracledb.getConnection(db_credentials);

        const result = await Connection.execute(
          `BEGIN
            pkg_list.pcr_list_payments(:v_users);
           END;`,
          {  
            v_users: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
          }
        );
        const cursor = result.outBinds.v_users;
        const filas = await cursor.getRows();
        
        for (const fila of filas){
          if (fila["IMAGEN"]) fila["IMAGEN"] = await fila["IMAGEN"].getData()
        }

        await Connection.close()

        res.send(filas);


      } catch (error) {
          return res.send("Error")
      }
    }

    static async get_clients_with_contract(req, res){
      try {

        const { sessionKey } = req.body

        if (!BdValidation.is_key_valid(BdManager, sessionKey, ["1"])) return res.send("Usuario incorrecto")


        const Connection = await oracledb.getConnection(db_credentials);

        const result = await Connection.execute(
          `BEGIN
            pkg_list.pcr_list_clients_with_contract(:v_users);
           END;`,
          {  
            v_users: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
          }
        );
        const cursor = result.outBinds.v_users;
        const filas = await cursor.getRows();
        
        for (const fila of filas){
          if (fila["IMAGEN"]) fila["IMAGEN"] = await fila["IMAGEN"].getData()
        }

        await Connection.close()

        res.send(filas);


    } catch (error) {
        return res.send("Error")
    }
    }

    static async get_accountID_by_sessionKey(sessionKey){
        try {
            const Connection = await oracledb.getConnection(db_credentials);
            const result = await Connection.execute(
                `BEGIN
                    :return := pkg_login.fn_get_account_by_key(:v_sessionKey);
                END;`,
                {  
                    v_sessionKey: sessionKey,
                    return: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 300 }
                }
            );
            const accountID = result.outBinds["return"];
            //console.log(accountID)

            await Connection.close();
            return accountID;

        } catch (error) {
            
        }
    }

    static async 

    static async createSession(f_accountID){
        const sessionKey = generate_key()
        try {
            const Connection = await oracledb.getConnection(db_credentials);
            //console.log("alo?", f_accountID)
            const sessionCreationResult = await Connection.execute(
                `BEGIN
                    pkg_login.pcr_create_sessionkey(:v_sessionKey, :v_accountID);
                 END;`,
                {  
                  v_sessionKey: sessionKey,
                  v_accountID: f_accountID
                }
              );
            await Connection.close()
            return {
                sessionKey: sessionKey,
                error: false
            };

        } catch (error) {
            console.log(error)
        }     
    }
    static async deleteUser(accountID){
      try {
          const Connection = await oracledb.getConnection(db_credentials);
          //console.log("alo?", f_accountID)
          const result = await Connection.execute(
              `BEGIN
                pkg_register.pcr_delete_user(:v_accountID);
               END;`,
              {  
                v_accountID: accountID
              }
            );
          await Connection.close()
          return {
              error: false
          };

      } catch (error) {
          console.log(error)
      }     
  }

  static async crearCapacitacion(descripcion, material, fecha, rut_usuario, rut_profesional){
    try {
        const Connection = await oracledb.getConnection(db_credentials);
        //console.log("alo?", f_accountID)
        const result = await Connection.execute(
            `BEGIN
            pkg_function_profesional.SP_CREAR_CAPACITACION(:v_descripcion, :v_material, :v_fecha, :v_rut_usuario, :v_rut_profesional);
             END;`,
            {  
              v_descripcion: descripcion,
              v_material: material,
              v_fecha: fecha,
              v_rut_usuario: rut_usuario,
              v_rut_profesional: rut_profesional
            }
          );

          
        await Connection.commit()
        await Connection.close()
        return {
            error: false
        };

    } catch (error) {
        console.log(error)
    }     
}

static async crearAsesoria(especial, fecha, rut_usuario, rut_profesional){
  try {
      const Connection = await oracledb.getConnection(db_credentials);
      const result = await Connection.execute(
          `BEGIN
          pkg_function_profesional.SP_CREAR_ASESORIA(:v_especial, :v_fecha, :v_rut_usuario, :v_rut_profesional);
           END;`,
          {  
            v_especial: especial,
            v_fecha: fecha,
            v_rut_usuario: rut_usuario,
            v_rut_profesional: rut_profesional
          }
        );

        
      await Connection.commit()
      await Connection.close()
      return {
          error: false
      };

  } catch (error) {
      console.log(error)
  }     
}

static async crearVisita(fecha, rut_usuario, rut_profesional){
  try {
      const Connection = await oracledb.getConnection(db_credentials);
      //console.log("alo?", f_accountID)
      const result = await Connection.execute(
          `BEGIN
          pkg_function_profesional.SP_CREAR_VISITA(:v_fecha, :v_rut_usuario, :v_rut_profesional);
           END;`,
          {  
            v_fecha: fecha,
            v_rut_usuario: rut_usuario,
            v_rut_profesional: rut_profesional
          }
        );

        
      await Connection.commit()
      await Connection.close()
      return {
          error: false
      };

  } catch (error) {
      console.log(error)
  }     
}

    static async createUser(f_imagen, f_id_tipo, f_estado, f_rut, f_username,  f_password,  f_nombres, f_apellidos, f_email, f_telefono){
        try {

            
            const Connection = await oracledb.getConnection(db_credentials);
            //console.log("alo?", f_accountID)
            bcrypt.hash(f_password, 10)
            .then(async (hash) => {
            // Store hash in the database
           
              const result = await Connection.execute(
                  `BEGIN
                    pkg_register.pcr_create_user(:f_imagen, :f_id_tipo, :f_estado, :f_rut, :f_username, :f_password, :f_nombres, :f_apellidos, :f_email, :f_telefono);
                  END;`,
                  {  
                    f_imagen: f_imagen, 
                    f_id_tipo: f_id_tipo, 
                    f_estado: f_estado, 
                    f_rut: f_rut,
                    f_username: f_username,  
                    f_password: hash,  
                    f_nombres: f_nombres, 
                    f_apellidos: f_apellidos, 
                    f_email: f_email, 
                    f_telefono: f_telefono
                  }
                );
            
              await Connection.commit()
              await Connection.close()
              console.log(result)
              return result

            })

        } catch (error) {
            console.log(error)
        }     
    }

    static async report_accident(rut_usuario, descripcion, asunto){
      try{
          const Connection = await oracledb.getConnection(db_credentials);
      
          const result = await Connection.execute(
            `BEGIN
                pkg_client.pcr_report_accident(:v_rut_usuario, :v_descripcion, :v_asunto);
             END;`,
            {  
              v_rut_usuario: rut_usuario,
              v_descripcion: descripcion,
              v_asunto: asunto,
            }
          );
 
          await Connection.close()
  
        } catch(err){
            console.log(err)
        }
    }

    static async db_payment(f_id_cuenta, f_estado, f_monto, f_tipo_recibo){
      try{
        const Connection = await oracledb.getConnection(db_credentials);
        
        console.log("holi u///////u")
        const result = await Connection.execute(
          `BEGIN
              pkg_client.pcr_pay_contract(:v_id_cuenta, :v_estado, :v_monto, :v_tipo_recibo);
           END;`,
          {  
            v_id_cuenta: f_id_cuenta, 
            v_estado: f_estado, 
            v_monto: f_monto,
            v_tipo_recibo: f_tipo_recibo
          }
        );
        console.log("ALO uwwwwwwu")

        await Connection.close()

      } catch(err){
          console.log(err)
      }
    }



    static async get_users_by_usertype(usertype){
      try{
          const Connection = await oracledb.getConnection(db_credentials);
      
          const result = await Connection.execute(
            `BEGIN
              pkg_list.pcr_list_by_usertype(:v_usertype, :v_users);
             END;`,
            {  
              v_usertype: usertype,
              v_users: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
            }
          );
          const cursor = result.outBinds.v_users;
          const filas = await cursor.getRows();
          
          for (const fila of filas){
            if (fila["IMAGEN"]) fila["IMAGEN"] = await fila["IMAGEN"].getData()
          }
          //filas[0] = await filas[0]["IMAGEN"].getData()
  
          await Connection.close()
  
          return filas;

        } catch(err){
            console.log(err)
        }
    }

    static async get_contract_info(user_rut){
      try{
        const Connection = await oracledb.getConnection(db_credentials);
    
        const result = await Connection.execute(
          `BEGIN
            :status := pkg_client.pcr_get_contract_status(:v_user_rut);
            :debt := pkg_client.pcr_get_contract_debt(:v_user_rut);
           END;`,
          {  
            v_user_rut: user_rut,
            status: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 12 },
            debt: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 12 }
          }
        );

  
          const result2 = await Connection.execute(
            `BEGIN
                pkg_client.pcr_get_contract_info(:v_user_rut, :v_contract);
            END;`,
            {  
              v_user_rut: user_rut,
              v_contract: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
            }
          );
          const cursor2 = result2.outBinds.v_contract;
          const contract = await cursor2.getRows();


          const data = {
            status: result.outBinds.status,
            debt: result.outBinds.debt,
            contract_info: contract[0]
              
          }
          return data

      } catch(err){
          console.log(err)
      }
    }

    static async get_activities(){
      try{
          const Connection = await oracledb.getConnection(db_credentials);
      
          const result = await Connection.execute(
            `BEGIN
              pkg_list.pcr_list_activities(:v_activities);
             END;`,
            {  
              v_activities: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
            }
          );
          const cursor = result.outBinds.v_activities;
          const actividades = await cursor.getRows();

          const result2 = await Connection.execute(
            `BEGIN
              pkg_list.pcr_list_participants(:v_participants);
             END;`,
            {  
              v_participants: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
            }
          );
          const cursor2 = result2.outBinds.v_participants;
          const participants = await cursor2.getRows();
  
          await Connection.close()
  
          return [actividades, participants];

        } catch(err){
            console.log(err)
        }
    }

    
    static async updateUserData(f_accountID, f_image, 
          f_username, f_nombres, f_apellidos, 
          f_email, f_telefono, f_estado){
      try{
          const Connection = await oracledb.getConnection(db_credentials);
      
          const result = await Connection.execute(
            `BEGIN
              pkg_login.pcr_update_user(:f_accountID, :f_image, 
                :f_username, :f_nombres, :f_apellidos, 
                :f_email, :f_telefono, :f_estado);
             END;`,
            {  
              f_accountID: f_accountID, f_image: f_image, 
            f_username: f_username, f_nombres: f_nombres, f_apellidos: f_apellidos, 
            f_email: f_email, f_telefono: f_telefono, f_estado: f_estado
            }
          );

  
          await Connection.close()
  
        } catch(err){
            console.log(err)
        }
    }

    static async login(username, password){
      try{
        const Connection = await oracledb.getConnection(db_credentials);
        const result = await Connection.execute(
          `BEGIN
            :return := pkg_login.fn_login_fetch_username(:v_username);
           END;`,
          {  
            v_username: username,
            return: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 300 }
          }
        );
  
        const match = await bcrypt.compare(password, result.outBinds["return"]);
  
        const isUsernameCorrect = (!!(result.outBinds["return"]))
        const isPasswordCorrect = (match == true)
  
        await Connection.close()
        
        return {isUsernameCorrect: isUsernameCorrect, isPasswordCorrect: isPasswordCorrect};
  
        } catch(err){
        console.log(err)
      }                                   
    }   
    
    static async getUserDataByUsername(username){
      try{
        const Connection = await oracledb.getConnection(db_credentials);
  
        const query = `
        select * from cuenta
        join usuario on
        cuenta.id_cuenta = usuario.id_cuenta
        join tipo_usuario on
        tipo_usuario.id_tipo = cuenta.id_tipo
        where cuenta.username = '${username}'
        `
  
        const result = await Connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

        const filas = result.rows[0]

        if (filas["IMAGEN"]) filas["IMAGEN"] = await filas["IMAGEN"].getData()


        await Connection.close()
      

        return filas;
  
        } catch(err){
        console.log(err)
      }    
    }


  

    static async getPaymentID(account_id){
      try{
        const Connection = await oracledb.getConnection(db_credentials);
  
        const query = `
        select max(pago.id_pago) as ID_PAGO from pago
        join contrato on contrato.id_contrato = pago.id_contrato
        join usuario on usuario.rut_usuario = contrato.rut_usuario
        join cuenta on cuenta.id_cuenta = usuario.id_cuenta
        where cuenta.id_cuenta = '${account_id}'
                `
  
        const result = await Connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

        const filas = result.rows[0]

        console.log(filas)

        await Connection.close()
      

        return filas["ID_PAGO"];
  
        } catch(err){
        console.log(err)
      }    
    }

    static async getUserDataById(account_id){
      try{
        const Connection = await oracledb.getConnection(db_credentials);
  
        const query = `
        select * from cuenta
        join usuario on
        cuenta.id_cuenta = usuario.id_cuenta
        join tipo_usuario on
        tipo_usuario.id_tipo = cuenta.id_tipo
        where cuenta.id_cuenta = '${account_id}'
        `
  
        const result = await Connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
  
        

        const filas = result.rows[0]


        if (filas["IMAGEN"]) filas["IMAGEN"] = await filas["IMAGEN"].getData()


        await Connection.close()

        return filas;
  
        } catch(err){
        console.log(err)
      }    
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  module.exports = BdManager;