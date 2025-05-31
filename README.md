
# 🔗 BiteSpeed Identity Reconciliation API

This project implements a REST API for **identity resolution** by reconciling user contacts based on `email` and/or `phoneNumber`. It identifies related contacts and maintains a unified identity structure using a primary-secondary relationship.

---

## 📦 Features

- 🔍 Smart identity linking via email or phone number
- 🧠 Identity resolution logic (as per BiteSpeed assignment)
- 🔗 Creates and links contacts with consistent rules
- 🗃️ Returns all linked identities: primary & secondaries

---

## 📡 API Endpoint

### `POST /identify`

Performs identity resolution for the user based on provided fields.

### ✅ Request Body

```json
{
  "email": "alex@example.com",
  "phoneNumber": "9999999999"
}
```

- `email`: *(optional)* Email address of the contact
- `phoneNumber`: *(optional)* Phone number of the contact

> ⚠️ At least one of `email` or `phoneNumber` is required.

---

### 🔁 Response Body

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["alex@example.com", "alex.1@example.com"],
    "phoneNumbers": ["9999999999", "8888888888"],
    "secondaryContactIds": [2, 3]
  }
}
```

#### Fields Explained:
- `primaryContactId`: ID of the oldest (primary) contact
- `emails`: All unique emails linked to the contact
- `phoneNumbers`: All unique phone numbers linked
- `secondaryContactIds`: All secondary contact IDs pointing to the primary

---

## 🔄 Identity Resolution Logic

| Scenario | Behavior |
|---------|----------|
| No existing contact | Create a new **primary contact** |
| Match by email or phone | Create **secondary contact** and link to oldest matched primary |
| Match by both email and phone | Return existing linkage without creating a new contact |
| Match by email and phone from different primaries | Merge under oldest primary |

---

## 🛠️ Tech Stack

- **Node.js**, **Express.js** – REST API
- **Sequelize ORM** – database operations
- **MySQL / PostgreSQL / MongoDB** – supported databases
- **dotenv** – for environment variables

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bitespeed-identity-reconciliation.git
cd bitespeed-identity-reconciliation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file and add:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=bitespeed_db
DB_DIALECT=mysql   # or postgres / mongodb
```

### 4. Run Migrations (if using Sequelize)

```bash
npx sequelize-cli db:migrate
```

### 5. Start the Server

```bash
npm start
```

> The API will be available at `http://localhost:3000/identify`

---

## 🧪 Sample Scenarios

| Request | Result |
|--------|--------|
| Only new email/phone | New primary created |
| Email match only | Linked to existing primary |
| Phone match only | Linked to existing primary |
| Both email and phone match existing contact | Return existing identity |
| Email and phone match different primaries | Merge under oldest primary |

---

## 📁 Project Structure

```
bitespeed-identity-reconciliation/
│
├── models/              # Sequelize models (Contact)
├── routes/              # API routes (identify.js)
├── controllers/         # Business logic (identifyController.js)
├── config/              # DB config
├── app.js               # Express app setup
├── server.js            # Starts the server
├── .env                 # Environment variables
└── README.md            # Project documentation
```

---

## 👨‍💻 Author

- Richa Gupta
- ✉ richa.lightg@gmail.com
