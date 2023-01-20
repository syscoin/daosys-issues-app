export const store = (key: string, value: string | number): void => {
  window.electron.ipcRenderer.sendMessage('ipc-main', [
    'set-config-variable',
    key,
    value,
  ]);
};

export const get = async (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    window.electron.ipcRenderer.on('ipc-main', (...args) => {
      if (args[0][0] === 'get-config-variable-response' && args[0][1] === key) {
        resolve(args[0][2] ?? null);
      }
    });

    window.electron.ipcRenderer.sendMessage('ipc-main', [
      'get-config-variable',
      key,
    ]);
  });
};
