import * as Yup from 'yup';
import { SelectWithRef, SelectOptions } from "../components/inputs"

/*-------------------------------------- config --------------------------------------*/
export const refId = "__refId__"

// validacion para el campo en concreto
export interface Validation {
    // tipo de validation, si es requerida, es email, es requerida cuando..., etc.
    type: 'required' | 'isEmail' | 'minLength' | 'isTrue' | 'maxLength' | 'oneOf' | 'requiredWhen' | 'requiredUntil'
    value?: string | number | boolean // esta opción es requerida para los tipos de validaciones como maxLength, minLength, requiredUntil
    message: string | 'some' // mensaje que aparece cuando se detecta un error en el diligenciamiento del campo
    ref?: string // esta opción es requerida para los tipos de validaciones que dependen de otros campos en el formulario, como: requiredUntil, requiredWhen, oneOf
}

export type inputTypes = 'text' | 'radio-group' | 'email' | 'password' | 'select' | 'checkbox' | 'number'

// configuración de cada campo
export interface InputProps {
    name: string // id del campo
    value: string | number | boolean // valor inicial
    placeholder?: string // marcador del campo
    type: inputTypes // naturaleza del campo (si es select, checkbox, etc.)
    validations: Validation[] // las distintas validaciones que tendrá el campo
    label?: string // etiqueta del campo
    typeValue?: 'string' | 'boolean' // establece el tipo de valor en el esquema del formulario (si se evaluará como string o booleano)
    options?: SelectOptions[] | SelectWithRef // opciones iniciales para los radio button o selects. Como también puede ser una configuración para pedir un listado de opciones para un select
    tooltipMsn?: string // mensaje del tooltip informativo
}

type YupBoolean = Yup.BooleanSchema<boolean | undefined, Yup.AnyObject, boolean | undefined>
type YupString = Yup.StringSchema<string | undefined, Yup.AnyObject, string | undefined>

export interface InitialInputsConfig {
    validationSchema: Yup.ObjectSchema<{ [x: string]: string | boolean | undefined; }, Yup.AnyObject, { [x: string]: string | boolean | undefined; }, "">
    initialValues: Record<string, string | number | boolean>
    inputs: InputProps[]
}

/*-------------------------------------- functions --------------------------------------*/

/**
 * get a form configuration and return a formik props
 * @param {InputProps[]} forms 
 * @returns 
 */
export const getInputs = (forms: InputProps[]): InitialInputsConfig => {

    let initialValues: Record<string, string | number | boolean> = {};

    let validationsFields: Record<string, YupBoolean | YupString> = {};

    for (const field of forms) {

        initialValues[field.name] = field.value;

        if (!field.validations || field.validations.length == 0) continue;

        const schema = generateValidations(field)

        validationsFields[field.name] = schema;
    }

    return {
        validationSchema: Yup.object({ ...validationsFields }),
        initialValues,
        inputs: forms,
    };
}


/**
 * generate schema validation
 * @param {InputProps} field  current field configuration
 */
const generateValidations = (field: InputProps) => {

    let schema: YupBoolean | YupString = Yup[field.typeValue ? field.typeValue : 'string']()

    for (const rule of field.validations) {
        switch (true) {
            case (rule.type == 'isTrue' && schema instanceof Yup.boolean): { // válida si el campo tiene valor true
                //@ts-ignore
                schema = (schema as YupBoolean).isTrue(rule.message);
                break;
            }
            case (rule.type == 'isEmail' && schema instanceof Yup.string): { // válida si el campo es email
                schema = (schema as YupString).email(rule.message);
                break;
            }
            case (rule.type == 'minLength' && schema instanceof Yup.string): { // válida si el campo tiene una anchura de carácteres minima
                schema = (schema as YupString).min(rule?.value as number, rule.message);
                break;
            }
            case (rule.type == 'maxLength' && schema instanceof Yup.string): { // válida si el campo tiene una anchura de carácteres máxima
                schema = (schema as YupString).max(rule?.value as number, rule.message);
                break;
            }
            case (rule.type == 'oneOf' && Boolean(rule.ref) && schema instanceof Yup.string): { // válida si el campo tiene un valor igual a otro por referencia
                schema = (schema as YupString).oneOf([Yup.ref(rule.ref!)], rule.message);
                break
            }
            case (rule.type == 'requiredWhen' && rule.ref != undefined): { // válida como requerido el campo si otro por referencia contiene un valor en concreto o tiene algún valor
                schema = (schema as YupString).when(rule.ref!, (refValue, currentSchema) => {
                    if (refValue.includes(rule.value) || (rule.value == "some" && !refValue.includes(undefined))) {
                        return currentSchema.required(rule.message)
                    }
                    return currentSchema
                });
                break;
            }
            case (rule.type == 'requiredUntil' && rule.ref != undefined): {// válida como requerido el campo hasta que otro por referencia contiene un valor en concreto o tiene algún valor
                schema = (schema as YupString).when(rule.ref!, (refValue, currentSchema) => {
                    if (refValue.includes(rule.value) || (rule.value == "some" && !refValue.includes(undefined))) {
                        return currentSchema
                    }
                    return currentSchema.required(rule.message)
                });
                break;
            }
            default: schema = schema.required(rule.message); break;
        }
    }

    return schema
}