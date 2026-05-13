import { createGoogleGenerativeAI } from '@ai-sdk/google';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

// Load from config.json if environment variable is missing
if (!apiKey) {
  const configPath = path.join(__dirname, '../../../ai-brain/config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      apiKey = config.google_generative_ai_api_key;
    } catch (e) {
      console.warn('Failed to load AI key from config.json');
    }
  }
}

export const google = createGoogleGenerativeAI({
  apiKey: apiKey || 'MISSING_KEY',
});
