const oracledb = require('oracledb')
const {PythonShell} = require('python-shell');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


const db_credentials = {
      user: "GURO",
      password: "GURO",
      connectString: "localhost/xe"
}

let password_status

async function comparePassword(encryptedPass, inputPass){
  let result;
  PythonShell.runString(`from werkzeug.security import check_password_hash;print(check_password_hash("${encryptedPass}", "${inputPass}"))`, 
        null, function (err, results){
          if (err) throw err;
          result = results[0];
          password_status = result;
        });
}


class UserManager {
  static async get_profesionals(){
    try{
        password_status = undefined;
        const Connection = await oracledb.getConnection(db_credentials);
        const query = `select * from cuenta`
        

        const result = await Connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
      
        console.log(result)


        Connection.close()
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

      
      comparePassword(result.outBinds["return"], password)
      await sleep(500)


      const isUsernameCorrect = (!!(result.outBinds["return"]))
      const isPasswordCorrect = (password_status == "True")

      

      Connection.close()
      
      return {isUsernameCorrect: isUsernameCorrect, isPasswordCorrect: isPasswordCorrect};

      } catch(err){
      console.log(err)
    }                                   
  }   
  
  static async getUserData(username){
    try{
      const Connection = await oracledb.getConnection(db_credentials);

      const query = `
      select * from cuenta
      join usuario on
      cuenta.id_cuenta = usuario.id_cuenta
      where cuenta.username = '${username}'
      `

      const result = await Connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

      Connection.close()
      
      return result.rows;

      } catch(err){
      console.log(err)
    }    
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = UserManager;