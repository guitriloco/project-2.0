import Fastify from 'fastify';
import { xerebroOrchestrator } from './modules/xerebro/orchestrator.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true
});

// Register API routes
fastify.post('/api/xerebro/chat', async (request, reply) => {
  const { messages } = request.body as any;
  const response = await xerebroOrchestrator.chat(messages);
  return response;
});

fastify.get('/health', async () => {
  return { status: 'OK' };
});

// Helper to register modular routes
const registerRoutes = async () => {
  const routesPath = join(__dirname, 'routes');
  const routeDirs = readdirSync(routesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dir of routeDirs) {
    try {
      const routeModule = await import(`./routes/${dir}/index.ts`);
      if (routeModule.default) {
        fastify.register(routeModule.default, { prefix: `/api/${dir}` });
        console.log(`Registered routes for: ${dir}`);
      }
    } catch (err) {
      console.warn(`Could not register routes for ${dir}:`, err);
    }
  }
};

const start = async () => {
  try {
    await registerRoutes();
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server listening on http://0.0.0.0:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
