import { createBrowserLogger } from './logger.browser';
import { createCLILogger } from './logger.cli';
import { Logger, LoggerInterface } from './types';

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const createLogger = (): LoggerInterface =>
  isBrowser ? createBrowserLogger() : createCLILogger();

export const logger = createLogger();

// Add a named export for the Logger class
export { Logger };
