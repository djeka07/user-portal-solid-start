import { SchemaError } from '~/app/helpers/schema';

export type FormError = Error & SchemaError;
