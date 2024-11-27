export class Entity {
  // Base method to dynamically map object properties to Record<string, string>
  toRecord(): Record<string, string> {
    const record: Record<string, string> = {};

    // Loop through the properties of the instance
    Object.getOwnPropertyNames(this).forEach((key) => {
      const value = this[key as keyof this]; // Use keyof to access property with type safety
      if (value !== undefined) {
        record[key] = String(value); // Ensure the value is converted to a string
      }
    });

    return record;
  }
}
