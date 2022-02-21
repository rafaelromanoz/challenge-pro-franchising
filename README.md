# Code Challenge Pro Franchising

Code challenge para vaga de Back End Developer da Pro Franchising, API feita para controle de estoque, ingredientes, produtos e com autenticação.

## 🚀 Começando

- `https://github.com/rafaelromanoz/challenge-pro-franchising`

### 📋 Pré-requisitos com Docker

O projeto possui um docker-compose configurado para subir um container com MongoDB, se possuir o docker e docker compose rode o seguinte comando:

```
docker-compose up
```

Alterar no arquivo ./src/connection.ts

```
Alterar
const mongodbUrl = 'mongodb://localhost:27017/';
para
const mongodbUrl = 'mongodb://mongo:27017/';
```

Alterar no arquivo ./src/seed/seed.js

```
Alterar
const mongodbUrl = 'mongodb://localhost:27017/';
para
const mongodbUrl = 'mongodb://mongo:27017/';
```


### 📋 Pré-requisitos instalação sem o docker

### 🔧 Instalação

Para executar o projeto retire o .dev do arquivo .env.dev e preencha com a JWT_SECRET necessária.

<strong>Instalação de dependências</strong>

```
npm i ou npm install
```
## Atenção!

Para fins de desenvolvimento e testes na aplicação, é necessário já ter um usuário populado no banco de dados, então foi criado um comando para popular, rode o comando abaixo:
```
npm run seed
```

<strong>Executar os testes</strong>

Foi coberto 98% dos testes das camada Model, Service, Controller, das rotas e funcionalidade de ingredientes, para rodar os testes execute o comando abaixo:

```
npm test
```

## Rotas da aplicação

Para usar a aplicação recomenda-se o Insomnia, na pasta
insomnia-file possui o ambiente configurado com as rotas para usar.

Na rota /user é possível cadastrar um usuário, envie um json no seguinte formato, após o cadastro é gerado um token que com ele é possível fazer depósitos ou transferências. Copie o token e coloque no header 'authorization' das próximas requisições.
```
http://localhost:3000/user
```
```json
{
  "name": "Jose Giovani Oliveira",
  "cpf": "114.684.207-08"
}
```
Para depositar é necessário um CPF válido cadastrado antes e o seguinte JSON no corpo da requisição.
```
http://localhost:3000/account/deposit
```
```json
{
  "cpf": "114.684.207-08",
  "deposit": 3000
}
```
Na rota de transferência entre as contas, como a operação precisa ser atômica respeitando o princípio  ACID (atomic, consistency, isolation, durability) foi utilizada do método transaction do TypeORM, as contas não podem ter valor negativo então só é possível transferir se o usuário possui saldo, e também por questões de regra de negócio não é possível transferir um valor maior que 2000, para transferir dinheiro entre as contas o JSON aceito é nesse padrão:

```
http://localhost:3000/account/transfer
```

```json
{
  "cpfOrigin": "115.987.555-98",
  "quantity":  188,
  "cpfDestiny": "114.684.207-08"
}
```

## 📦 Desenvolvimento

No desenvolvimento da API foi utilizada da arquitetura MSC, Models, Services, Controller, no service estão as regras de negócio, controller estão as requisições.

Para o banco de dados foi utilizado o MySQL e o mapeamento Objeto-Relacional foi utilizado o TypeORM.

Para confecção da API foi utilizado do framework Express e Node.js com TypeScript.

Para padronização e qualidade de código foi utilizado o ESLint e o editorconfig.

## 🛠️ Construído com

* [TypeScript](https://www.typescriptlang.org/) - Linguagem
* [JavaScript](javascript.com) - Linguagem
* [TypeORM](https://typeorm.io/#/) - Mapeamento objeto-relacional
* [MySQL](https://www.mysql.com/) - Banco de Dados
* [Express](https://expressjs.com/pt-br/) - Criação API
* [Node.js](https://nodejs.org/en/) - Criação API
* [Docker](https://nodejs.org/en/) - Container MySQL
* [ESLint](https://eslint.org/) - Padronização e qualidade de código
* [Jest](https://jestjs.io/pt-BR/) - Framework de Testes
* [auth](https://jwt.io/) - Ferramenta de auth
* [Joi](https://joi.dev/api/?v=17.6.0) - Validações das informações requests.
