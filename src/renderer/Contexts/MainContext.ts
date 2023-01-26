import { createContext } from 'react';
import { Context } from 'vm';

export const MainContext: Context = createContext<{
  isAuthorized: boolean;
  currentProject: string | null;
}>({
  isAuthorized: false,
  currentProject: null,
});
