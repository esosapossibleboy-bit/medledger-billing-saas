import { expect, test } from 'vitest';
import { compileToEDIX12 } from './ediCompiler.js'; // We will build this file next!

test('EDI X12 Compiler: Valid claims should successfully parse into standard EDI text strings', () => {
  // 1. Arrange: Input standard valid billing payload variables
  const validClaim = {
    patientId: 'PATIENT_777',
    billingAmount: 450,
    diagnosisCode: 'M54.5'
  };

  // 2. Act: Pass it through our automated translation matrix
  const result = compileToEDIX12(validClaim);

  // 3. Assert: Verify it outputted the exact string syntax clearinghouses expect!
  expect(result.success).toBe(true);
  expect(result.ediLine).toBe('CLM*PATIENT_777*450***11:B:1*Y*A*Y*I*HI*BK:M54.5~');
});

test('EDI Validation Rules: Missing required billing components must trigger a syntax error block', () => {
  // 1. Arrange: Input a broken fraudulent payload (Missing billing amount value!)
  const invalidClaim = {
    patientId: 'PATIENT_999',
    billingAmount: 0, // 🚨 Invalid! Must be greater than 0
    diagnosisCode: 'E11.9'
  };

  // 2. Act: Pass it into our compiler engine
  const result = compileToEDIX12(invalidClaim);

  // 3. Assert: The guard dog confirms the engine blocks the file from compiling!
  expect(result.success).toBe(false);
  expect(result.error).toBe('Syntax Validation Error: Claims billing amount must be greater than $0!');
});
