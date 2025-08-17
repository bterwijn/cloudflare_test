
importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js');

let pyodideReady = null;
async function ensurePyodide() {
  if (!pyodideReady) {
    self.postMessage({ type: 'answer', message: 'loading pyodide...' });
    pyodideReady = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/' });
    self.postMessage({ type: 'answer', message: 'pyodide loaded' });

    pyodideReady.globals.set('print', (...args) => {
      self.postMessage({ type: 'answer', message: args.map(a => String(a)).join(' ') });
    });

  }
  return pyodideReady;
}


const program = `
def main():
    print("Hello from Pyodide!")

main()
`;

self.onmessage = async (e) => {
  const { data } = e;

  if (data.type === 'question') {
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
