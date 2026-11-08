import { expect, test } from 'vitest';
import { screenAndCleanClaim } from './aiCleanser.js'; // We will build this file next!

test('AI Cleanser Matrix: Clear claims with no overlapping conditions should score a Grade A', () => {
  // 1. Arrange: Input a standard compiled EDI line (Low Back Pain - M54.5)
  const safeEdiLine = 'CLM*PATIENT_101*250***11:B:1*Y*A*Y*I*HI*BK:M54.5~';

  // 2. Act: Run our automated AI screening matrix
  const report = screenAndCleanClaim(safeEdiLine);

  // 3. Assert: Verify the engine scores it as high safety and clear of conflicts
  expect(report.success).toBe(true);
  expect(report.scoreGrade).toBe('Grade A');
  expect(report.denialRisk).toBe('Low');
});

test('AI Rules Screening: High-risk code combinations must be flagged with a Grade F denial warning', () => {
  // 2. Arrange: Input an EDI line containing an intentionally conflicting flag condition
  // Let's pass a mock custom conflict trigger code: "ERR:999" into the diagnosis segment slot
  const conflictingEdiLine = 'CLM*PATIENT_202*1500***11:B:1*Y*A*Y*I*HI*BK:ERR:999~';

  // 2. Act: Pass it into our screening engine
  const report = screenAndCleanClaim(conflictingEdiLine);

  // 3. Assert: The AI engine catches the error pattern and drops the grade down to F!
  expect(report.success).toBe(false);
  expect(report.scoreGrade).toBe('Grade F');
  expect(report.denialRisk).toBe('Critical');
  expect(report.alertMessage).toBe('AI Rule Alert: Code conflict detected! High risk of insurance rejection.');
});
