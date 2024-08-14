import { Struct } from 'superstruct';
import { SchemaError, validateSchema } from '../../helpers/schema';
import { createSignal, Accessor } from 'solid-js';

type UseFormProps<T> = {
  initialForm: T;
  validate?: Struct<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubmitHandler<T> = (data: T, event: Event) => any | Promise<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubmitErrorHandler = (error: SchemaError['fieldErrors'], event?: Event) => any | Promise<any>;

type UseFormReturn<T> = {
  // form: T;
  errors: Accessor<SchemaError['fieldErrors']>;
  get: Accessor<T>;
  update: (event: Event) => void;
  clearField: (fieldName: string) => void;
  clear: () => void;
  handleSubmit: (isValid: SubmitHandler<T>, isInvalid?: SubmitErrorHandler) => (event: Event) => Promise<void>;
};

const useForm = <T extends { [key: string]: string | boolean | number }>({
  initialForm,
  validate,
}: UseFormProps<T>): UseFormReturn<T> => {
  const [form, setForm] = createSignal<T>(initialForm);
  const [errors, setErrors] = createSignal({});

  const clearField = (fieldName: string) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: '',
    }));
  };

  const clear = () => {
    setForm(
      (prevForm) =>
        Object.keys(prevForm).reduce((amount, curr) => {
          return {
            ...amount,
            [curr]: '',
          };
        }, {}) as T,
    );
  };

  const update = (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    const fieldName = inputElement.name;
    if (inputElement.type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [fieldName]: !!inputElement.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [fieldName]: inputElement.value,
      }));
    }
  };

  // eslint-disable-next-line solid/reactivity
  const handleSubmit = (isValid: SubmitHandler<T>, isInValid?: SubmitErrorHandler) => async (event: Event) => {
    event.preventDefault();
    if (validate) {
      const { isValid, formErrors } = validateSchema(validate, form());
      if (!isValid) {
        setErrors(formErrors as SchemaError['fieldErrors']);
        if (isValid !== undefined) {
          return await isInValid?.(formErrors as SchemaError['fieldErrors'], event);
        }
      } else {
        setErrors({});
      }
    }
    return await isValid(form(), event);
  };

  return { update, clearField, handleSubmit, errors: errors, get: form, clear };
};

export { useForm };
