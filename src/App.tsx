import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { FormLayoutConfig, FormStyled } from './components/layout'
import { SubmitButton } from './components/buttons'
import styles from './App.module.css'
import { InitialInputsConfig, getInputs } from './controller/schema.controller'
import { InputController } from './controller/inputs.controller'
import { formulary, formularyLayout } from './ejemp'
import { getTextConfig } from './services'

export function App() {
  // hooks
  const configForm = getInputs(formulary)

  return (
    <>
      <DynamicForm formConfig={configForm} layoutConfig={formularyLayout} handleSubmit={(data) => console.log('data', data)} />
      <DynamicForm url='http://localhost:8080/task/aws' handleSubmit={(data) => console.log('data', data)} />
    </>
  )
}

/*------------------------------------------------- interface -------------------------------------------------*/

type FormDataType = Record<string, string | number | boolean>

export interface IDynamicForm {
  formConfig?: InitialInputsConfig
  layoutConfig?: FormLayoutConfig
}

interface IDynamicFormProps extends IDynamicForm {
  handleSubmit?: (data: FormDataType) => void
  url?: string
}

interface IFormTxtController { url: string, handleSubmit: (data: FormDataType) => void }

/*------------------------------------------------- component -------------------------------------------------*/
/**
 * componente de formulario dinámico
 * enlista una serie de campos ordenados con sus respectivas validaciones
 * @param {IDynamicFormProps} {formConfig}
 * @returns 
 * @example <DynamicForm formConfig={{initialValues: {name:"pedro"},
 * inputs:[{name:"name", value:"", type:"text"}], validationSchema:[{ type: "required",message:"ingresar nombre"}] }}/>
 * @example <DynamicForm url={"url"}/>
 */
export default function DynamicForm({ formConfig, layoutConfig, url, handleSubmit = (data) => console.log('data', data) }: IDynamicFormProps) {

  if (url) return <FormTxtController url={url} handleSubmit={handleSubmit} />

  if (!formConfig || !layoutConfig) return <></>

  return (
    <Formik initialValues={formConfig.initialValues} validationSchema={formConfig.validationSchema} onSubmit={(values) => handleSubmit(values)}>
      {() => (
        <FormStyled $layoutForm={layoutConfig}>
          {formConfig.inputs.map((input) => (
            <InputController {...input} key={input.name} />)
          )}
          <SubmitButton />
        </FormStyled>
      )}
    </Formik>
  )
}

/**
 * componente de formulario dinámico.
 * que lee una url y renderiza su contenido si es un objeto válido
 * @param {IFormTxtController} {url} 
 * @returns 
 * @example <DynamicForm url='/ejemp.json' />
 */
export const FormTxtController = ({ url ,handleSubmit}: IFormTxtController) => {
  const [config, setConfig] = useState<string | IDynamicForm>()

  useEffect(() => {
    try {
      getTextConfig(url).then((res) => {

        setConfig(res)
      })
    } catch (e) {
      setConfig("Oops!, algo salió mal")
    }
  }, [url])

  if (typeof config === "string") return <span className={styles.error__span}>{config}</span>

  if (!config) return <></>

  return (
    <DynamicForm formConfig={config.formConfig} layoutConfig={config.layoutConfig} handleSubmit={handleSubmit}/>
  )
}