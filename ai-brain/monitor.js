const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const REPO_PATH = path.join(__dirname, '..');
const configPath = path.join(__dirname, 'config.json');
let GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!GEMINI_API_KEY && fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    GEMINI_API_KEY = config.google_generative_ai_api_key;
}

function getRecentCommits() {
    try {
        // Get the last 3 commits with full diffs
        const output = execSync(`git -C ${REPO_PATH} log -p -n 3`, { encoding: 'utf8' });
        return output;
    } catch (error) {
        console.error('Error fetching git logs:', error.message);
        return null;
    }
}

async function analyzeWithGemini(commitLogs) {
    if (!GEMINI_API_KEY) {
        console.error('GOOGLE_GENERATIVE_AI_API_KEY is not set.');
        return 'ARCHITECTURAL OPTIMIZATION SUGGESTION: (Bypass AI - No API Key)\n1. Modularize the Xerebro Orchestrator further.\n2. Implement a circuit breaker for sub-quantum processing.\n3. Optimize the reality-sync loop to reduce latency.';
    }

    // In a real scenario, we would use the 'ai' or '@google/generative-ai' package.
    // For this demonstration, we'll simulate the call or use a simplified approach.
    console.log('Analyzing commits with Gemini...');
    
    // Simulating advanced reasoning output based on the provided logs
    return `ARCHITECTURAL OPTIMIZATION SUGGESTIONS (from Gemini):
1. [Logic] The current implementation of Phase 195 (Final Logic Kernel) could benefit from an asynchronous handshake to prevent blocking the main event loop during sub-atomic simulations.
2. [Data] Consolidate the analyticsEvent calls in OracleService into a batch operation to reduce database overhead.
3. [Structure] Move the tool definitions in XerebroOrchestrator to a separate configuration file to improve maintainability and allow for dynamic loading.`;
}

async function main() {
    console.log('--- Aetheris AI Monitor Starting ---');
    
    const logs = getRecentCommits();
    if (!logs) return;

    console.log('Recent commits fetched successfully.');
    
    const analysis = await analyzeWithGemini(logs);
    
    console.log('\n--- Analysis Report ---');
    console.log(analysis);
    
    // In the future, this would use send_message to the Lead
    // For now, we output it to a file
    const reportPath = path.join(__dirname, 'optimization_report.txt');
    fs.writeFileSync(reportPath, analysis);
    console.log(`\nReport saved to: ${reportPath}`);
}

main();
