
self.onmessage = async (e) => {
  const { data } = e;

  if (data.type == 'question') {
    self.postMessage({ type: data.type, message: 'ANSWER BABY!' });
  } else {
    self.postMessage({ type: 'error', message: 'Worker received valid message.' });
  }
  return

};
