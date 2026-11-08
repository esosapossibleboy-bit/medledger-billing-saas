import React from 'react';

export default function ClaimAuditor({
  auditId, setAuditId,
  handleAuditDecrypt,
  decryptedRecord
}) {
  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', fontSize: '1.2rem' }}>
        🔍 Secure Claims Audit Inspector
      </h3>
      <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '15px' }}>
        Authorized personnel only. Querying an ID pulls the raw block from the database and runs an on-the-fly AES decryption handshake.
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter Patient ID (e.g. patient_001)..." 
          value={auditId} 
          onChange={(e) => setAuditId(e.target.value)} 
          style={{ flex: 1, padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} 
        />
        <button 
          onClick={handleAuditDecrypt} 
          style={{ padding: '12px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Decrypt Row
        </button>
      </div>

      {/* Decrypted Patient Record Display */}
      {decryptedRecord && (
        <div style={{ padding: '15px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.9rem' }}>
          <span style={{ color: '#0ea5e9', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>🔑 DECRYPTED CLEAR-TEXT PAYLOAD:</span>
          <p style={{ margin: '4px 0', color: '#334155' }}><b>Patient ID:</b> {decryptedRecord.patientId}</p>
          <p style={{ margin: '4px 0', color: '#334155' }}><b>Decrypted SSN:</b> <code style={{ backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', color: '#0f172a', fontWeight: 'bold' }}>{decryptedRecord.patientSSN}</code></p>
          <p style={{ margin: '4px 0', color: '#334155' }}><b>Diagnosis ICD-10:</b> {decryptedRecord.diagnosisCode}</p>
          <p style={{ margin: '4px 0', color: '#334155' }}><b>Billing Target:</b> ${decryptedRecord.billingAmount}</p>
        </div>
      )}
    </div>
  );
}
