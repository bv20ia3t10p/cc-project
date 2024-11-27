export class EnvironmentVariablesException extends Error {
  constructor(key: string) {
    super("Failed to get environment for key: " + key); // Call the parent (Error) class constructor
    this.name = "EnvVarExc"; // Set a custom name for the error
  }
}
