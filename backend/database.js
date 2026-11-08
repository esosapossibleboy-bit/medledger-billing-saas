import Loki from 'lokijs';

// 1. Create a permanent medical vault database file that auto-saves to disk
const db = new Loki('medledgerVault.db', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

let claimsCollection;

function databaseInitialize() {
  claimsCollection = db.getCollection('claims') || db.addCollection('claims');
}

/**
 * Clean-slate switch used exclusively by our automated test runner
 */
export function initDatabase() {
  if (!claimsCollection) databaseInitialize();
  claimsCollection.clear();
}

/**
 * Saves a new medical billing claim entry into our local storage file grid
 * @param {Object} claimObj - Contains encrypted field lines
 */
export function saveClaimRecord(claimObj) {
  if (!claimsCollection) databaseInitialize();
  claimsCollection.insert({
    id: claimObj.patientId,
    patientSSN: claimObj.patientSSN, // 🔒 This must be pre-scrambled!
    diagnosisCode: claimObj.diagnosisCode,
    billingAmount: claimObj.billingAmount,
    createdAt: new Date().toISOString()
  });
  db.saveDatabase(); // Lock it permanently into the hard drive file
}

/**
 * Test Helper: Peeks directly into the raw database storage row file without decrypting it
 * @param {string} patientId - Target patient ID token
 * @returns {Object} Raw unmodified database data document
 */
export function getRawDatabaseRow(patientId) {
  if (!claimsCollection) databaseInitialize();
  return claimsCollection.findOne({ id: patientId });
}

databaseInitialize();
