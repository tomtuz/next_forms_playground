// DOMAIN: Logger

export interface LoggerInterface {
  setLevels(levelObj: Partial<OutputLevel>): void;
  setLevel(level: keyof OutputLevel, value: boolean): void;
  getLevels(): OutputLevel;
  error(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  verbose(message?: any, ...optionalParams: any[]): void;
  header(message?: any, ...optionalParams: any[]): void;
  step(message?: any, ...optionalParams: any[]): void;
  struct(message: string, obj: any, verbose?: boolean): void;
  status(
    message?: any,
    status_type?: 'success' | 'error' | 'info' | 'custom'
  ): void;
}

export abstract class Logger implements LoggerInterface {
  abstract setLevels(levelObj: Partial<OutputLevel>): void;
  abstract setLevel(level: keyof OutputLevel, value: boolean): void;
  abstract getLevels(): OutputLevel;
  abstract error(message?: any, ...optionalParams: any[]): void;
  abstract warn(message?: any, ...optionalParams: any[]): void;
  abstract info(message?: any, ...optionalParams: any[]): void;
  abstract debug(message?: any, ...optionalParams: any[]): void;
  abstract verbose(message?: any, ...optionalParams: any[]): void;
  abstract header(message?: any, ...optionalParams: any[]): void;
  abstract step(message?: any, ...optionalParams: any[]): void;
  abstract struct(message: string, obj: any, verbose?: boolean): void;
  abstract status(
    message?: any,
    status_type?: 'success' | 'error' | 'info' | 'custom'
  ): void;
}

export enum LogLevel {
  // native levels
  Silent = 0,
  Error = 1,
  Warn = 2,
  // custom levels
  Info = 3, // info
  Debug = 4, // info + debug
  Verbose = 5, // info + debug + verbose
}

export type OutputLevel = {
  Info?: boolean;
  Debug?: boolean;
  Verbose?: boolean;
};
