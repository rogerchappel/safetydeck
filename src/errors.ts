export class SafetydeckError extends Error {
  constructor(message: string, readonly code = 'SAFETYDECK_ERROR') {
    super(message);
    this.name = 'SafetydeckError';
  }
}

export function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new SafetydeckError(`${field} must be a non-empty string`, 'INVALID_INPUT');
  }
}

export function assertStringArray(value: unknown, field: string): asserts value is string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new SafetydeckError(`${field} must be an array of non-empty strings`, 'INVALID_INPUT');
  }
}
