import { createBrowserLogger } from './logger.browser';
import { createCLILogger } from './logger.cli';
import { Logger, LoggerInterface, OutputLevel } from './types';

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const createLogger = (initSettings?: OutputLevel): LoggerInterface =>
  isBrowser ? createBrowserLogger(initSettings) : createCLILogger(initSettings);

export const logger = createLogger();
export const getLogger = (initSettings?: OutputLevel) => createLogger(initSettings);

// Add a named export for the Logger class
export { Logger };
