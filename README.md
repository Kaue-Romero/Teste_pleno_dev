<img width="857" height="500" alt="image" src="https://github.com/user-attachments/assets/fe422005-f769-487b-9dbc-e15ecca84dbc" />

# 🗂️ Gerenciador de Tarefas

Este projeto é uma aplicação de gerenciamento de tarefas full-stack, desenvolvida como parte de um teste técnico. Ele permite criar, listar, atualizar e excluir tarefas, com um backend em PHP, um frontend em React (com Vite) e um ambiente Docker para fácil configuração e execução.

---

## 📋 Descrição do Projeto

A aplicação consiste em uma API RESTful desenvolvida em PHP e uma interface de usuário construída com React.

- Banco de Dados: MySQL  
- Arquitetura Backend: Padrão DTO + Service/Interface, garantindo baixo acoplamento e alta coesão.  
- Frontend: React com Vite, comunicação via Axios (AJAX) para interagir com a API.

---

## ⚙️ Requisitos Técnicos

Tecnologia: Backend (PHP 7.4+)
- POST /tasks – Criar nova tarefa  
- GET /tasks – Listar tarefas  
- PUT /tasks/:id – Atualizar tarefa  
- DELETE /tasks/:id – Excluir tarefa  
- Campos da Tarefa: id, title, description, status (pendente, em andamento, concluída), created_at, updated_at  
- Banco de Dados: MySQL

Tecnologia: Frontend (React + Vite)
- Interface Responsiva  
- Tabela de Tarefas  
- Formulário de Criação/Edição  
- Botão de Excluir  
- Botões de Status: Concluir / Reabrir  
- API via Axios

Tecnologia: Docker
- Containers: PHP, Apache/Nginx, MySQL  
- docker-compose.yml para orquestração  
- Executado em: http://localhost:9000

---

## 🚀 Instruções para Rodar o Projeto

**1. Pré-requisitos**  
Instale **Docker** e **Docker Compose**.

**2. Clone o repositório**  
Comandos: 
```bash 
git clone [URL_DO_SEU_REPOSITORIO]  
cd [NOME_DO_SEU_REPOSITORIO]
```

**3. Coloque as credenciais do banco no .env**
```bash
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret
```

**3. Suba os containers**  
Comando:  
```bash
docker-compose up --build -d
```
!SUPER IMPORTANTE: caso for a primeira vez rodando um container de Mysql espere até que o container suba por completo e reinice a stack!

**4. Acesse a aplicação**  
URL: http://localhost

---

## 🧪 Instruções para Rodar os Testes

1. Acesse o container do PHP:
docker exec -it php bash

2. Execute os testes:
php artisan test

---

## 🌟 Diferenciais Implementados

- Arquitetura Limpa: Uso de DTOs e Service/Interface  
- Testes Automatizados: Cobertura com php artisan test  
- Frontend Moderno: React + Vite + Axios  
- Ambiente Dockerizado: docker-compose para configuração  
- Interface Responsiva: Layout adaptável
