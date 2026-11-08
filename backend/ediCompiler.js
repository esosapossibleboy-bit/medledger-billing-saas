/**
 * @fileoverview Year 2 Electronic Data Interchange (EDI X12 837) Compilation Matrix.
 * Enforces strict industry parsing rules on medical billing payloads.
 */

/**
 * Validates corporate billing parameters and compiles items into standard EDI segments.
 * 
 * @param {Object} claim - { patientId, billingAmount, diagnosisCode }
 * @returns {Object} { success: boolean, ediLine?: string, error?: string }
 */
export function compileToEDIX12(claim) {
  const { patientId, billingAmount, diagnosisCode } = claim;

  // 🛡️ COMPLIANCE CONSTRAINT RULE 1: Enforce mandatory identifier presence
  if (!patientId || patientId.trim() === '') {
    return { success: false, error: 'Syntax Validation Error: Missing Patient Account Reference ID!' };
  }

  // 🛡️ COMPLIANCE CONSTRAINT RULE 2: Enforce positive integer financial values
  if (!billingAmount || billingAmount <= 0) {
    return { success: false, error: 'Syntax Validation Error: Claims billing amount must be greater than $0!' };
  }

  // 🛡️ COMPLIANCE CONSTRAINT RULE 3: Validate mandatory ICD-10 medical code presence
  if (!diagnosisCode || diagnosisCode.trim() === '') {
    return { success: false, error: 'Syntax Validation Error: Missing mandatory ICD-10 Diagnosis indicator tag!' };
  }

  // 🖨️ SYNTAX PARSING MATRIX: Assemble the standardized X12 segments lines using industry delimiters
  const cleanId = patientId.toUpperCase().trim();
  const clmSegment = `CLM*${cleanId}*${billingAmount}***11:B:1*Y*A*Y*I`;
  const hiSegment  = `HI*BK:${diagnosisCode.toUpperCase().trim()}`;
  
  // Combine segments together terminated by a closing segment character tilde (~)
  const finalEdiLine = `${clmSegment}*${hiSegment}~`;

  return {
    success: true,
    ediLine: finalEdiLine
  };
}
