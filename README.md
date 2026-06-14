# 🦎 Chameleon Wallpaper

Chameleon Wallpaper é uma aplicação web para gerenciar pastas e imagens e controlar remotamente o **papel de parede do computador**, trocando-o automaticamente em intervalos configuráveis ou manualmente, através de comandos enviados para um agente local instalado no PC.

O projeto é dividido em duas partes:

- **Web App (Next.js + Prisma)**: interface para criar pastas, fazer upload de imagens, configurar dispositivos e controlar a troca do papel de parede.
- **Agente Python (Windows)**: roda em segundo plano no computador, escuta comandos enviados pela aplicação web e aplica o papel de parede no sistema operacional.

> ⚠️ **Importante:** o agente que efetivamente troca o papel de parede **só funciona no Windows**, pois utiliza a biblioteca `winreg` e a API `SystemParametersInfoW` do Windows para alterar o wallpaper. Em outros sistemas operacionais o agente não irá rodar.

---

## 📱 Demonstração

_Veja o projeto rodando em tempo real._

https://github.com/user-attachments/assets/99628fcb-96e2-4cff-b84a-7f78c94dfd3e

**Demonstração completa no YouTube:** https://youtu.be/A-iz9xvwVNo

---

## 🧱 Tecnologias utilizadas

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Prisma](https://www.prisma.io/) (banco de dados PostgreSQL)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Radix UI / shadcn](https://ui.shadcn.com/)
- [Cloudinary](https://cloudinary.com/) (armazenamento de imagens)
- [Jest](https://jestjs.io/) (testes)
- **Python (Flask)** para o agente local de troca de wallpaper no Windows

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- [npm](https://www.npmjs.com/) (ou yarn/pnpm/bun)
- Banco de dados PostgreSQL (pode ser local ou um serviço como Neon, Supabase, etc.)
- Conta no [Cloudinary](https://cloudinary.com/) (para armazenamento das imagens)
- **Windows** + [Python 3](https://www.python.org/) instalado (apenas para rodar o agente que troca o papel de parede)

---

## ⚙️ Configuração do projeto web (Next.js)

1. **Clone o repositório** e entre na pasta do projeto:

   ```bash
   git clone <url-do-repositorio>
   cd Chameleon-Wallpaper-main
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

   > O comando `postinstall` já executa o `prisma generate` automaticamente.

3. **Configure as variáveis de ambiente:**

   Copie o arquivo `.env.example` para `.env` e preencha os valores:

   ```bash
   cp .env.example .env
   ```

   Variáveis necessárias:

   ```env
   DATABASE_URL=
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_SECRET=
   CLOUDINARY_API_KEY=
   NEXT_PUBLIC_PYTHON_AGENT_URL=
   ```

   - `DATABASE_URL`: string de conexão do seu banco PostgreSQL.
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: credenciais da sua conta Cloudinary.
   - `NEXT_PUBLIC_PYTHON_AGENT_URL`: URL onde o agente Python estará rodando (por padrão `http://localhost:5000`).

4. **Execute as migrations do Prisma:**

   ```bash
   npx prisma migrate deploy
   ```

5. **Rode o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🖥️ Agente de Wallpaper (Windows)

Esta é a parte responsável por **efetivamente trocar o papel de parede da máquina**. Ela fica em `python-agent/` e **requer Windows** (usa `winreg` e a API do Windows para alterar o wallpaper via `ctypes`/`SystemParametersInfoW`).

### 1. Instale o Python

Baixe e instale o [Python 3](https://www.python.org/downloads/) (marque a opção "Add Python to PATH" durante a instalação).

### 2. Crie um ambiente virtual e instale as dependências

Abra o **PowerShell** (ou CMD) na pasta `python-agent`:

```powershell
cd python-agent
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure as variáveis de ambiente do agente

Crie um arquivo `.env` dentro de `python-agent/` (mesma pasta do `main.py`) com:

```env
CHAMELEON_APP_URL=http://localhost:3000
CHAMELEON_COMMAND_POLL_SECONDS=5
CHAMELEON_DEVICE_ID=
```

- `CHAMELEON_APP_URL`: URL onde a aplicação Next.js está rodando.
- `CHAMELEON_COMMAND_POLL_SECONDS`: intervalo (em segundos) que o agente verifica novos comandos vindos da web app.
- `CHAMELEON_DEVICE_ID`: ID do dispositivo cadastrado na aplicação web (opcional — se vazio, o agente usa o dispositivo ativo).

### 4. Execute o agente

Com o ambiente virtual ativado, rode:

```powershell
python main.py
```

O agente iniciará um servidor Flask local na porta `5000` e ficará escutando comandos da aplicação web para trocar o wallpaper.

> Os logs de execução são gravados em `python-agent/logs/agent.log`.

### 5. (Opcional) Iniciar o agente automaticamente com o Windows

O projeto inclui scripts PowerShell para facilitar a execução em segundo plano:

- **`start-agent.ps1`**: inicia o agente manualmente usando o Python do ambiente virtual (`.venv`).

  ```powershell
  .\start-agent.ps1
  ```

- **`install-startup-task.ps1`**: cria uma **Tarefa Agendada do Windows** para iniciar o agente automaticamente (em segundo plano, sem janela visível) sempre que o usuário fizer login no Windows.

  ```powershell
  .\install-startup-task.ps1
  ```

  Esse script registra a tarefa "Chameleon Wallpaper Agent" no Agendador de Tarefas do Windows, executando o agente silenciosamente (via `pythonw.exe`) a partir do ambiente virtual `.venv` da pasta `python-agent`.

---

## 🚀 Resumo rápido de execução

| Parte | Onde executar | Comando |
|---|---|---|
| Web App | Qualquer SO (terminal/IDE) | `npm install` → `npm run dev` |
| Agente de Wallpaper | **Somente Windows** (PowerShell/CMD) | `python main.py` (dentro de `python-agent`, com o ambiente virtual ativado) |

---

## 🧪 Testes

Para rodar os testes da aplicação web:

```bash
npm run test
```

Para rodar em modo "watch":

```bash
npm run test:watch
```

---

## 📂 Estrutura geral do projeto

```
Chameleon-Wallpaper-main/
├── prisma/             # Schema e migrations do banco de dados
├── public/             # Arquivos estáticos
├── python-agent/       # Agente Python (Windows) para troca de wallpaper
│   ├── main.py
│   ├── utils.py
│   ├── routes/
│   ├── start-agent.ps1
│   ├── install-startup-task.ps1
│   └── requirements.txt
└── src/
    ├── app/            # Rotas e páginas (App Router do Next.js)
    ├── actions/        # Server actions (folders, images, devices, wallpaper)
    ├── components/      # Componentes de UI
    ├── features/        # Funcionalidades (Images, Devices, Folder Details)
    └── hooks/
```
