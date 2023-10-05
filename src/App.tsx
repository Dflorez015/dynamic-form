import { Formik } from 'formik'
import { InitialInputsConfig, getInputs } from './controller/schema.controller'
import { InputController } from './controller/inputs.controller'
import { SubmitButton } from './components/buttons'
import { formulary, formularyLayout } from './ejemp'
import { FormLayoutConfig, FormStyled } from './components/layout'

export function App() {
  // hooks
  const configForm = getInputs(formulary)

  return (
    <>
      <DynamicForm formConfig={configForm} layoutConfig={formularyLayout}/>
    </>
  )
}

/*------------------------------------------------- interface -------------------------------------------------*/

interface IDynamicFormProps {
  formConfig: InitialInputsConfig
  layoutConfig: FormLayoutConfig
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
export default function DynamicForm({ formConfig: { initialValues, inputs, validationSchema }, layoutConfig }: IDynamicFormProps) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log('values', values)}>
      {() => (
        <FormStyled $layoutForm={layoutConfig}>
          {inputs.map((input) => (
            <InputController {...input} key={input.name} />)
          )}
          <SubmitButton />
        </FormStyled>
      )}
    </Formik>
  )
}


