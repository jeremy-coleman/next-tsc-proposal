const cp = require('child_process')
const path = require('path')
const logSymbols = require('log-symbols')
const ROOT_DIRECTORY = __dirname

//-------------script helper ------------//

async function run (name, bin, args = []) {
  await new Promise((resolve, reject) => {
    console.info(logSymbols.info, `Running ${name}`)

    const cmd = process.platform === 'win32' ? `${bin}.cmd` : bin
    const child = cp.spawn(
      path.resolve(ROOT_DIRECTORY, 'node_modules', '.bin', cmd),
      args,
      {
        cwd: path.resolve(ROOT_DIRECTORY),
        stdio: 'inherit'
      }
    )
    
    child.on('data', (data) => console.log(data))
    child.on('exit', (code) => {
      console.log('')
      if (code === 0) return resolve()
      reject(new Error(`${name} failed`))
    })
  })
};

//-------------some tasks ------------//
async function compileTypeScript () {
  await run('TypeScript', 'tsc', ['-p', 'tsconfig.build.json'])
};

async function startNextJs() {
  await run('NextJS', 'next', ['app'])
};



const commandArguments = ["next app"]

const PROJECT_DIRS_OR_TSCONFIGS = [
  "tsconfig.build.json"
];
/** @type Promise<void>[] */
const initialCompilationPromises = [];

for (const projectDir of PROJECT_DIRS_OR_TSCONFIGS) {
  const options = { shell: true, cwd: process.cwd(), hideWindows: true };
  const tscArgs = ['-w'];
  if (projectDir !== '') {
    tscArgs.push('-p', PROJECT_DIRS_OR_TSCONFIGS);
  }
  const child = cp.spawn('tsc', tscArgs, options);
  child.on('exit', (code, signal) => {
    console.error(`tsc exited with exit code: ${code}`);
    if (signal) {
      console.error(`signal: ${signal}`);
    }
  });

  let resolve;

  initialCompilationPromises.push(new Promise((r) => {resolve = r;}));

  let buffer = '';
  const marker = `. Watching for file changes.`
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    // process.stdout.write(chunk);
    buffer += chunk;
    while (true) {
      let index = buffer.indexOf(marker);
      if (index === -1) {
        break;
      }
      resolve();
      if (buffer.includes(`File change detected. Starting incremental compilation...`)) {
        console.log('\ntsc-then: File change detected. Compiling...\n');
      }
      buffer = buffer.slice(index + marker.length);
      runResponseCommand();
    }
  });
}


let running = undefined;
let nextRun = false;
let firstRun = true;


//-------------promisified runner ------------//
async function runResponseCommand() {
  await Promise.all(initialCompilationPromises);
  if (running) {
    await running;
    if (nextRun) {
      return;
    }
    nextRun = true;
  }
  running = new Promise((resolve) => {
    if (firstRun) {
      console.log('TaskRunner: Initial compilation complete!');
      firstRun = false;
    }
    console.log(`\nTaskRunner: Running ${commandArguments.join(' ')}\n`);
    startNextJs()
  });
  await running;
  console.log('\nTaskRunner: command finished\n')
  running = undefined;
  nextRun = false;
}

runResponseCommand()