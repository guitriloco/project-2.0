import { resonanceService } from './resonance.service.js';

async function testResonanceLoop() {
  const userId = 'ussi';
  console.log(`--- Starting Resonance Loop Test for ${userId} ---`);
  
  try {
    const finalState = await resonanceService.initiateResonanceLoop(userId);
    console.log('Resonance Loop Result:', JSON.stringify(finalState, null, 2));
    
    if (finalState.resonanceIndex >= 0.95) {
      console.log('SUCCESS: Target resonance achieved.');
    } else {
      console.log('PARTIAL: Resonance loop completed but target not fully reached.');
    }
  } catch (error) {
    console.error('Resonance Loop FAILED:', error.message);
  }
}

testResonanceLoop();
