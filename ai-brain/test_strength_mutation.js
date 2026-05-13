const path = require('path');
const fs = require('fs');
const AetherCore = require('/home/team/shared/AETHER_CORE');

async function testMutation() {
    console.log('--- STARTING STRENGTH MUTATION TEST ---');
    
    const mutator = AetherCore.createStrengthMutator();
    
    // Create a dummy file to mutate
    const dummyPath = path.join(__dirname, 'dummy_logic.js');
    fs.writeFileSync(dummyPath, `
function harvestData() {
    console.log("Harvesting data...");
    return { data: [1, 2, 3] };
}
    `);

    console.log('Injecting Atomic Mutation Engine strength...');
    await mutator.mutateWithStrength(dummyPath, 'Atomic Mutation Engine');
    
    const mutatedContent = fs.readFileSync(dummyPath, 'utf8');
    console.log('Mutated Content:');
    console.log(mutatedContent);

    if (mutatedContent.includes('HEURISTIC_MUTATION: Atomic_Mutation_Engine')) {
        console.log('TEST PASSED: Heuristic mutation applied successfully.');
    } else {
        console.log('TEST FAILED: Mutation pattern not found.');
    }

    // Cleanup
    // fs.unlinkSync(dummyPath);
    // fs.unlinkSync(`${dummyPath}.bak`);
}

testMutation().catch(console.error);
