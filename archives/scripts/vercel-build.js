const { execSync } = require('node:child_process');
const { rmSync, existsSync, readFileSync, writeFileSync, cpSync } = require('node:fs');
const { join, relative } = require('node:path');

const DEFAULT_APP = 'personas-unified-demo';
const allowedApps = new Set(['app-info', 'app-pasteur', 'personas-unified-demo']);

const targetApp = process.env.TARGET_APP || DEFAULT_APP;

if (!allowedApps.has(targetApp)) {
  console.error(`Unknown TARGET_APP "${targetApp}". Expected one of: ${[...allowedApps].join(', ')}`);
  process.exit(1);
}

const appDir = targetApp === 'personas-unified-demo' ? targetApp : join('apps', targetApp);
const nextOutput = join('.next');

const run = (command) => {
  execSync(command, { stdio: 'inherit', env: process.env });
};

console.log('🧹 Cleaning previous .next output at repo root');
rmSync('.next', { recursive: true, force: true });

console.log(`▶️  Building ${targetApp} for Vercel deploy`);
if (targetApp === 'personas-unified-demo') {
  // Build unified demo as a workspace
  run(`npm run build --workspace=${targetApp}`);

  // Move .next from unified demo to root since NEXT_DIST_DIR doesn't work reliably
  const unifiedDemoNext = join(targetApp, '.next');
  if (existsSync(unifiedDemoNext)) {
    console.log(`📁 Moving .next from ${unifiedDemoNext} to root`);
    rmSync('.next', { recursive: true, force: true });
    cpSync(unifiedDemoNext, '.next', { recursive: true });
  } else {
    console.log(`⚠️  No .next found in ${unifiedDemoNext}`);
  }

  // Ensure node_modules are properly linked for Vercel
  console.log('🔗 Ensuring node_modules are properly linked');
  const unifiedDemoNodeModules = join(targetApp, 'node_modules');
  if (existsSync(unifiedDemoNodeModules)) {
    console.log(`📁 Copying node_modules from ${unifiedDemoNodeModules} to root`);
    rmSync('node_modules', { recursive: true, force: true });
    cpSync(unifiedDemoNodeModules, 'node_modules', { recursive: true });
    
    // Also ensure package.json is in root for Vercel
    const unifiedDemoPackageJson = join(targetApp, 'package.json');
    if (existsSync(unifiedDemoPackageJson)) {
      console.log(`📁 Copying package.json from ${unifiedDemoPackageJson} to root`);
      cpSync(unifiedDemoPackageJson, 'package.json', { force: true });
    }
  } else {
    console.log(`⚠️  No node_modules found in ${unifiedDemoNodeModules}`);
  }
} else {
  const distDir = join(relative(appDir, '.'), '.next');
  process.env.NEXT_DIST_DIR = distDir;
  run(`npm run build --workspace=${targetApp}`);
}

if (!existsSync(nextOutput)) {
  console.error('Expected Next.js output at .next but it was not found.');
  process.exit(1);
}

// Copy public folder from the target app to repository root for Vercel
const appPublicDir = join(appDir, 'public');
const rootPublicDir = 'public';

if (existsSync(appPublicDir)) {
  console.log(`📁 Copying public assets from ${appPublicDir} to ${rootPublicDir}`);
  rmSync(rootPublicDir, { recursive: true, force: true });
  cpSync(appPublicDir, rootPublicDir, { recursive: true });
} else {
  console.log(`⚠️  No public directory found at ${appPublicDir}`);
}

const nextEnvPath = join(appDir, 'next-env.d.ts');
if (existsSync(nextEnvPath)) {
  const original = readFileSync(nextEnvPath, 'utf8');
  const normalized = original.replace(/\"\.\/\.\.[^\"]*\.next\/types\/routes\.d\.ts\"/, '"./.next/types/routes.d.ts"');
  if (normalized !== original) {
    writeFileSync(nextEnvPath, normalized);
  }
}

console.log('✅ Vercel build output prepared');
