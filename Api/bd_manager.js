const bcrypt = require('bcrypt')
const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

var crypto = require('crypto');

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
            console.log(accountID)

            await Connection.close();
            return accountID;

        } catch (error) {
            
        }
    }

    static async createSession(f_accountID){
        const sessionKey = generate_key()
        try {
            const Connection = await oracledb.getConnection(db_credentials);
            console.log("alo?", f_accountID)
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
  
          await Connection.close()
  
          return filas;
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
  
        await Connection.close()
        
        return result.rows[0];
  
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
  
        await Connection.close()
        
        return result.rows[0];
  
        } catch(err){
        console.log(err)
      }    
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  module.exports = BdManager;