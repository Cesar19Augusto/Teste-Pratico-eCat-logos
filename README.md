
<h1 align="center" style="font-weight: bold;">Teste Pratico eCatalogos</h1>

<p align="center">
 • <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#colab">Collaborators</a> •
</p>

<p align="center">
    <b>Este repositório apresenta a API desenvolvida para o teste prático da aplicação de compras da eCatálogos. O projeto foi construído com foco em boas práticas de desenvolvimento, arquitetura em camadas, aplicação de regras de negócio complexas e uso de tecnologias modernas como Node.js, TypeScript e Prisma ORM.</b>
</p>
<!--
<p align="center">
     <a href="https://teste-pratico-tropa-digital.vercel.app/login">📱 Visit this Project</a>
</p>
-->
<!--
<h2 id="layout">🎨 Layout</h2>
<p align="center"> 
    <img src="../.github/example.png" alt="Image Example" width="400px">
    <img src="../.github/example.png" alt="Image Example" width="400px">
</p>
-->

<h2 id="technologies">💻 Technologies</h2>

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-%23000000.svg?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<h2 id="started">🚀 Getting started</h2>

### 🧪 Rodando com Docker

1. Clone este repositório:
```bash
git clone https://github.com/Cesar19Augusto/Teste-Pratico-eCatalogo
cd Teste-Pratico-eCat-logos
```
2. Configure o arquivo .env.
 ```bash
   DATABASE_URL=mysql://root:root@localhost:3307/eCatalogoteste"
   PORT=3000
```
3. Suba os containers com Docker Compose:
```bash
docker-compose up --build
```
<h2 id="routes">📌 Routes</h2>

| Método | Rota            | Descrição                                             |
| ------ | --------------- | ----------------------------------------------------- |
| GET    | `/products`     | Listar produtos com filtros e paginação               |
| GET    | `/products/:id` | Buscar detalhes de um produto                         |
| POST   | `/products`     | Criar novo produto com variantes e skus               |
| PUT    | `/products/:id` | Atualizar produto (inclusive variantes/skus)          |
| DELETE | `/products/:id` | Soft delete (marca campo `deleted_at` com data atual) |

<h2 id="colab">🤝 Collaborators</h2>

People who contributed to the construction of this project

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/cesaraugusto875/">
        <img src="https://avatars.githubusercontent.com/u/79229452?s=400&u=76bc95ac47e156acc7c339a7c3f981211c259df5&v=4;" width="100px;" alt="Cesar Augusto Profile Picture"/><br>
        <sub>
          <b>Cesar Augusto</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

