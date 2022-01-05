
const { encriptarPass } = require('./helpers/handleBcrypt')

const sqlite3 = require("sqlite3").verbose();
const { open } = require('sqlite')


const registrarBD = async (datos) => {

   
    const db = await open({
        filename: './BD/bd_auth.db',
        driver: sqlite3.Database
    });

    const passwordE = await encriptarPass(datos.password)
    const fecha = new Date()
    const sql = `INSERT INTO users(email, password, createdAt, id)
                VALUES(?,?,?,?)`

    db.run(
        sql,
        [datos.email, passwordE, fecha, 3],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID,
                "result": result
            })
        }
    );


    // // cierra conexion a la base de datos
    // db.close((err) => {
    //     if (err) return console.log("Error al cerrar db: ", err.message)
    //     console.log("Base cerrada ok")
    // })


};


const consultarBD = async (email) => {

    const db = await open({
        filename: './BD/bd_auth.db',
        driver: sqlite3.Database
    });

    const sql = "SELECT * FROM users WHERE email=?";

    const result = await db.get(sql, email)
    
    
    // // cierra conexion a la base de datos
    // db.close((err) => {
    //     if (err) return console.log("Error al cerrar db: ", err.message)
    //     console.log("Base cerrada ok")
    // })

    return result

};


module.exports = { consultarBD, registrarBD }



