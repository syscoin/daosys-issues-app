/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import ElectronStore from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  GetFullProfileResponseInterface,
  RadicleApiDriver,
  checkAuth,
  getFullProfile,
  openAndScanDirectoryForRadicleProject,
} from './api';

import {
  CURRENT_PROJECT_ID_STORE_KEY,
  CURRENT_PROJECT_PATH_STORE_KEY,
} from './consts';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
const store: ElectronStore = new ElectronStore();

ipcMain.on('ipc-main', async (event, arg) => {
  const action: string | null = arg[0] ?? null;

  if (action) {
    if (action === 'full-profile') {
      // requesting full profile

      const res: GetFullProfileResponseInterface = await getFullProfile(
        RadicleApiDriver.cli
      );

      event.reply('ipc-main', ['full-profile-res', res.id, res.name]);
    }

    if (action === 'set-config-variable') {
      store.set(arg[1], arg[2]);
      console.log('Seetings update');
      console.log(arg[1], arg[2]);
    }

    if (action === 'get-config-variable') {
      const variable: string = arg[1];

      const value: unknown = store.get(variable, null);

      event.reply('ipc-main', [
        'get-config-variable-response',
        variable,
        value,
      ]);
    }

    // auth

    if (action === 'check-auth') {
      checkAuth()
        .then(async (authorized) => {
          const currentProject = await store.get(CURRENT_PROJECT_ID_STORE_KEY);

          return event.reply('ipc-main', [
            'check-auth-res',
            authorized,
            currentProject,
          ]);
        })
        .catch(() => {
          return event.reply('ipc-main', ['check-auth-res', false]);
        });
    }

    // projects

    if (action === 'open-project') {
      const {
        radProject,
        localDirectory,
      }: { radProject: string | boolean; localDirectory: string | boolean } =
        await openAndScanDirectoryForRadicleProject(
          mainWindow as BrowserWindow
        );

      // scan directory for radicle project and gather info

      event.reply('ipc-main', ['open-project-res', radProject, localDirectory]);

      // todo save storage state and share it with react context to display new  menu parts

      if (radProject !== false && localDirectory !== false) {
        store.set(CURRENT_PROJECT_ID_STORE_KEY, radProject);
        store.set(CURRENT_PROJECT_PATH_STORE_KEY, localDirectory);
      }
    }
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
