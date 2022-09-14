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


        comparePassword('pbkdf2:sha256:260000$yXUkfCr9aGZZJE8W$a02456628256cd096f1834e243fb7eba613283ef70360e92d9c098e8641bd600', '1234')
        await sleep(500)
        console.log(password_status)



        Connection.close()
      } catch(err){
          console.log(err)
      }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = UserManager;