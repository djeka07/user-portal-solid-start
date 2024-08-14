import { Struct, assert, Failure, define, is } from 'superstruct';

export class SchemaError extends Error {
  isError: boolean;
  fieldErrors: { [field: string]: string | number } = {};

  constructor(message: string, field?: { [field: string]: string | number }) {
    super(message);
    this.isError = true;
    Object.keys(field || {}).forEach((f) => {
      this.fieldErrors[f] = (field || {})[f];
    });
  }
}

type Err = {
  failures: () => Failure[];
};

type ValidationResult = {
  isValid: boolean;
  formErrors?: { [key: string]: string };
};

export const validateSchema = <T>(schema: Struct<T>, formData: T): ValidationResult => {
  try {
    assert(formData, schema);
    return { isValid: true, formErrors: {} };
  } catch (err) {
    return {
      isValid: false,
      formErrors: (err as Err).failures()?.reduce((amount, current) => {
        return { ...amount, [current.key]: current.message };
      }, {}),
    };
  }
};

export const message = <T>(struct: Struct<T, unknown>, message: string): Struct<T, unknown> =>
  define('message', (value) => (is(value, struct) ? true : message));
