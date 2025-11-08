# Backend - Sistema de Gestão Financeira

Backend API REST desenvolvido com Node.js, Express, TypeScript e MongoDB.

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com:
```
MONGODB_URI=mongodb+srv://Ja1_vytw:Joao2003vitor@cluster0.kvrcf90.mongodb.net/?appName=Cluster0
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,https://seu-front.vercel.app
```

> Substitua `https://seu-front.vercel.app` pelo domínio real do frontend (por exemplo, o domínio do Vercel). Você pode fornecer múltiplos domínios separados por vírgula.

3. Popule o banco de dados com usuários iniciais:
```bash
npm run seed
```

## Execução

### Modo Desenvolvimento
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### Modo Produção
```bash
npm run build
npm start
```

## Endpoints da API

- `GET /api/financial-data` - Retorna todos os dados financeiros
- `GET /api/transactions` - Lista todas as transações
- `POST /api/transactions` - Cria uma nova transação
- `PUT /api/transactions/:id` - Atualiza uma transação
- `DELETE /api/transactions/:id` - Deleta uma transação

Endpoints similares para:
- `/api/bills` - Contas a pagar
- `/api/credit-cards` - Cartões de crédito
- `/api/investments` - Investimentos
- `/api/recurring-incomes` - Rendas recorrentes
- `/api/installments` - Parcelas
- `/api/due-dates` - Datas de vencimento
- `/api/users` - Usuários

## Estrutura do Projeto

```
Back End/
├── src/
│   ├── config/        # Configurações (database)
│   ├── controllers/   # Lógica de negócio
│   ├── middleware/    # Middlewares (CORS, error handling)
│   ├── models/        # Modelos Mongoose
│   ├── routes/        # Rotas Express
│   ├── scripts/      # Scripts utilitários (seed)
│   ├── types/         # Tipos TypeScript
│   ├── utils/         # Funções utilitárias
│   └── server.ts      # Arquivo principal
├── .env               # Variáveis de ambiente
├── package.json
└── tsconfig.json
```

