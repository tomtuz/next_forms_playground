import { OutputLevel } from "@/utils/logger/types";

export const appConfig: AppConfig = {
  loggingMode: {
    Info: true,
    Debug: true,
    Verbose: false,
  },
} as const;

export interface AppConfig {
  loggingMode: OutputLevel;
} 
