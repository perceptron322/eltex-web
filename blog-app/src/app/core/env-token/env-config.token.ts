import { InjectionToken } from "@angular/core";
import { EnvConfig } from "./env-config.interface";

export const ENV_CONFIG = new InjectionToken<EnvConfig>('ENV_CONFIG');