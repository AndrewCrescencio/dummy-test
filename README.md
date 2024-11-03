<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Dummy test</h1>
</div>

<details>
  <summary>Índice</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
    </li>
    <li>
      <a href="#clonando-o-projeto">Clonando o Projeto</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
      </ul>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <ul>
        <li><a href="#development-server">Development Server</a></li>
        <li><a href="#production">Production</a></li>
      </ul>
    </li>
  </ol>
</details>

## Sobre o projeto

[![Preview][product-screenshot]]()

Aplicação feita usando os dados da API [DummyJSON](https://dummyjson.com/).

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Clonando o Projeto

### Pré-requisitos

- npm

<br/>

Clone o repositório

```bash
git clone https://github.com/AndrewCrescencio/dummy-test.git
```

Crie um arquivo .env (.env.example como exemplo)

```env
    API_BASE_URL=https://dummyjson.com
    API_VIA_CEP_URL=https://viacep.com.br/ws
```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Setup

Instale as dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Development Server

Inicie o servidor de desenvolvimento em `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Production

Versão para produção:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

[product-screenshot]: /public/preview.png
