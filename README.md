# Some API

## Documentação da API Express.js - Curso Anson the Developer

### Setup Inicial

* **Dependências:**
  * `nodemon`: Para reiniciar o servidor automaticamente em caso de alterações.
  * `express`: Framework para criação de APIs Node.js.
* **Estrutura de arquivos:**
  * `src/index.mjs`: Arquivo principal da aplicação.
* **Scripts:**
  * `start:dev`: Inicia o servidor em modo desenvolvimento.
  * `start`: Inicia o servidor em modo produção.

### Requisições HTTP

#### GET
* **Boas práticas:** Prefixar endpoints com `/api`.
* **Parâmetros de rota:**
  * Utilizados para identificar recursos específicos (e.g., `/api/users/:id`).
  * Acessados via `req.params`.
* **Parâmetros de query:**
  * Enviados na URL (e.g., `/api/users?page=2&limit=10`).
  * Acessados via `req.query`.

#### POST
* **Criação de recursos:** Utilizado para criar novos registros.
* **Parse do body:** Necessário para obter os dados enviados no corpo da requisição.
* **Geração de IDs:** Incrementa a última ID existente para criar uma nova.

#### PUT
* **Atualização completa de recursos:** Substitui todos os dados de um recurso.
* **Validação de ID:** Verifica se o ID é válido e se o recurso existe.

#### PATCH
* **Atualização parcial de recursos:** Atualiza apenas os campos especificados.
* **Validação:** Similar ao PUT.

#### DELETE
* **Remoção de recursos:** Remove um recurso específico.
* **Validação:** Similar ao PUT e PATCH.

### Middleware
* **Funções intermediárias:** Executadas antes dos handlers de rota.
* **Personalização:** Podem ser utilizadas para realizar tarefas como autenticação, autorização, validação, etc.
* **`findUserIndex`:** Middleware para encontrar o índice de um usuário no array de usuários.

### Validação
* **`express-validator`:** Biblioteca para validação de dados de requisições.
* **`query` e `body`:** Funções para validar dados de query e corpo da requisição.
* **`validationResult`:** Objeto que contém os resultados da validação.

### Rotas
* **`Router`:** Objeto do Express para organizar rotas.
* **Organização:** Agrupa rotas relacionadas em módulos separados.

### Cookies
* **`cookie-parser`:** Middleware para manipular cookies.
* **Armazenamento de informações:** Utilizados para manter estado entre requisições.

**Observações:**

* **Mais detalhes:** Para cada tópico, adicione mais detalhes sobre implementação, exemplos e considerações.
* **Diagrama:** Um diagrama de sequência ou UML pode ajudar a visualizar o fluxo da aplicação.
* **Códigos de exemplo:** Inclua snippets de código relevantes para ilustrar os conceitos.
* **Erros e exceções:** Documente os possíveis erros e como eles são tratados.
* **Autenticação e autorização:** Se aplicável, descreva como a API lida com autenticação e autorização.

**Exemplo de um endpoint com mais detalhes:**

```javascript
// src/routes/users.js
const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

// Rota para obter todos os usuários
router.get('/', getUsers);

// Rota para obter um usuário por ID
router.get('/:id', getUserById);

// Rota para criar um novo usuário
router.post('/', createUser);

module.exports = router;

