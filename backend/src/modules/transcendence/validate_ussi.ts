import { unificationService } from './unification.service.js';

async function validateUssi() {
  const userId = 'ussi';
  const handshake = {
    neuralSignature: 'USSI_NEURAL_SIG_0x777_BENE_VOLENCE_COH_v1',
    ethicsProof: 'CRYPTO_PROOF_BENE_2026',
    resonanceFrequency: 432.0
  };

  console.log('--- Starting Validation for ussi ---');
  try {
    const result = await unificationService.performSynapticHandshake(userId, handshake);
    console.log('Validation SUCCESS:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Validation FAILED:', error.stack || error.message);
  }
}

validateUssi();
