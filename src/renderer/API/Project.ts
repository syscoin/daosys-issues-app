export const selectProject = async (): Promise<string | boolean> => {
  return new Promise(async (resolve) => {
    window.electron.ipcRenderer.on('ipc-main', (...args) => {
      if (args[0][0] === 'open-project-res') {
        console.log(args[0][1]);
        return resolve(args[0][1]);
      }
    });

    await window.electron.ipcRenderer.sendMessage('ipc-main', ['open-project']);
  });
};
