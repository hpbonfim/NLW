  <h1 align="center">Next Level Week #1 - Projeto Ecoleta ♻️</h1>
  <p align="center">
  <a href="https://github.com/hpbonfim/NLW#readme">
    <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"/>
  </a>

  <a href="https://github.com/hpbonfim/NLW#readme">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/hpbonfim/NLW"/>
  </a>

  <a href="https://github.com/hpbonfim/NLW#readme">
    <img alt="size" src="https://img.shields.io/github/repo-size/hpbonfim/NLW"/>
  </a>

  <a href="https://github.com/hpbonfim/NLW/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/hpbonfim/NLW">
  </a>

  <a href="https://github.com/hpbonfim/NLW#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="https://github.com/hpbonfim/NLW#readme" />
  </a>

  <a href="https://github.com/hpbonfim/NLW/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="https://github.com/hpbonfim/NLW#readme" />
  </a>
</p>

|Tecnologias utilizadas  |
|---------|
|TypeScript     |
|React     |
|React Native    |
|Node v12.17.0     |
|npm  6.14.4     |

### Criação do Backend

``` 
cd backend
npm init -y 
npm install express
npm install typescript @types/express ts-node ts-node-dev -D
npx tsc --init
```

### Criação do Migration Sqlite

``` 
npx knex migrate:latest --knexfile knexfile.ts migrate:latest
```

### Criação do Frontend

``` 
npx create-react-app frontend --template=typescript 
```

### Iniciar o Backend { 3 versões }

``` 
$ npx ts-node src/server.ts 
```

``` 
$ npx ts-node-dev src/server.ts (Hotdeploy) 
```

``` 
$ npm run dev 
```

### Iniciar o Frontend

``` 
$ npm start
```

### API externas utilizadas
[Nominatim - reverse search map address](https://nominatim.org/release-docs/develop/api/Reverse/)

[Nominatim - Search map address](https://nominatim.org/release-docs/develop/api/Search/)

[IBGE - Dados diversos](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-_)

[ViaCep - Consulta de CEP's](https://viacep.com.br/)
