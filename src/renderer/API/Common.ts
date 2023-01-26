export const checkAuth = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.on('ipc-main', (...args: unknown) => {
      if (args[0][0] === 'check-auth-res') {
        resolve(args[0][1]);
      }
    });

    window.electron.ipcRenderer.sendMessage('ipc-main', ['check-auth']);
  });
};
