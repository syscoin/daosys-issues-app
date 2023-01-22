export const selectProject = async (): Promise<string> => {
  return new Promise(async (resolve) => {
    window.electron.ipcRenderer.on('ipc-main', (...args) => {
      if (args[0][0] === 'open-project-res') {
        resolve(args[0][1] ?? null);
      }
    });

    await window.electron.ipcRenderer.sendMessage('ipc-main', ['open-project']);
  });
};
