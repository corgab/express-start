# 📇 Users API – Express + Prisma + SQLite

Una REST API completa per la gestione di utenti, sviluppata con **Express.js**, **Prisma ORM** e **SQLite**, include validazione con `express-validator.

---

## 🚀 Tecnologie utilizzate

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [express-validator](https://express-validator.github.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📁 Struttura del progetto

```
src/
├── routes/              # Definizione delle rotte
│   └── userRoutes.js
├── utils/               # Utilità (es. Prisma client)
│   └── prisma.js
├── index.js             # Entry point principale
prisma/
├── schema.prisma        # Schema del database
├── migrations/          # Migrazioni generate da Prisma
.env                     # Variabili d'ambiente
```

---

## ⚙️ Requisiti

- Node.js 18+
- npm (Node Package Manager)

---

## 🛠️ Installazione

1. **Clona il progetto**

```bash
git clone https://github.com/tuo-utente/user-api-express.git
cd user-api-express
```

2. **Installa le dipendenze**

```bash
npm install
```

3. **Configura l'ambiente**

Crea un file `.env` nella root del progetto con il seguente contenuto:

```
DATABASE_URL="file:./dev.db"
PORT=3000
```

4. **Inizializza il database**

```bash
npx prisma migrate dev --name init
```

5. **Avvia il server**

```bash
npm run dev
```

---

## 🔄 Endpoints disponibili

| Metodo | Rotta        | Descrizione                  |
| ------ | ------------ | ---------------------------- |
| GET    | `/users`     | Lista di tutti gli utenti    |
| GET    | `/users/:id` | Ottieni un utente per ID     |
| POST   | `/users`     | Crea un nuovo utente         |
| PUT    | `/users/:id` | Modifica un utente esistente |
| DELETE | `/users/:id` | Elimina un utente            |

---

## 🌟 Credits

Realizzato con ❤️ da [corgab](https://github.com/corgab)
