# 🏥 MedLedger Clearinghouse SaaS 💎

Welcome to **MedLedger**, an industrial-scale, **HIPAA-Compliant Automated Medical Billing & Claims Clearinghouse SaaS**. Designed for high-volume healthcare networks and hospitals, it automatically sanitizes, encrypts, validates, and pre-screens insurance billing entries to eliminate manual audit rejections and optimize financial revenue cycles.

---

## 📂 Project Directory Structure

```text
medledger-billing-saas/
├── backend/                        # 🏰 High-Security Ingestion Node & API Core
│   ├── node_modules/               # Installed server tool blocks
│   ├── aiCleanser.js               # Year 3 Automated AI Rules-Cleansing Matrix Module
│   ├── database.js                 # Permanent Medical Vault Ledger (LokiJS)
│   ├── ediCompiler.js              # Year 2 Electronic Data Interchange Syntax Compiler
│   ├── ledger.js                   # AES-256 Symmetric Cipher Encryption Matrix
│   ├── aiCleanser.test.js          # Automated AI Rules Screening Tests
│   ├── edi.test.js                 # Automated EDI Syntax Compilation Tests
│   ├── medledger.test.js           # Automated HIPAA Compliance Ingestion Tests
│   ├── server.js                   # Express API Gateway Ports & Static Asset Bridge
│   ├── package.json                # Backend checklist configuration manifest
│   └── medledgerVault.db           # Active hard drive database file container
│
└── frontend/                       # 🎨 Medical Coder Desk Interface Panel
    ├── src/
    │   ├── App.jsx                 # Master Workspace Dashboard Screen Controller
    │   ├── App.test.jsx            # Frontend Component Interaction Tests
    │   ├── ClaimAuditor.jsx        # Decoupled Claims Audit Inspector Component (Year 1)
    │   ├── EdiConsoleBench.jsx     # Decoupled EDI Clearinghouse Console Component (Year 2)
    │   ├── AiAnalyticsMonitor.jsx  # Decoupled AI Integrity Report Component (Year 3)
    │   ├── setupTests.js           # Browser Simulation Dictionary Definitions
    │   └── main.jsx
    ├── dist/                       # Compressed high-performance production build assets
    ├── package.json                # Frontend checklist configuration manifest
    └── vite.config.js              # Vite browser engine testing environment settings
```

---

## 🗺️ 3-Year Engineering Product Roadmap

MedLedger is engineered to scale across three major enterprise development milestones:
* **Year 1 (Active Core Baseline):** High-security ingestion node featuring Zero-Knowledge field encryption (`aes-256-cbc`) and decoupled Auditor decryption handshakes.
* **Year 2 (Scaling Matrix):** Extensible Rules Validation Engine & Electronic Data Interchange (EDI X12 837) transaction compilation blocks to output standard ANSI clearinghouse data.
* **Year 3 (Enterprise Analytics Node):** Machine Learning Claim Cleansing Matrix to pre-scan compiled EDI transactions for medical code conflicts and output real-time Claim Health Grades.

---

## 🛡️ Multi-Layer Security Architecture

### 1. HIPAA Field-Level Symmetric Encryption Pipeline
Highly sensitive patient indicators (such as Social Security Numbers) are automatically intercepted at the API gateway edge. Plaintext variables are instantly shredded and transformed into randomized cryptographic hex blocks using an `aes-256-cbc` routine combined with unique, pseudo-random 16-byte Initialization Vectors (IV) before hitting the drive.

### 2. Electronic Data Interchange (EDI X12) Compilation Engine
Valid claims are automatically mapped into professional, delimiter-separated clearinghouse lines (e.g., parsing fields into compact `CLM` and `HI` segments terminated by a tilde `~`), ensuring 100% compliance with industry-standard electronic data formats.

### 3. AI Rules-Cleansing Linter Matrix
Pre-screens transactions for clinical coding conflicts and high-value anomalies, generating an automated **Claim Health Rating** and **Denial Risk Index** to mitigate insurance rejections prior to clearinghouse dispatching.

---

## 🐕 Automated Defenses (Test Scoreboard)

The entire dual-layer application features absolute automated test coverage using **Vitest**, **Supertest**, and **JSDOM** browser simulation environments to ensure regression-free stability:
* `backend/medledger.test.js`: Validates zero-knowledge data destruction and authorized decryption handshakes.
* `backend/edi.test.js`: Verifies strict compliance constraints and structural X12 block mapping.
* `backend/aiCleanser.test.js`: Tests algorithmic fraud detection and grading indexes.
* `frontend/src/App.test.jsx`: Simulates browser event loops, label bindings, and child-to-parent prop hooks communication.

---

## 🕹️ Local Deployment & Execution Instructions

Follow these structural steps to ignite the compiled production engine on your machine:

### 1. Download Workspace Folder
Open a terminal panel window and step inside the master directory:
```bash
cd medledger-billing-saas
```

### 2. Ignite the Server Core Network
Move into the server core directory, initialize the operational node module dependencies, and activate the power grid listen switch:
```bash
cd backend
npm install
npm start
```
*The Express full-stack security gates are active, compiled, and listening attentively on Port **`3000`**!*

### 3. Accessing the Operational Dashboard Node
Open your internet browser and navigate directly to your single-port full-stack portal address:
👉 **http://localhost:3000/**

* **Intake Execution (Year 1):** Submit a patient claim. The engine will instantly run the AES cipher, shred plaintext indicators, and lock it inside the local ledger file.
* **Audit Execution (Year 1):** Input a target patient identifier inside the audit inspector to trigger the server runtime decryption handshake.
* **EDI Compilation (Year 2):** Input a target patient identifier inside the clearinghouse console to view the compiled ANSI X12 837 segment line code on the monitor.
* **AI Compliance Scan (Year 3):** Click the pre-scan trigger to prompt the intelligent rules matrix linter to score your claim and run an automatic risk evaluation checklist.
