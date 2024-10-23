# API - Attendance

## Pré-requisitos

- [PNPM](https://pnpm.io/installation)
- [Node.js](https://nodejs.org/en/download/package-manager)

### 1. Crie os arquivos .env necessários

Variáveis de ambiente:

```shell
cp .env.example .env
```

### 2. Instale as dependências

```shell
pnpm i
```

### 3. Inicie o conteiner do banco de dados

```shell
docker compose up -d
```

### 4. Execute a aplicação em ambiente local

```shell
pnpm run dev
```
