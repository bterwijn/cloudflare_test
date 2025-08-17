
importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js');

let pyodideReady = null;
let stepArr = null;

async function ensurePyodide() {
  if (!pyodideReady) {
    self.postMessage({ type: 'answer', message: 'loading pyodide...' });
    pyodideReady = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/' });
    self.postMessage({ type: 'answer', message: 'pyodide loaded' });

    pyodideReady.globals.set('print', (...args) => {
      self.postMessage({ type: 'answer', message: args.map(a => String(a)).join(' ') });
    });

    pyodideReady.globals.set('wait', waitSync);
  }
  return pyodideReady;
}

function waitSync() {
    if (!stepArr) {
        throw new Error('Step array not initialized');
    }
    let sig = Atomics.load(stepArr, 0);
    while (sig === 0) {
        Atomics.wait(stepArr, 0, 0);
        sig = Atomics.load(stepArr, 0);
        Atomics.store(stepArr, 0, 0);
    }
    return sig;
}


const program = `
def main():
    print("waiting for Continue.")
    wait()
    print("Continuing")

main()
`;

self.onmessage = async (e) => {
  const { data } = e;
  if (data.type === 'init') {
    stepArr = new Int32Array(data.sab);
    self.postMessage({ type: 'answer', message: 'stepArr initialized' });
  } else if (data.type === 'question') {
    self.postMessage({ type: 'answer', message: 'I\'ve answered' });
  } else if (data.type === 'run') {
    pyodide = await ensurePyodide();
    self.postMessage({ type: 'answer', message: 'RUNNING...' });
    await pyodide.runPythonAsync(program);
    self.postMessage({ type: 'answer', message: 'DONE' });
  } else {
    self.postMessage({ type: 'error', message: 'Worker received invalid message.' });
  }
  return

};
