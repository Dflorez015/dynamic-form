import { Form, Formik } from 'formik'
import styles from './App.module.css'
import { getInputs } from './controller/schema.controller'
import { InputController } from './controller/inputs.controller'
import { SubmitButton } from './components/buttons'
import { formulary } from './ejemp'

const { initialValues, inputs, validationSchema } = getInputs(formulary)

function App() {

  return (
    <>
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
    </>
  )
}

export default App

