import { useForm, Controller, SubmitHandler } from "react-hook-form";
import './App.css'

interface IFormInputs {
  TextField: string
  NumberField: number | string
}

export default function App() {
  const { handleSubmit, control, reset, formState } = useForm<IFormInputs>({
    defaultValues: {
      TextField: '',
      NumberField: ''
    },
    mode: 'all'
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log('data')
    console.log(data)
    console.log('formState')
    console.log(formState)
  };
  // надо прописать функцию обработки сабмита с ошибками, тогда их можно будет выцепить
  const onError = (errors: any, e: any) => {
    console.log('formState')
    console.log(formState) // а вот тут они так и не показываются
    console.log('errors')
    console.log(errors)
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <label>Text input</label>
      <Controller
        name="TextField"
        control={control}
        rules={{
          required: 'Поле обязательно к заполнению',
        }}
        render={({ field, fieldState }) => <>
          <input
            value={field.value}
            onChange={(e) => {
              console.log('FieldState - TextField: ')
              console.log(fieldState)
              field.onChange(e)
            }}
          />
          <span className="err">{!!fieldState.error && `error: ${fieldState.error.message}`}</span>
        </>
        }
      />
      <label>Number input</label>
      <Controller
        name="NumberField"
        control={control}
        rules={{
          required: 'Поле обязательно к заполнению',
          pattern: {
            value: /\d{4}$/,
            message: 'Только цифры'
          }
        }}
        render={({ field, fieldState }) => <>
          <input
            value={field.value}
            onChange={(e) => {
              console.log('FieldState - NumberField: ')
              console.log(fieldState)
              field.onChange(e)
            }}
          />
          <span className="err">{!!fieldState.error && `error: ${fieldState.error.message}`}</span>
        </>}
      />
      <input className="submitBtn" type="submit" />
    </form>
  );
}
