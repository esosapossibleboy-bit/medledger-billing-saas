import { expect, test, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from './server.js'; // We will build this next!
import { initDatabase, getRawDatabaseRow } from './database.js'; // We will build this next!

beforeEach(() => {
  initDatabase(); // Clean data slate before each run
});

test('HIPAA Cryptographic Security: Patient records must be completely encrypted inside the database blocks', async () => {
  // 1. Act: A medical coder submits a patient claim to our API gate slot
  const claimSubmission = await request(app)
    .post('/api/claims')
    .send({
      patientId: 'patient_001',
      patientSSN: '123-456-7890', // 🔒 HIGHLY SENSITIVE DATA
      diagnosisCode: 'M54.5', // Lower Back Pain code
      billingAmount: 250
    });
  expect(claimSubmission.status).toBe(201);

  // 2. Act: Bypass the server and peek directly into the raw database storage row file
  const rawRow = getRawDatabaseRow('patient_001');

  // 3. Assert: The Guard Dog checks if the SSN is unreadable gibberish inside the DB!
  expect(rawRow).toBeDefined();
  expect(rawRow.patientSSN).not.toBe('123-456-7890'); // 🛡️ Verifies plaintext is destroyed!
  expect(rawRow.patientSSN.length).toBeGreaterThan(30); // Confirms it became an encrypted string block
});

import { decryptData } from './ledger.js'; // Bring in our decryption cipher tool block

test('HIPAA Authorization Check: Authorized users must be allowed to decrypt patient data safely', async () => {
  // 1. Arrange: Submit a fresh secure claim
  await request(app)
    .post('/api/claims')
    .send({
      patientId: 'patient_777',
      patientSSN: '999-88-7777',
      diagnosisCode: 'J06.9', // Acute upper respiratory infection
      billingAmount: 120
    });

  // 2. Act: Knock on our new secure decryption endpoint room slot
  const response = await request(app)
    .post('/api/claims/decrypt')
    .send({ patientId: 'patient_777' });

  // 3. Assert: The Guard Dog verifies that the response is status 200 OK and reads clear text!
  expect(response.status).toBe(200);
  expect(response.body.patientSSN).toBe('999-88-7777'); // 🛡️ Restored perfectly for authorized eyes!
});

test('EDI Integration Portal Check: End-to-end lookup and translation to ANSI X12 binary strings', async () => {
  // 1. Arrange: Intake a fresh valid claim inside the system
  await request(app)
    .post('/api/claims')
    .send({
      patientId: 'PATIENT_EDI_99',
      patientSSN: '222-33-4444',
      diagnosisCode: 'E11.9',
      billingAmount: 500
    });

  // 2. Act: Trigger our brand new EDI translation compiler gate slot
  const response = await request(app)
    .post('/api/claims/compile-edi')
    .send({ patientId: 'PATIENT_EDI_99' });

  // 3. Assert: Verify the gate returns a pristine 200 OK status and standard X12 formatting segments!
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Claim translated into standard EDI X12 837 compliance format!');
  expect(response.body.ediOutput).toBe('CLM*PATIENT_EDI_99*500***11:B:1*Y*A*Y*I*HI*BK:E11.9~');
});
