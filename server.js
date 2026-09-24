const express = require("express")
const cors = require("cors")
const pesquisas = require("./dados.json")

function autoIncrement() {
    return Number(pesquisas[pesquisas.length - 1].id) + 1
}

const listarPesquisas = (req, res) => {
    res.send(pesquisas)
}

const cadastrarPesquisa = (req, res) => {
    const npesquisa = req.body
    if (req.body) {
        res.send("Pesquisa cadastrada")
    npesquisa.id = autoIncrement()
    pesquisas.push(npesquisa)
    } else {
        res.send("Erro")
    }
}

const excluirPesquisa = (req, res) => {
    const id = req.params.id
    let status = 0

    pesquisas.forEach((pesquisa, indice) => {
        if (pesquisa.id == id) {
            status = 1
            pesquisas.splice(indice, 1)
        }
    })
    if (status == 1) {
        res.send("Pesquisa excluida com sucesso!")
    } else {
        res.status(404).send("Pesquisa não encontrada")
    }
}

const atualizarPesquisa = (req, res) => {
    const id = req.params.id
    const dados = req.body
    let status = 0

    pesquisas.forEach((pesquisa) => {
        if (pesquisa.id == id) {
            pesquisa.id = dados.id
            pesquisa.sistema = dados.sistema
            pesquisa.tipo = dados.tipo
            pesquisa.finalidade = dados.finalidade
            pesquisa.tecnologia = dados.tecnologia
            pesquisa.nivel_risco = dados.nivel_risco
            pesquisa.possui_revisao_humana = dados.possui_revisao_humana
            status = 1
        }
    })
    if (status == 1) {
        res.send("Pesquisa atualizada com sucesso!")
    } else {
        res.status(404).send("Pesquisa não encontrada")
    }
}

const buscarIDPesquisa = (req, res) => {
    const id = req.params.id
    let status = 0
    let retorno

    pesquisas.forEach((pesquisa) => {
        if (pesquisa.id == id){
            retorno = pesquisa
            status = 1
        }
    })
    if (status == 1) {
        res.send(retorno)
    }else{
        res.status(404).send("Pesquisa não encontrada")
    }
}

const buscarRiscoPesquisa = (req, res) => {
    const nivel_risco = req.params.nivel_risco
    let status = 0
    let retorno
    pesquisas.forEach((pesquisa) => {
        if(pesquisa.nivel_risco == nivel_risco) {
            retorno = pesquisa
            status = 1
        }
    })
    if (status == 1) {
        res.send(retorno)
    }else{
        res.status(404).send("Pesquisa não encontrada")
    }
}

const buscarTipoPesquisa = (req, res) => {
    const tipo = req.params.tipo
    let status = 0
    let retorno

    pesquisas.forEach((pesquisa) => {
        if(pesquisa.tipo == tipo) {
            retorno = pesquisa
            status = 1
        }

    })
    if(status == 1){
        res.send(retorno)
    }else{
        res.status("Pesquisa não encontrada")
    }
}

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/', listarPesquisas)
app.get('/:id', buscarIDPesquisa)
app.get('/risco/:nivel_risco', buscarRiscoPesquisa)
app.get('/tipo/:tipo', buscarTipoPesquisa)
app.post('/', cadastrarPesquisa)
app.put('/:id', atualizarPesquisa)
app.delete('/:id', excluirPesquisa)

app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})
