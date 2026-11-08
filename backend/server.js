// ========================================================
// 📦 STEP 1: BRING IN ALL OUR TOOLS (IMPORTS)
// ========================================================
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { encryptData, decryptData } from './ledger.js';
import { saveClaimRecord, getRawDatabaseRow } from './database.js';
import { compileToEDIX12 } from './ediCompiler.js';
import { screenAndCleanClaim } from './aiCleanser.js'; // 🧠 NEW: Bring in our Year 3 AI module!

// ========================================================
// 🏰 STEP 2: BUILD THE CASTLE & SET UP THE FORCEFIELDS
// ========================================================
export const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the compiled frontend view panel assets automatically from the unified port
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ========================================================
// 🪙 STEP 3: CREATE THE SLOTS (ROUTES)
// ========================================================

// Slot 1: Secure Claims Submission Route (HIPAA Encryption Shield)
app.post('/api/claims', (req, res) => {
  const { patientId, patientSSN, diagnosisCode, billingAmount } = req.body;
  if (!patientId || !patientSSN || !diagnosisCode || !billingAmount) {
    return res.status(400).json({ error: 'Missing critical claims parameters!' });
  }
  const encryptedSSN = encryptData(patientSSN);
  saveClaimRecord({ patientId, patientSSN: encryptedSSN, diagnosisCode, billingAmount });
  res.status(201).json({ message: 'Medical claim cataloged securely under zero-knowledge protocol!' });
});

// Slot 2: Secure Claims Auditing Decryption Route
app.post('/api/claims/decrypt', (req, res) => {
  const { patientId } = req.body;
  if (!patientId) return res.status(400).json({ error: 'Missing target patient row identifier!' });

  const rawRecord = getRawDatabaseRow(patientId);
  if (!rawRecord) return res.status(404).json({ error: 'Medical record file not found inside vault!' });

  const decryptedSSN = decryptData(rawRecord.patientSSN);
  res.status(200).json({
    patientId: rawRecord.id,
    patientSSN: decryptedSSN,
    diagnosisCode: rawRecord.diagnosisCode,
    billingAmount: rawRecord.billingAmount
  });
});

// Slot 3: Year 2 EDI X12 Ingestion Portal Gate
app.post('/api/claims/compile-edi', (req, res) => {
  const { patientId } = req.body;
  if (!patientId) return res.status(400).json({ error: 'Missing target patient row identifier!' });

  const rawRecord = getRawDatabaseRow(patientId);
  if (!rawRecord) return res.status(404).json({ error: 'Medical record file not found inside vault!' });

  const compilationResult = compileToEDIX12({
    patientId: rawRecord.id,
    billingAmount: rawRecord.billingAmount,
    diagnosisCode: rawRecord.diagnosisCode
  });

  if (!compilationResult.success) return res.status(422).json({ error: compilationResult.error });

  res.status(200).json({
    message: 'Claim translated into standard EDI X12 837 compliance format!',
    ediOutput: compilationResult.ediLine
  });
});

// 🧠 Slot 4: NEW! Year 3 AI Rules-Cleansing Matrix Screening Route
app.post('/api/claims/screen-ai', (req, res) => {
  const { ediLine } = req.body;
  if (!ediLine) return res.status(400).json({ error: 'Missing raw EDI transmission context line to analyze!' });

  // Pass the string directly through our rules validator matrix row analyzer
  const analysisReport = screenAndCleanClaim(ediLine);

  res.status(200).json({
    message: 'AI Rules-Cleansing Matrix analysis sequence completed.',
    report: analysisReport
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
