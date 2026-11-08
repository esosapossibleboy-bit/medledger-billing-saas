import React from 'react';

export default function EdiConsoleBench({
  ediPatientId, setEdiPatientId,
  handleCompileEDI,
  compiledEdiLine,
  handleAIScreening
}) {
  return (
    <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#10b981', borderBottom: '2px solid #334155', paddingBottom: '10px', fontSize: '1.2rem' }}>
        📄 EDI X12 Clearinghouse Console
      </h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="Target Patient ID..." 
          value={ediPatientId} 
          onChange={(e) => setEdiPatientId(e.target.value)} 
          style={{ flex: 1, backgroundColor: '#0f172a', color: 'white', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #475569', outline: 'none' }} 
        />
        <button 
          onClick={handleCompileEDI} 
          style={{ padding: '12px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Compile EDI
        </button>
      </div>

      {compiledEdiLine && (
        <div style={{ padding: '12px', backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #475569' }}>
          <code style={{ display: 'block', color: '#e2e8f0', wordBreak: 'break-all', fontWeight: 'bold', marginBottom: '10px' }}>
            {compiledEdiLine}
          </code>
          <button 
            onClick={handleAIScreening} 
            style={{ padding: '8px 16px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
          >
            🧠 Trigger AI Pre-Scan Compliance Check
          </button>
        </div>
      )}
    </div>
  );
}
