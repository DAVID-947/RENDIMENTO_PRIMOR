const { existsSync } = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const net = require('node:net');

const action = process.argv[2];
if (!['start', 'stop'].includes(action)) {
  console.error('Uso: node scripts/local-postgres.cjs <start|stop>');
  process.exit(2);
}

const dataDir = path.resolve(__dirname, '..', '..', '.postgres-data');
if (!existsSync(dataDir)) {
  console.log('Cluster PostgreSQL local não configurado; será usada a DATABASE_URL do backend.');
  process.exit(0);
}

function isDatabaseRunning() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port: 5433 });
    socket.setTimeout(500);
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => resolve(false));
    socket.once('timeout', () => { socket.destroy(); resolve(false); });
  });
}

async function run() {
if (action === 'start' && await isDatabaseRunning()) {
  console.log('PostgreSQL local já está disponível na porta 5433.');
  return;
}

const candidates = [
  process.env.PG_CTL,
  'pg_ctl',
  path.join(process.env.ProgramFiles || 'C:\\Program Files', 'PostgreSQL', '18', 'bin', 'pg_ctl.exe'),
].filter(Boolean);

let result;
for (const executable of candidates) {
  result = spawnSync(executable, action === 'start'
    ? ['-D', dataDir, '-l', path.join(dataDir, 'server.log'), '-o', '-p 5433 -h 127.0.0.1', 'start']
    : ['-D', dataDir, '-m', 'fast', 'stop'], { stdio: 'inherit' });
  if (result.error && result.error.code === 'ENOENT') continue;
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

console.error('pg_ctl não encontrado. Instala PostgreSQL ou define PG_CTL com o caminho do executável.');
process.exit(1);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
