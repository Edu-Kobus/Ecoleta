// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() //função verbose é um método para monitorar o que ocorrer no sqlite

//criar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {

//     //com comandos SQL eu vou:

//     //1 Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     //(``)template string ou template literals
//     // integer é do tipo inteiro, primary key para identificar o registro, autoincrement significa que terão números que serão auto incrementados EX: ID 1, ID 2...

//     // 2 Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=861&q=80",
//         "Glass Bottles",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     // db.run(query, values, afterInsertData) //função callback

//      // 3 consultar os dados na tabela
//      db.all(`SELECT name FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Aqui estão seus registros")
//         console.log(rows)
//     })

    //4 deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [12], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso!")
    // })
    
    
  
// })
