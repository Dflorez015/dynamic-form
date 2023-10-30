import { IDynamicForm } from "../App"
import { FormLayoutConfig } from "../components/layout"
import { InputProps, getInputs } from "../controller/schema.controller"

interface FormRes {
    formulary?: InputProps[]
    formularyLayout?: FormLayoutConfig
}

export const getTextConfig = async (url: string) => {
    const res = await fetch(url).catch(() => undefined)

    if (!res) return "Oops, algo salió mal "

    const file = await res.text()

    let config: IDynamicForm | undefined

    try {
        const formParsed = await JSON.parse(file) as FormRes
        if (formParsed.formulary) {
            const fileConfigForm = getInputs(formParsed.formulary)

            config = {
                formConfig: fileConfigForm,
                layoutConfig: formParsed.formularyLayout
            }
        }
    } catch (err) {
        return "Error: " + err
    }

    return config
}