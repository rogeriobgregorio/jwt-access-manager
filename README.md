# JWT Access Manager
[![Status](https://img.shields.io/badge/Status-Concluído-brightgreen.svg)](https://github.com/seu-usuario/seu-projeto)

**JWT Access Manager** é uma API RESTful desenvolvida com [NestJS](https://nestjs.com/) para cadastro, autenticação e gerenciamento de usuários com base em tokens JWT. O sistema implementa controle de acesso baseado em perfis de usuário (administrador e usuário comum), seguindo boas práticas de arquitetura e segurança.

---

## 📌 Visão Geral

O sistema possui as seguintes características principais:

* Cadastro de usuários com validação de senha.
* Autenticação e geração de tokens JWT.
* Autorização baseada em perfil de usuário (admin e usuário comum).
* CRUD completo para administradores e acesso restrito para usuários comuns.
* Logs de atividades e tratamento padronizado de exceções.
* Camadas bem definidas: Controllers, Services, Repositories, DTOs e Entities.
* ORM Prisma com suporte a MySQL (padrão) e PostgreSQL (alternativo).
* Testes unitários com Jest.

---

## ⚙️ Tecnologias Utilizadas

* **Node.js**
* **NestJS**
* **Prisma ORM**
* **MySQL**
* **JWT**
* **Bcrypt**
* **Jest**
* **dotenv**
* **Docker**

---

## 🧩 Funcionalidades

### 👤 Cadastro de Usuário

* Nome, e-mail e senha (com validação de complexidade).
* Senhas criptografadas com Bcrypt.

### 🔐 Autenticação

* Login com e-mail e senha.
* Geração de token JWT contendo o papel (admin ou comum).

### 🛡️ Autorização

* Permissões baseadas em perfil:

  * **Administrador**: pode gerenciar todos os usuários.
  * **Usuário comum**: pode acessar e modificar apenas seu próprio perfil.

### 🧾 Logs

* Tentativas de login (sucesso e falha).
* Ações de criação, atualização e exclusão.
* Erros não tratados.

### ⚠️ Tratamento de Erros

* Mensagens padronizadas com código, descrição e timestamp.
* Diferenciação entre erros de autenticação, validação e sistema.

---

## 📁 Estrutura de Pastas

```
src/
├── auth/
├── users/
├── common/
│   ├── dto/
│   ├── exceptions/
│   └── guards/
├── config/
├── prisma/
└── main.ts
```

---

## 🔄 Endpoints Principais

| Método | Rota             | Acesso        | Descrição                |
| ------ | ---------------- | ------------- | ------------------------ |
| POST   | `/auth/register` | Público       | Cadastro de novo usuário |
| POST   | `/auth/login`    | Público       | Login com e-mail e senha |
| GET    | `/users`         | Admin         | Listar todos os usuários |
| GET    | `/users/:id`     | Admin         | Buscar usuário por ID    |
| PATCH  | `/users/:id`     | Admin ou Dono | Atualizar usuário        |
| DELETE | `/users/:id`     | Admin ou Dono | Excluir usuário          |
| GET    | `/users/me`      | Autenticado   | Ver seu próprio perfil   |

---

## 🧪 Testes

* Framework: **Jest** (nativo do NestJS)
* Cobertura de:

  * Serviços (regras de negócio)
  * Validações de dados
  * Autenticação e autorização

---

## 🔧 Configuração via `.env`

Exemplo de variáveis:

```env
DATABASE_URL=mysql://user:password@localhost:3306/dbname
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
DB_TYPE=mysql
PORT=3000
```

---

## 🚀 Como Executar o Projeto (sem Docker)

### 1. Clonar o repositório

```bash
git clone https://github.com/rogeriobgregorio/jwt-access-manager.git
cd jwt-access-manager
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` com base no exemplo fornecido (`.env.example`).

### 4. Gerar os arquivos do Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Iniciar a aplicação

```bash
npm run start:dev
```

---

## 🚀 Como Executar Localmente com Docker

### 1. Pré-requisitos

* Docker e Docker Compose instalados

### 2. Clonar o projeto

```bash
git clone https://github.com/rogeriobgregorio/jwt-access-manager.git
cd jwt-access-manager
```

### 3. Criar o arquivo `.env`

Crie um `.env` na raiz com o conteúdo:

```env
DATABASE_URL=mysql://root:root@db:3306/nestdb
JWT_SECRET=supersecreta
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

> ⚠️ O `DATABASE_URL` deve coincidir com as configurações do `docker-compose.yml`.

### 4. Subir o ambiente

```bash
sh scripts/dev.sh
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧪 Scripts Disponíveis

| Comando                  | Ação                              |
| ------------------------ | --------------------------------- |
| `sh scripts/dev.sh`      | Sobe o app e banco via Docker     |
| `sh scripts/migrate.sh`  | Executa as migrações do Prisma    |
| `sh scripts/generate.sh` | Gera novamente o client do Prisma |

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

