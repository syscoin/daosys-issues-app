export const checkAuth = async (): Promise<{
  authorized: boolean;
  projectId: string | null;
}> => {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.on('ipc-main', (...args: unknown) => {
      if (args[0][0] === 'check-auth-res') {
        console.log(args[0][2]);

        resolve({
          authorized: args[0][1],
          projectId: args[0][2],
        }); // second arg current project id if available
      }
    });

    window.electron.ipcRenderer.sendMessage('ipc-main', ['check-auth']);
  });
};
