# 🛡️ MedLedger Core Technical Architecture

This architectural blueprint outlines the underlying HIPAA compliance protocols, cryptographic design models, and local deployment loops for the MedLedger billing network core node.

---

## 🔒 Cryptographic Security Model (Zero-Knowledge Architecture)

To comply with federal **HIPAA Title II Privacy and Security Rules**, MedLedger enforces an absolute separation of plaintext Protected Health Information (PHI) from the persistent storage database layer.

### 1. Field-Level Symmetric Encryption Pipeline
Highly sensitive patient indicators (such as Social Security Numbers) are automatically intercepted at the API gateway edge. Plaintext variables are instantly shredded and transformed into randomized cryptographic hex blocks prior to database row ingestion.

* **Cipher Routine:** Advanced Encryption Standard (AES) running a 256-bit symmetric key block in Cipher Block Chaining (CBC) mode (`aes-256-cbc`).
* **Entropy Management:** A unique, pseudo-random 16-byte Initialization Vector (IV) is generated dynamically for *every single database entry* to prevent pattern matching attacks.
* **Storage Handshake:** The IV and the encrypted ciphertext are combined securely into a standard token payload delimiter block (`iv:ciphertext`) before hitting the drive.

[ Inbound Claim Body ]
│
▼ (Captured at API Gate)
[ AES-256-CBC Cipher Engine ] ◄── (Master Secret Key + Unique 16-Byte IV)
│
▼ (Scrambled Text Block Generated)
[ LokiJS Document DB ] ──► (Locked inside medledgerVault.db file)

### 2. Sealed Audit Decryption Handshake
Decryption keys are held in server runtime memory and are completely inaccessible from the outer client layer. Authorized auditing profiles query an ID token, triggering an on-the-fly decryption routine that feeds cleartext only to verified dashboard panels.

---

## 🕹️ Local Deployment & Execution Instructions

Follow these structural steps to ignite the full-stack compiled production engine on your machine:

### 1. Pre-requisites & Workspace Setup
Ensure you have [Node.js](https://nodejs.org) installed, open a command hub terminal, and step inside the master directory:
```bash
cd C:\Users\Esosa\Documents\medledger-billing-saas
```

### 2. Launch the High-Security Infrastructure
Navigate to the server core, initialize the operational node module dependencies, and activate the power grid listen switch:
```bash
cd backend
npm install
npm start
```
*The Express security gates are active and listening attentively on Port **`3000`**!*

### 3. Accessing the Operational Dashboard Node
Open your internet browser and navigate directly to your single-port full-stack architecture portal:
👉 **http://localhost:3000/**

* **Intake Execution:** Use the **Medical Claims Intake** panel on the left to submit a patient claimed asset form. The console will instantly run the AES cipher and seal it.
* **Audit Execution:** Use the **Secure Claims Audit Inspector** panel on the right to input the target patient identifier and trigger the server runtime decryption handshake.