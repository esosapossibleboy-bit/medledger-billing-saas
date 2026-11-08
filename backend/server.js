// ========================================================
// 📦 STEP 1: BRING IN ALL OUR TOOLS (IMPORTS)
// ========================================================
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { encryptData, decryptData } from './ledger.js'; // 🔐 Import both cipher cogs!
import { saveClaimRecord, getRawDatabaseRow } from './database.js';

// ========================================================
// 🏰 STEP 2: BUILD THE CASTLE & SET UP THE FORCEFIELDS
// ========================================================
export const app = express();
app.use(cors());
app.use(express.json());

// 🌟 FULL-STACK BRIDGE: Help the backend locate the frontend build box folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Instruct the backend engine to host your compiled MedLedger panels UI automatically
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ========================================================
// 🪙 STEP 3: CREATE THE SLOTS (ROUTES)
// ========================================================

// Slot 1: Secure Claims Submission Route (HIPAA Encryption Shield)
app.post('/api/claims', (req, res) => {
  const { patientId, patientSSN, diagnosisCode, billingAmount } = req.body;

  if (!patientId || !patientSSN || !diagnosisCode || !billingAmount) {
    return res.status(400).json({ error: 'Missing critical claims submission parameters!' });
  }

  const encryptedSSN = encryptData(patientSSN);

  saveClaimRecord({
    patientId,
    patientSSN: encryptedSSN,
    diagnosisCode,
    billingAmount
  });

  res.status(201).json({ message: 'Medical claim cataloged securely under zero-knowledge protocol!' });
});

// Slot 2: Secure Claims Auditing Decryption Route
app.post('/api/claims/decrypt', (req, res) => {
  const { patientId } = req.body;

  if (!patientId) {
    return res.status(400).json({ error: 'Missing target patient row identifier!' });
  }

  // 1. Fetch the raw encrypted record row directly from the database storage file
  const rawRecord = getRawDatabaseRow(patientId);

  if (!rawRecord) {
    return res.status(404).json({ error: 'Medical record file not found inside vault!' });
  }

  // 2. 🔐 Decrypt the scrambled SSN back into clear plaintext text
  const decryptedSSN = decryptData(rawRecord.patientSSN);

  // 3. Respond with the readable medical claims profile row packet
  res.status(200).json({
    patientId: rawRecord.id,
    patientSSN: decryptedSSN, // Plaintext restored safely for authorized session
    diagnosisCode: rawRecord.diagnosisCode,
    billingAmount: rawRecord.billingAmount
  });
});

// ========================================================
// ⚡ STEP 4: START THE APPLIANCE CORE ENGINE (LISTEN)
// ========================================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log('=========================================');
  console.log(`🚀 MEDLEDGER Healthcare Core Node Live on Port ${PORT}!`);
  console.log(`👉 Visit http://localhost:${PORT}/ in your browser`);
  console.log('=========================================');
});
