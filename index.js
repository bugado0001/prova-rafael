const express = require("express")

const app = express()

app.use(express.json())

const funcionarioRouter = require('./router/funcionario')
app.use(funcionarioRouter)



app.listen(3000, ()=>{
console.log("Aplicação Rodando")

})