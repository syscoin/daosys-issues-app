import { ResultType } from '@remix-run/router/dist/utils';
import { exec, ExecException } from 'child_process';
import { BrowserWindow, dialog } from 'electron';

export enum RadicleApiDriver {
  http,
  cli,
}

export interface GetFullProfileResponseInterface {
  name: string | null;
  id: string | null;
}

export const openAndScanDirectoryForRadicleProject = async (
  window: BrowserWindow
) => {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog(window, {
        properties: ['openDirectory'],
      })
      .then((value) => {
        if (value.canceled === false) {
          console.log(value.filePaths);

          resolve(value.filePaths);
        }
      })
      .catch((reason) => {});
  });
};

/**
 * Get Full profile using `rad self` command or web API
 * @param method RadicleApiDriver
 * @returns GetFullProfileResponseInterface
 */
export const getFullProfile = async (
  method: RadicleApiDriver
): Promise<GetFullProfileResponseInterface> => {
  const idFetcher: Promise<string | null> = new Promise((resolve, reject) => {
    if (method === RadicleApiDriver.cli) {
      exec(
        'rad self --profile',
        (error: ExecException | null, stdout: string, stderr: string) => {
          if (error) {
            reject(new Error(stderr));
          } else {
            resolve(stdout.replace('\n', ''));
          }
        }
      );
    } else {
      reject(new Error('Unsupported api http driver for this command.'));
    }
  });
  const nameFetcher: Promise<string | null> = new Promise((resolve, reject) => {
    if (method === RadicleApiDriver.cli) {
      exec(
        'rad self --name',
        (error: ExecException | null, stdout: string, stderr: string) => {
          if (error) {
            reject(new Error(stderr));
          } else {
            resolve(stdout.replace('\n', ''));
          }
        }
      );
    } else {
      reject(new Error('Unsupported api http driver for this command.'));
    }
  });

  const [id, name] = await Promise.all([idFetcher, nameFetcher]);

  return { name, id };
};
