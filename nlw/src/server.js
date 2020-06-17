const express = require("express") //require é uma caixinha, express e a condição dessa caixinha, que irá responder retornando um argumento
const server = express()

//pegar o banco de dados
const db = require("./database/db")


// configurar pasta pública
server.use(express.static("public")) //arquivos estáticos

//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicação
//página inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"}) //resposta do servidor
})

server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html")
})

//usando verbo http "post" para esconder dados sigilozos da url
server.post("/savepoint", (req, res) => {

    //req.body: O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)

    
})




server.get("/search", (req, res) => {

    const search = req.query.search
    
    if(search == "") {
        //Pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    // pegar os dados do banco de dados
    // "city like '%$"{search}%" irá procurar toda palavra semelhante a descrita no ponto de coleta
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //comando para mostrar a página html com os dados do banco de dados, os dados estão na propriedade "places"
        return res.render("search-results.html", { places: rows, total: total})
    }) 
})

//ligar o servidor
server.listen(3000) //listen (ouvir) porta do servidor 3000
