import { EnvironmentVariablesException } from "@/utils/api/exceptions/EnvironmentVariablesException";

export class Environment {
  public static getEnvVariable(key: string) {
    const value = import.meta.env[`VITE_${key}`]; // Prefixing with VITE_ for Vite environment variables
    // If the variable doesn't exist, throw an exception
    if (!value) {
      throw new EnvironmentVariablesException(
        `Environment variable ${key} not found`
      );
    }

    return value;
  }
}
