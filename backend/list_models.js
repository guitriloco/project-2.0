import https from 'https';
import fs from 'fs';

async function listModels() {
  const configPath = '/home/team/shared/project-2.0/ai-brain/config.json';
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const apiKey = config.google_generative_ai_api_key;

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.models) {
          console.log(json.models.map(m => m.name).join('\n'));
        } else {
          console.log(JSON.stringify(json, null, 2));
        }
      } catch (e) {
        console.error('Parse error:', e);
        console.log(data);
      }
    });
  }).on('error', (err) => {
    console.error('Error: ' + err.message);
  });
}

listModels();
