import crypto from 'crypto';

// A master system security key phrase (In production, this lives inside environment variables!)
const ENCRYPTION_KEY = crypto.scryptSync('master-secret-password-key', 'salt-stamp', 32);
const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypts sensitive string payloads using AES-256-CBC.
 * @param {string} text - Raw plaintext data
 */
export function encryptData(text) {
  const iv = crypto.randomBytes(16); // Initial Vector for cryptographic randomness
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Combine Initial Vector and Encrypted output together safely
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypts AES-256-CBC encrypted strings back into readable text format.
 * @param {string} text - Encrypted hex bundle block
 */
export function decryptData(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
