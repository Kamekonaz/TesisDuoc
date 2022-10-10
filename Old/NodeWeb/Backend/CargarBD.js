const oracledb = require('oracledb');
const fs = require('fs');

var errors = 0;

const dba_credentials = {
    user: "system",
    password: "1234",
    connectString: "localhost/xe"
}

const db_credentials = {
    user: "GURO",
    password: "GURO",
    connectString: "localhost/xe"
}

function clearScript(fullQuery){
    let scripts = fullQuery.split("\n");
    scripts = scripts.filter(function(e) { return !e.includes("--")})
    scripts = scripts.filter(function(e) { return e != "\r"})
    scripts = scripts.map(function(e) { return e.replace(/\r/g,'')})
    scripts = scripts.filter(function(e) { return e != ""})
    scripts = scripts.join('').split(";").map(function(e) { return e = `${e};` })
    scripts = scripts.filter(function(e) { return e != ";"})
    scripts = scripts.map(function(e) { return e.replace(/;/g,'')})

    return scripts;
}

function clearProceduresScript(fullQuery){
    let scripts = fullQuery.split("\n");
    scripts = scripts.filter(function(e) { return !e.includes("--")})
    scripts = scripts.filter(function(e) { return e != "\r"})
    scripts = scripts.map(function(e) { return e.replace(/\r/g,'')})
    scripts = scripts.filter(function(e) { return e != ""})
    scripts = scripts.join('').split("/")
    scripts = scripts.filter(function(e) { return e != ""})

    return scripts;
}

async function loadBD(){
    const crearUsuarioScript = fs.readFileSync("../../Archivos SQL/Crear usuario.sql", 'utf8');
    const crearTablasScript = fs.readFileSync("../../Archivos SQL/Crear tablas.sql", 'utf8');
    const insertarTablasPruebaScript = fs.readFileSync("../../Archivos SQL/Insertar tablas de prueba.sql", 'utf8');
    const cargarProcedimientos = fs.readFileSync("../../Archivos SQL/Procedimientos almacenados.sql", 'utf8');

    // Crear usuario en ADMIN
    await executeQueries(crearUsuarioScript, dba_credentials, false);

    // Setup de tablas y procedimientos en usuario GURO
    await executeQueries(crearTablasScript, db_credentials, false);
    await executeQueries(insertarTablasPruebaScript, db_credentials, false);
    await executeQueries(cargarProcedimientos, db_credentials, true);


    if (errors == 0) console.log("\n---Proceso ejecutado exitosamente :D---\n");
    else console.log(`\n---Han ocurrido ${errors} errores, habla con max para solucionarlos---\n`);

}


async function executeQueries(todoScript, credentials, areProcedures){
    const connection = await oracledb.getConnection(credentials);
    const queries = (areProcedures) ? await clearProceduresScript(todoScript) : await clearScript(todoScript);

    for (query of queries){
        const cachedQuery = query;
        await connection.execute(cachedQuery, [], (err, result) =>{
            if(err && !cachedQuery.includes("DROP")){
                console.log("error",err)
                console.log(cachedQuery,"| result:",result)
                errors++;
            }         
        })
    }
    await connection.commit()
    console.log("Query ejecutada");
    await connection.close()

}

loadBD()