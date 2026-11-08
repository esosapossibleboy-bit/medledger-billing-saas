import React, { useState } from 'react';
import ClaimAuditor from './ClaimAuditor';
import EdiConsoleBench from './EdiConsoleBench'; // 🌟 Import Year 2 Box!
import AiAnalyticsMonitor from './AiAnalyticsMonitor'; // 🌟 Import Year 3 Box!

export default function App() {
  const [patientId, setPatientId] = useState('');
  const [patientSSN, setPatientSSN] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('M54.5'); 
  const [billingAmount, setBillingAmount] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [auditId, setAuditId] = useState('');
  const [decryptedRecord, setDecryptedRecord] = useState(null);

  const [ediPatientId, setEdiPatientId] = useState('');
  const [compiledEdiLine, setCompiledEdiLine] = useState('');
  const [aiReport, setAiReport] = useState(null);

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
      if (response.ok) { setSuccess(data.message); setPatientId(''); setPatientSSN(''); setBillingAmount(''); } 
      else { setError(data.error); }
    } catch { setError('Connection lost to medical security core.'); }
  };

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
      if (response.ok) { setDecryptedRecord(data); setSuccess('Decryption handshake verified successfully.'); } 
      else { setError(data.error); }
    } catch { setError('Decryption operation rejected by secure node.'); }
  };

  const handleCompileEDI = async () => {
    try {
      setError(''); setSuccess(''); setCompiledEdiLine(''); setAiReport(null);
      if (!ediPatientId) { setError('Please type a Patient ID to compile to EDI format!'); return; }
      const response = await fetch('http://localhost:3000/api/claims/compile-edi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: ediPatientId })
      });
      const data = await response.json();
      if (response.ok) { setCompiledEdiLine(data.ediOutput); setSuccess(data.message); setEdiPatientId(''); } 
      else { setError(data.error); }
    } catch { setError('EDI Translation matrix compiler is currently offline.'); }
  };

  const handleAIScreening = async () => {
    try {
      setError(''); setSuccess('');
      if (!compiledEdiLine) { setError('No active EDI string loaded to screen!'); return; }
      const response = await fetch('http://localhost:3000/api/claims/screen-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ediLine: compiledEdiLine })
      });
      const data = await response.json();
      if (response.ok) { setAiReport(data.report); setSuccess(data.message); } 
      else { setError(data.error); }
    } catch { setError('AI cleansing node connection failure.'); }
  };

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#0f172a', minHeight: '100vh', padding: '50px 20px', color: '#e2e8f0' }}>
      <center>
        <div style={{ textAlign: 'left', maxWidth: '1000px', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '1px' }}>🤖 Year 3 Modular Enterprise Grid</span>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '2.5rem', color: '#f8fafc', fontWeight: '800' }}>🏥 MedLedger Clearinghouse SaaS</h1>
        </div>

        {error && <p style={{ color: '#f87171', backgroundColor: '#7f1d1d', padding: '12px', borderRadius: '8px', maxWidth: '1000px', textAlign: 'left', fontWeight: 'bold', border: '1px solid #b91c1c' }}>⚠️ ERROR_LOG: {error}</p>}
        {success && <p style={{ color: '#4ade80', backgroundColor: '#064e3b', padding: '12px', borderRadius: '8px', maxWidth: '1000px', textAlign: 'left', fontWeight: 'bold', border: '1px solid #047857' }}>🎉 RECO_LOG: {success}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', width: '100%', maxWidth: '1000px', textAlign: 'left', marginTop: '20px' }}>
          
          {/* COLUMN 1: INTENSIVE FORMS BLOCK */}
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#38bdf8', borderBottom: '2px solid #334155', paddingBottom: '10px', fontSize: '1.2rem' }}>✍️ Medical Claims Intake</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label htmlFor="claim-patient-id" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#94a3b8' }}>Patient Identifier</label>
              <input id="claim-patient-id" type="text" placeholder="e.g. patient_001" value={patientId} onChange={(e) => setPatientId(e.target.value)} style={{ backgroundColor: '#0f172a', color: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #475569', outline: 'none', marginTop: '-6px' }} />
              
              <label htmlFor="claim-ssn" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#94a3b8' }}>Social Security Number (SSN)</label>
              <input id="claim-ssn" type="text" placeholder="e.g. 123-456-7890" value={patientSSN} onChange={(e) => setPatientSSN(e.target.value)} style={{ backgroundColor: '#0f172a', color: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #475569', outline: 'none', marginTop: '-6px' }} />
              
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#94a3b8' }}>ICD-10 Diagnosis Code</label>
              <select value={diagnosisCode} onChange={(e) => setDiagnosisCode(e.target.value)} style={{ backgroundColor: '#0f172a', color: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #475569', outline: 'none', marginTop: '-6px' }}>
                <option value="M54.5">M54.5 - Low Back Pain</option>
                <option value="J06.9">J06.9 - Acute Upper Respiratory Infection</option>
                <option value="E11.9">E11.9 - Type 2 Diabetes Mellitus</option>
              </select>

              <label htmlFor="claim-amount" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#94a3b8' }}>Billing Claim Amount ($)</label>
              <input id="claim-amount" type="number" placeholder="e.g. 250" value={billingAmount} onChange={(e) => setBillingAmount(e.target.value)} style={{ backgroundColor: '#0f172a', color: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #475569', outline: 'none', marginTop: '-6px' }} />

              <button onClick={handleSubmission} style={{ padding: '12px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '10px' }}>🔒 Encrypt & Dispatch Claim</button>
            </div>
          </div>

          {/* COLUMN 2: DECOUPLED ROW COMPONENT CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <ClaimAuditor auditId={auditId} setAuditId={setAuditId} handleAuditDecrypt={handleAuditDecrypt} decryptedRecord={decryptedRecord} />
            
            <EdiConsoleBench 
              ediPatientId={ediPatientId} setEdiPatientId={setEdiPatientId}
              handleCompileEDI={handleCompileEDI} compiledEdiLine={compiledEdiLine}
              handleAIScreening={handleAIScreening}
            />
            
            <AiAnalyticsMonitor aiReport={aiReport} />
          </div>

        </div>
      </center>
    </div>
  );
}
