const { spawn } = require('node:child_process');
const net = require('node:net');

const command = process.platform === 'win32' ? 'cmd.exe' : 'npm';
const children = [];
let stopping = false;

function stopAll(signal = 'SIGTERM') {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (child.exitCode === null && !child.killed) child.kill(signal);
  }
}

process.on('SIGINT', () => stopAll('SIGINT'));
process.on('SIGTERM', () => stopAll('SIGTERM'));

async function isReady(url, checkDatabase = false) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(1500),
    });
    if (!response.ok) return false;
    if (!checkDatabase) return true;
    const body = await response.json();
    return body.data?.database === 'connected';
  } catch {
    return false;
  }
}

function portIsOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: 'localhost', port });
    socket.setTimeout(500);
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => resolve(false));
    socket.once('timeout', () => { socket.destroy(); resolve(false); });
  });
}

async function start() {
  const services = [];
  if (!(await isReady('http://localhost:3001/api/health', true))) services.push('dev:backend');
  if (!(await portIsOpen(5173))) services.push('dev:frontend');

  if (!services.length) {
    console.log('[Rendimento Primor] Backend, PostgreSQL e frontend já estão disponíveis.');
    return;
  }
  if (!services.includes('dev:backend')) console.log('[Rendimento Primor] Backend e PostgreSQL já estão disponíveis em http://localhost:3001.');
  if (!services.includes('dev:frontend')) console.log('[Rendimento Primor] Frontend já está disponível em http://localhost:5173.');

  for (const service of services) {
    console.log(`\n[Rendimento Primor] A iniciar ${service}...`);
    const args = process.platform === 'win32'
      ? ['/d', '/s', '/c', `npm.cmd run ${service}`]
      : ['run', service];
    const child = spawn(command, args, {
      stdio: 'inherit',
      windowsHide: true,
    });
    children.push(child);

    child.on('error', (error) => {
      console.error(`[Rendimento Primor] Falha ao iniciar ${service}: ${error.message}`);
      process.exitCode = 1;
      stopAll();
    });

    child.on('exit', (code) => {
      if (!stopping) {
        if (code && code !== 0) process.exitCode = code;
        stopAll();
      }
    });
  }
}

start().catch((error) => {
  console.error(`[Rendimento Primor] ${error.message}`);
  process.exitCode = 1;
});
