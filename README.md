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

Na rota /login é possível realizar um login de usuário, seja ele administrador ou lojista, para fins de desenvolvimento e testes fazer o primeiro login com o usuário abaixo.
```
POST http://localhost:3000/login
```
```json
{
  "name": "admin",
  "password": "admin"
}
```
Essa rota retorna um token, que será usado nas próximas requisições, copie ele, agora que você já está logado como administrador é possível cadastar um dono de loja, pela rota abaixo.
```
POST http://localhost:3000/users/owner
```
```json
{
  "name": "José da Silva",
  "password": "123456789"
}
```
Na rota acima é possível cadastrar um dono de loja, para isso copie o token utilizado na rota anterior, no header da requisição, com a chave <strong>authorization</strong> a rota aceita um corpo com nome e password que deseja ser criado, <strong>Importante:</strong> a senha é criptografada e salva no banco.

Nas rotas de ingredientes tem o CRUD dos ingredientes conforme solicitado.

Rota para cadastrar ingrediente, segue modelo do corpo aceito.
<strong>Importante:</strong> em todas rotas é necessário ser um dono ou administrador para cadastrar, deletar, modificar ou ler os ingredientes.

Não é possível cadastrar ingrediente repetido.
```
POST http://localhost:3000/ingredient/register
```

```json
{
	"name": "Açucar",
	"unitOfMeasurement": "kg",
	"unitPrice": 20
}
```
Na rota de modificar ingrediente é necessário passar via request query, na chave <strong>name</strong> o nome de ingrediente que deseja ser alterado, o corpo da requisição é o mesmo da rota anterior.
```
PUT http://localhost:3000/ingredient/update
```

```json
{
	"name": "Leite",
	"unitOfMeasurement": "kg",
	"unitPrice": 20
}
```
Rota deletar ingrediente é necessário passar como request query o nome do ingrediente.
```
DELETE http://localhost:3000/ingredient/delete
```
```
Request query
name = "leite"
```
Rota de cadastrar quantidade de ingrediente no estoque.
Nessa rota é possível cadastrar a quantidade de cada ingrediente, só é possível cadastrar uma quantidade de estoque de um ingrediente existente.
```
POST http://localhost:3000/ingredient/stock
```
```json
{
	"name": "Frango",
	"quantity": 60
}
```

### Rotas de produtos

Rota de cadastrar produto:
Nessa rota é possível cadastrar um produto e um ponto importante é que somente é possível cadastar o produto se os ingredientes existirem no banco de dados, veja rota e corpo da requisição aceita pela requisição.
```
POST http://localhost:3000/product/create
```
```json
{
	"name": "Bolo",
	"price": 25,
	"ingredients": [
		{
		  "name": "Farinha"
		},
		{
		  "name": "Café em pó"
		}
	]
}
```
Rota de cadastrar imagem no produto:
Nessa rota é possível cadastrar uma imagem ao produto, SOMENTE são aceitos arquivos png e jpg, nessa rota é aceito um arquivo multipart com a chave "image".

```
POST http://localhost:3000/product/image
```

Rota de mostrar todos produtos:
Nessa rota é possível ver todos produtos cadastrados e a soma de seus respectivos ingredientes.
O retorn é o seguinte:
```
GET http://localhost:3000/product/getAllProduct
```
```json
[
	{
	  "name": "Torta",
		"price": 25,
		"ingredients": [
			{
			  "name": "Frango",
			  "unitOfMeasurement": "kg",
			  "unitPrice": 20
			},
			{
			  "name": "Requeijão",
			  "unitOfMeasurement": "kg",
			  "unitPrice": 20
			}
		],
	  "stock_ingredient": [
			{
			  "name": "Frango",
			  "quantity": 20
			}
		],
	  "totalPrice": 40
	}
]
```
## 📦 Desenvolvimento

No desenvolvimento da API foi utilizada da arquitetura MSC, Models, Services, Controller, no service estão as regras de negócio, controller estão as requisições.

Para o banco de dados foi utilizado o MongoDB.

Para o setup de testes foram utilizadas algumas bibliotecas como, jest, mocha, chai, mongo-memory-server entre outras.

Para confecção da API foi utilizado do framework Express e Node.js com TypeScript.

Para padronização e qualidade de código foi utilizado o ESLint e o editorconfig.

## 🛠️ Construído com

* [TypeScript](https://www.typescriptlang.org/) - Linguagem
* [JavaScript](javascript.com) - Linguagem
* [MongoDB](https://www.mongodb.com/) - Banco de Dados
* [Express](https://expressjs.com/pt-br/) - Criação API
* [Node.js](https://nodejs.org/en/) - Criação API
* [Docker](https://nodejs.org/en/) - Container MongoDB
* [ESLint](https://eslint.org/) - Padronização e qualidade de código
* [Jest](https://jestjs.io/pt-BR/) - Framework de Testes
* [JsonWebToken](https://jwt.io/) - Ferramenta de auth
* [Joi](https://joi.dev/api/?v=17.6.0) - Validações das informações requests.
