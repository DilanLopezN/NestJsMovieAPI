# Movies API

Esta é uma API construída com NestJS, documentada usando Swagger, utilizando Docker para orquestração de contêineres, e com suporte a banco de dados PostgreSQL e Redis.

## Pré-requisitos

- [TypeScript](https://www.typescriptlang.org/)
- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/sua-api.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd sua-api
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

### Configuração do ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário:

```bash
cp .env.example .env
```

## Uso

### Com Docker

1. Inicie os contêineres Docker:

   ```bash
   docker-compose up -d
   ```

2. Acesse a API em [http://localhost:3000](http://localhost:3000)

3. Acesse a documentação Swagger em [http://localhost:3000/api](http://localhost:3000/api)

### Localmente (sem Docker)

1. Certifique-se de que o PostgreSQL e o Redis estejam em execução em sua máquina, ou ajuste as configurações de conexão nos arquivos de configuração (`ormconfig.json` para PostgreSQL e `src/redis/redis.service.ts` para Redis).

2. Inicie a aplicação:

   ```bash
   npm start
   ```


3. Acesse a API em [http://localhost:3000](http://localhost:3000)

4. Acesse a documentação Swagger em [http://localhost:3000/api](http://localhost:3000/api)

## Documentação da API

A documentação da API está disponível via Swagger UI. Você pode acessá-la em [http://localhost:3000/api](http://localhost:3000/api)

## Contribuição

Se você encontrar qualquer problema ou desejar contribuir, sinta-se à vontade para abrir uma issue ou enviar um pull request.


Este projeto está licenciado sob a [Licença MIT](LICENSE)