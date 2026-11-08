import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import React from 'react';
import App from './App';

// Mock the global network fetch engine so it responds instantly with mock data rows
global.fetch = vi.fn((url, options) => {
  if (url.includes('/api/claims/decrypt')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ 
        patientId: 'patient_001',
        patientSSN: '123-456-7890',
        diagnosisCode: 'M54.5',
        billingAmount: 250
      }),
    });
  }

  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Medical claim cataloged securely under zero-knowledge protocol!' })
  });
});

test('Claims Intake: Submitting a patient form should display a success alert banner', async () => {
  render(<App />);

  // 🌟 FIX: Find the intake fields precisely by searching for their bold form Labels!
  fireEvent.change(screen.getByLabelText(/Patient Identifier/i), { target: { value: 'patient_esosa' } });
  fireEvent.change(screen.getByLabelText(/Social Security Number \(SSN\)/i), { target: { value: '777-88-9999' } });
  fireEvent.change(screen.getByLabelText(/Billing Claim Amount \(\$\)/i), { target: { value: '450' } });

  // Click the dispatch button
  fireEvent.click(screen.getByText(/Encrypt & Dispatch Claim/i));

  // Verify the happy success message appears safely
  const banner = await screen.findByText(/SUCCESS:/i);
  expect(banner).toBeInTheDocument();
});

test('Decryption Handshake: Querying an ID inside the child Auditor component should reveal plain text', async () => {
  render(<App />);

  // Locate input box inside our decoupled child component block using its unique placeholder string
  const auditInput = screen.getByPlaceholderText(/Enter Patient ID \(e.g. patient_001\).../i);
  fireEvent.change(auditInput, { target: { value: 'patient_001' } });

  // Press the decrypt row trigger button
  fireEvent.click(screen.getByText(/Decrypt Row/i));

  // Assert that the plain text patient records render out beautifully
  const payloadHeader = await screen.findByText(/DECRYPTED CLEAR-TEXT PAYLOAD:/i);
  expect(payloadHeader).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
});
