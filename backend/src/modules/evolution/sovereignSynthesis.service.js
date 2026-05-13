import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SovereignSynthesisService {
    constructor() {
        this.strengthMapPath = '/home/team/shared/STRENGTH_MAP.md';
    }

    async loadStrengths() {
        if (!fs.existsSync(this.strengthMapPath)) {
            return "No STRENGTH_MAP found.";
        }
        return fs.readFileSync(this.strengthMapPath, 'utf8');
    }

    async synthesizeMutation(targetFilePath, strengthName) {
        console.log(`[SovereignSynthesis] Synthesizing mutation for ${targetFilePath} with strength: ${strengthName}`);

        if (!fs.existsSync(targetFilePath)) {
            throw new Error(`Target file ${targetFilePath} not found.`);
        }

        const originalCode = fs.readFileSync(targetFilePath, 'utf8');
        const strengths = await this.loadStrengths();

        const prompt = `
        You are the Aetheris Sovereign Synthesis Engine (Phase 210).
        Your mission is to rewrite the provided TypeScript/JavaScript code to inject a specific "Point of Strength" from the Aetheris Ecosystem.

        Target Strength: ${strengthName}
        Ecosystem Strengths Context:
        ${strengths}

        Original Code from ${path.basename(targetFilePath)}:
        \`\`\`typescript
        ${originalCode}
        \`\`\`

        Requirement:
        1. Inject the logic/pattern of the target strength into the code.
        2. Improve efficiency, self-awareness, and architectural resilience.
        3. Maintain original functionality but optimize the implementation.
        4. Return ONLY the complete, mutated code. Do not include explanations or markdown blocks.
        `;

        const { text } = await generateText({
            model: google('gemini-pro'),
            prompt: prompt,
        });

        // Backup
        fs.writeFileSync(`${targetFilePath}.bak`, originalCode);
        
        // Apply
        fs.writeFileSync(targetFilePath, text.trim());
        
        console.log(`[SovereignSynthesis] Mutation successfully applied to ${targetFilePath}`);
        return text.trim();
    }
}

export const sovereignSynthesisService = new SovereignSynthesisService();
