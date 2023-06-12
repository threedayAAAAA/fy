import type { SafeAny } from 'src/types';

const logWrapper = (position: string, args: SafeAny[], log: (...args: SafeAny[]) => void) => {
  log(`[${position}]:`, ...args);
};

const warn = (position: string, ...args: SafeAny[]): void => logWrapper(position, args, console.warn);

export const Logger = { warn };

export const throwError = (position: string, message: string): never => {
  throw new Error(`[${position}]: ${message}`);
};
