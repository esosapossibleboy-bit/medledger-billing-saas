import React from 'react';

export default function AiAnalyticsMonitor({ aiReport }) {
  if (!aiReport) return null;

  const isGradeA = aiReport.scoreGrade === 'Grade A';

  return (
    <div style={{ 
      backgroundColor: '#1e293b', 
      padding: '25px', 
      borderRadius: '12px', 
      border: `2px solid ${isGradeA ? '#10b981' : '#f87171'}` 
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: isGradeA ? '#10b981' : '#f87171', fontSize: '1.1rem' }}>
        🤖 AI Claim Integrity Analytics Report
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '10px', 
        backgroundColor: '#0f172a', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '10px' 
      }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>CLAIM_HEALTH_RATING:</span>
          <h2 style={{ margin: '2px 0 0 0', color: '#f8fafc' }}>{aiReport.scoreGrade}</h2>
        </div>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>DENIAL_RISK_INDEX:</span>
          <h2 style={{ margin: '2px 0 0 0', color: aiReport.denialRisk === 'Low' ? '#10b981' : '#f87171' }}>
            {aiReport.denialRisk}
          </h2>
        </div>
      </div>
      
      <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '5px 0 0 0', fontStyle: 'italic' }}>
        📌 {aiReport.alertMessage}
      </p>
    </div>
  );
}
