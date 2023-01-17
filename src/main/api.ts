import { exec, ExecException } from 'child_process';

export enum RadicleApiDriver {
  http,
  cli,
}

export interface GetFullProfileResponseInterface {
  name: string | null;
  id: string | null;
}

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