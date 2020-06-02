import express from 'express';
const app = express();
const port = 3333;
app.use(express.json())

// GET: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação no back-end
// DELETE: Remover uma informação no back-end


const users = [
  'teste0',
  'teeste1',
  'dsadda'
]

// REQUEST PARAM: Parâmetros que vem na própria rota que identificam um recurso
app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id);
  const user = users[id];
  return response.json(user);
});

// QUERY PARAM:Parâmetros que vem na própria rota geralmente opcional para filtros
app.get('/users', (request, response) => {
  const search = String(request.query.search);
  const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
  return response.json(filteredUsers);
});

// REQUEST BODY: Parâmetros para criação/atualização de informações
app.get('/users', (request, response) => {
  const data = request.body;
  const info = {
    nome: data.nome,
    email: data.email
  }
  return response.json(info);
});

console.log(`Running on the port ${port}`);
app.listen(port);