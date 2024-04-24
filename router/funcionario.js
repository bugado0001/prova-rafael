const express = require("express"); 
const router = express.Router()

let listaFuncionario =[
    {
        id: 1,
        nome: "Fulano de Tal",
        email: "fulano1@example.com",
        telefone: "123456789",
        cargo: "Desenvolvedor",
        salario: 5000
    },
    {
        id: 2,
        nome: "Beltrano da Silva",
        email: "beltrano@example.com",
        telefone: "987654321",
        cargo: "Analista de Dados",
        salario: 6000
    },
    {
        id: 3,
        nome: "Ciclano Souza",
        email: "ciclano@example.com",
        telefone: "111223344",
        cargo: "Gerente de Projetos",
        salario: 7000
    },
    {
        id: 4,
        nome: "João da Silva",
        email: "joao@example.com",
        telefone: "555666777",
        cargo: "Designer",
        salario: 4500
    },
    {
        id: 5,
        nome: "Maria Oliveira",
        email: "maria@example.com",
        telefone: "999888777",
        cargo: "Analista de Marketing",
        salario: 5500
    }

]


/* - (0,5 pontos) Criar uma rota e implementação para
 busca de todos os funcionários (GET /funcionarios)*/

router.get("/funcionario", (req,res)=>{
res.json(listaFuncionario)

})


/*- (0,5 pontos) Criar uma rota e implementação para
 busca de funcionário por identificador 
 (GET /funcionarios/:id) */

/*- (0,5 pontos) Na busca de funcionário por identificador,
 em caso de funcionário não localizado, responder o
 status referente a NOT_FOUND (GET /funcionarios/:id) */

router.get("/funcionario/:id", (req,res)=>{
const id = req.params.id
const  funcionario = listaFuncionario.find(funcionario => funcionario.id==id)
if (funcionario){
return res.json(funcionario)
}
return res.status(404).json("Pessoa não encontrada!")



})

/*- (1,0 pontos) Criar uma rota e implementação
 para cadastro de funcionário (POST /funcionarios)*/

/*- (0,75 pontos) No cadastro de funcionário, todos
 os campos são obrigatórios; caso não seja enviado um ou mais campos, responder o 
status referente a BAD_REQUEST (POST /funcionarios) */

router.post('/funcionario', (req, res) => {
    const dados = req.body

    if (!dados.nome || !dados.email || !dados.telefone || !dados.cargo
        || !dados.salario) {
        return res.status(400).json({ mensagem: "Nome, Email, Telefone, Cargo, Salario e valor são obrigatórios" })
    }

    const funcionario = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cargo: dados.cargo,
        salario: dados.salario
    }

    listaFuncionario.push(funcionario)

    res.json({
        mensagem: "Funcionario cadastrado com sucesso!",
        funcionario: funcionario
    })
})

/*- (1,0 pontos) Criar uma rota e implementação para
 atualização de funcionário (PUT /funcionarios/:id)
 
 - (0,5 pontos) Na atualização de funcionário, em caso de
  funcionário não localizado, responder 
 o status referente a NOT_FOUND (PUT /funcionarios/:id)

 - (0,75 pontos) Na atualização de funcionário, todos os campos são obrigatórios; caso não seja 
 enviado um ou mais campos, responder o status referente a BAD_REQUEST (PUT /funcionarios/:id)
 */ 


 // UPDATE -> Atualização de carro
router.put('/funcionario/:id', (req, res) => {
    const id = req.params.id
    const dados = req.body

    if (!dados.nome || !dados.email || !dados.telefone || !dados.cargo
        || !dados.salario) {
        return res.status(400).json({ mensagem: "Nome, Email, Telefone, Cargo, Salario e valor são obrigatórios" })
    }

    const index = listaFuncionario.findIndex(funcionario => funcionario.id == id)
    if (index == -1) {
        return res.status(404).json({ mensagem: "Carro não encontrato!" })
    }

    const funcionarioAtualizado = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cargo: dados.cargo,
        salario: dados.salario
    }

    listaFuncionario[index] = funcionarioAtualizado

    res.json({
        mensagem: "Funcionario atualizado com sucesso!",
        Funcionario: funcionarioAtualizado
    })
})

/*
- (0,5 pontos) Criar uma rota e implementação para exclusão de 
funcionário por identificador (DELETE /funcionarios/:id)

- (0,5 pontos) Na exclusão de funcionário por identificador, em caso de funcionário não localizado,
 responder o status referente a NOT_FOUND (DELETE /funcionarios/:id) */

router.delete('/funcionario/:id', (req, res) => {
    const id = req.params.id
    const index = listaFuncionario.findIndex(funcionario => funcionario.id == id)
    if (index == -1) {
        return res.status(404).json({ mensagem: "Funcionario não encontrato!" })
    }

    listaFuncionario.splice(index, 1)
    res.json({ mensagem: "Funcionario excluído com sucesso!" })
})

/*- (0,5 pontos) Criar uma rota e implementação para busca de todos os 
funcionários do mesmo cargo (GET /funcionarios/cargo/:cargo) */


router.get('/funcionario/cargo/:cargo', (req, res) => {
    const cargo = req.params.cargo
    const funcionario = listaFuncionario.filter(funcionario => funcionario.cargo.toLowerCase() == cargo.toLowerCase())
    res.json(funcionario)
})

/*- (1,0 pontos) Criar uma rota e implementação para calcular e retornar a média salarial 
de todos os funcionários da lista (GET /funcionarios/salarios/media)
 */
router.get("/funcionario/salarios/media", (req,res)=>{

    let valorTotal = 0;

    listaFuncionario.forEach(funcionario => {
        valorTotal += funcionario.salario || 0; 
    });

    // Calcula a média salarial
    let mediaSalarial = valorTotal / listaFuncionario.length;

    // Retorna a média salarial
    res.json({ mediaSalarial: mediaSalarial });


})


module.exports = router