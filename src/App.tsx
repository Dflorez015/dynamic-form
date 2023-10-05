import { Form, Formik } from 'formik'
import styles from './App.module.css'
import { InitialInputsConfig, getInputs } from './controller/schema.controller'
import { InputController } from './controller/inputs.controller'
import { SubmitButton } from './components/buttons'
import { formulary } from './ejemp'

export function App() {
  // hooks
  const configForm = getInputs(formulary)

  return (
    <>
      <DynamicForm formConfig={configForm} />
    </>
  )
}

/*------------------------------------------------- interface -------------------------------------------------*/

interface IDynamicFormProps {
  formConfig: InitialInputsConfig
}

/*------------------------------------------------- component -------------------------------------------------*/
/**
 * componente de formulario dinámico
 * enlista una serie de campos ordenados con sus respectivas validaciones
 * @param {IDynamicFormProps} {formConfig}
 * @returns 
 * @example <DynamicForm formConfig={{initialValues: {name:"pedro"}, 
 * inputs:[{name:"name", value:"", type:"text"}], validationSchema:[{ type: "required",message:"ingresar nombre"}] }}/>
 */
export default function DynamicForm({ formConfig: { initialValues, inputs, validationSchema } }: IDynamicFormProps) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log('values', values)}>
      {() => (
        <Form noValidate className={styles.form__wrapper}>
          {inputs.map((input) => (
            <InputController {...input} key={input.name} />)
          )}
          <SubmitButton />
        </Form>
      )}
    </Formik>
  )
}


