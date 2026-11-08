import React, { useState } from 'react';
import ClaimAuditor from './ClaimAuditor'; // 🌟 Import our decoupled component!

export default function App() {
  // 1. 🧠 State Management Memory Boxes
  const [patientId, setPatientId] = useState('');
  const [patientSSN, setPatientSSN] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('M54.5'); // Default: Low Back Pain
  const [billingAmount, setBillingAmount] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auditor component shared states
  const [auditId, setAuditId] = useState('');
  const [decryptedRecord, setDecryptedRecord] = useState(null);

  // 2. 📝 Network Action: Submit medical claim for encryption
  const handleSubmission = async () => {
    try {
      setError(''); setSuccess('');
      if (!patientId || !patientSSN || !billingAmount) { setError('All claims fields are mandatory!'); return; }

      const response = await fetch('http://localhost:3000/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, patientSSN, diagnosisCode, billingAmount: Number(billingAmount) })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setPatientId(''); setPatientSSN(''); setBillingAmount('');
      } else { setError(data.error); }
    } catch { setError('Connection lost to medical security core.'); }
  };

  // 3. 🔑 Network Action: Fetch and decode an encrypted claim block
  const handleAuditDecrypt = async () => {
    try {
      setError(''); setSuccess(''); setDecryptedRecord(null);
      if (!auditId) { setError('Please enter a target Patient ID to decrypt!'); return; }

      const response = await fetch('http://localhost:3000/api/claims/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: auditId })
      });

      const data = await response.json();
      if (response.ok) {
        setDecryptedRecord(data);
        setSuccess('Decryption handshake verified successfully.');
      } else { setError(data.error); }
    } catch { setError('Decryption operation rejected by secure node.'); }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', padding: '50px 20px', color: '#1e293b' }}>
      <center>
        <div style={{ textAlign: 'left', maxWidth: '900px', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '1px' }}>Phase 1 Core Architecture</span>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '2.2rem', color: '#0f172a', fontWeight: '800' }}>🏥 MedLedger Clearinghouse SaaS</h1>
        </div>

        {error && <p style={{ color: '#b91c1c', backgroundColor: '#fee2e2', padding: '12px', borderRadius: '8px', maxWidth: '900px', textAlign: 'left', fontWeight: 'bold' }}>⚠️ ERROR: {error}</p>}
        {success && <p style={{ color: '#15803d', backgroundColor: '#dcfce7', padding: '12px', borderRadius: '8px', maxWidth: '900px', textAlign: 'left', fontWeight: 'bold' }}>🎉 SUCCESS: {success}</p>}

        {/* --- Main Grid Workspace Dashboard --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', width: '100%', maxWidth: '900px', textAlign: 'left', marginTop: '20px' }}>
          
          {/* 📄 LEFT COLUMN: CLAIMS SUBMISSION ENTRY FORMS */}
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', fontSize: '1.2rem' }}>✍️ Medical Claims Intake</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* 🌟 Linked Patient ID Label & Input */}
              <label htmlFor="claim-patient-id" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>Patient Identifier</label>
              <input id="claim-patient-id" type="text" placeholder="e.g. patient_001" value={patientId} onChange={(e) => setPatientId(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', marginTop: '-6px' }} />
              
              {/* 🌟 Linked SSN Label & Input */}
              <label htmlFor="claim-ssn" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>Social Security Number (SSN)</label>
              <input id="claim-ssn" type="text" placeholder="e.g. 123-456-7890" value={patientSSN} onChange={(e) => setPatientSSN(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', marginTop: '-6px' }} />
              
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>ICD-10 Diagnosis Code</label>
              <select value={diagnosisCode} onChange={(e) => setDiagnosisCode(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', marginTop: '-6px', backgroundColor: 'white' }}>
                <option value="M54.5">M54.5 - Low Back Pain</option>
                <option value="J06.9">J06.9 - Acute Upper Respiratory Infection</option>
                <option value="E11.9">E11.9 - Type 2 Diabetes Mellitus</option>
              </select>

              {/* 🌟 Linked Billing Amount Label & Input */}
              <label htmlFor="claim-amount" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>Billing Claim Amount ($)</label>
              <input id="claim-amount" type="number" placeholder="e.g. 250" value={billingAmount} onChange={(e) => setBillingAmount(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', marginTop: '-6px' }} />

              <button onClick={handleSubmission} style={{ padding: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '10px' }}>
                🔒 Encrypt & Dispatch Claim
              </button>
            </div>
          </div>

          {/* 🔍 RIGHT COLUMN: DECOUPLED AUDITOR MODULE */}
          <ClaimAuditor 
            auditId={auditId} setAuditId={setAuditId}
            handleAuditDecrypt={handleAuditDecrypt}
            decryptedRecord={decryptedRecord}
          />

        </div>
      </center>
    </div>
  );
}
