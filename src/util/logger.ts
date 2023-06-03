const logWrapper = (position: string, args: any[], log: (...args: any[]) => void) => {
  log(`[${position}]:`, ...args);
};

const info = (position: string, ...args: any[]): void => logWrapper(position, args, console.log);
const warn = (position: string, ...args: any[]): void => logWrapper(position, args, console.warn);
const error = (position: string, ...args: any[]): void => logWrapper(position, args, console.error);

export const Logger = { info, warn, error };

export const throwError = (position: string, message: string): never => {
  throw new Error(`[${position}]: ${message}`);
};
