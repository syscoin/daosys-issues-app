export const selectProject = async (): Promise<{
  projectId: string | false;
  dirPath: string | false;
}> => {
  return new Promise(async (resolve) => {
    window.electron.ipcRenderer.on('ipc-main', (...args) => {
      if (args[0][0] === 'open-project-res') {
        return resolve({
          projectId: args[0][1],
          dirPath: args[0][1],
        });
      }
    });

    await window.electron.ipcRenderer.sendMessage('ipc-main', ['open-project']);
  });
};
