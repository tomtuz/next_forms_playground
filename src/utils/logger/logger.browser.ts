import { LoggerInterface, OutputLevel } from './types';

export function createBrowserLogger(): LoggerInterface {
  const level: OutputLevel = {
    Info: true,
    Debug: false,
    Verbose: false,
  };

  const setLevels = (levelObj: Partial<OutputLevel>): void => {
    Object.assign(level, levelObj);
  };

  const setLevel = (levelKey: keyof OutputLevel, value: boolean): void => {
    level[levelKey] = value;
  };

  const getLevels = (): OutputLevel => ({ ...level });

  const error = (message?: any, ...optionalParams: any[]): void => {
    console.error(message, ...optionalParams);
  };

  const warn = (message?: any, ...optionalParams: any[]): void => {
    console.warn(message, ...optionalParams);
  };

  const info = (message?: any, ...optionalParams: any[]): void => {
    if (level.Info) console.info(message, ...optionalParams);
  };

  const debug = (message?: any, ...optionalParams: any[]): void => {
    if (level.Debug) console.debug(message, ...optionalParams);
  };

  const verbose = (message?: any, ...optionalParams: any[]): void => {
    if (level.Verbose) console.log(message, ...optionalParams);
  };

  const header = (message?: any, ...optionalParams: any[]): void => {
    console.log(`\n${message}\n${'='.repeat(String(message).length)}`);
  };

  const step = (message?: any, ...optionalParams: any[]): void => {
    console.log(`\n${message}\n${'-'.repeat(String(message).length)}`);
  };

  const struct = (message: string, obj: any, verbose = true): void => {
    if (verbose) {
      console.log(message, obj);
    }
  };

  const status = (
    message?: any,
    status_type?: 'success' | 'error' | 'info' | 'custom'
  ): void => {
    const prefix = status_type ? `[${status_type.toUpperCase()}] ` : '';
    console.log(`${prefix}${message}`);
  };

  return {
    setLevels,
    setLevel,
    getLevels,
    error,
    warn,
    info,
    debug,
    verbose,
    header,
    step,
    struct,
    status,
  };
}
