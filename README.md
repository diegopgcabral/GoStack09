<h1 align="center">
<img src="gympoint-frontend/src/assets/logo.png">
</h1>
<h3 align="center">
  Desafio Final para a certificação do bootcamp da RocketSeat
  </h3>
<h2 align="center">
Back-end(Node.js) / Front-end (ReactJs) / Mobile (React Native) - GoStack Bootcamp <a href="https://rocketseat.com.br" target="__blank">Rocketseat</a>
</h2>

## :gear: Back-end

## Instruções

```bash
# clonar o repositório
git clone https://github.com/diegopgcabral/GoStack09.git

# entrar na pasta do projeto
cd gympoint-server

# instalar as dependências
yarn

# criar .env para informar as SUAS variáveis de ambiente
cp .env.example .env

# subir os serviços (postgres, redis)
# Obs. foi utilizado docker para subir as bases (postgres, redis)
docker-compose up -d

# criar um database no postgres com o nome:
gympoint

# criar estrutura do banco de dados Postgres
yarn sequelize db:migrate

# povoar o banco de dados
yarn sequelize db:seed:all

# iniciar o servidor da aplicação
yarn dev
yarn dev:debug

# iniciar a fila de jobs  (outro terminal)
yarn queue

```

## :computer: Front-end

## Instruções

```bash
# entrar na pasta do projeto
cd gympoint-frontend

# instalando as dependências do package.json:
yarn

# iniciar a aplicação web
yarn start
```

## Teste utilizando o browser.

http://localhost:3000

```bash

# credenciais de acesso
user: admin@gympoint.com
password: 123456

user: recepcao@gympoint.com
password: 123456
```

## :iphone: Mobile

```bash
# entrar na pasta do projeto
cd gympoint_mobile

# instalando as dependências do package.json:
yarn

# inicializar App Mobile
react-native start --reset-cache

# instalar App Mobile no emulador (ANDROID)
react-native run-android
```

## Login App Mobile

**_Você precisa criar um novo aluno no projeto Gympoint WEB e logar com o ID que você recebeu pelo email no momento da efetivação da matrícula_**
