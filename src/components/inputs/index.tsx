import { HTMLAttributes, HTMLInputTypeAttribute } from "react";
import { ErrorMessage, useField } from "formik";
import styles from "../../App.module.css";
import { FetcherCustomeSelect, FetcherSelectWithRef } from "./Elements";

/*-------------------------------- config --------------------------------*/

export type SelectOptions = { value: string | number, description: string }
export type SelectFetchConfig = { url: string, selectors: [string, string] | [string, string, string] }
export type SelectFieldRef = { inputRef: string, emptyMsn: string }
export type SelectWithRef = { fetchConfig: SelectFetchConfig, fieldRef?: SelectFieldRef }

export interface Props {
    label?: string;
    value?: string
    name: string;
    [key: string]: string | SelectOptions[] | undefined | SelectWithRef
}

export interface TextProps extends Props {
    type: HTMLInputTypeAttribute
}

export interface SelectProps extends Props {
    options: SelectOptions[] | SelectWithRef
}

export interface GroupProps extends Props {
    options: SelectOptions[]
}

/*-------------------------------- components --------------------------------*/

export const CustomTextInput = (props: TextProps & HTMLAttributes<HTMLInputElement>) => {
    const [field] = useField(props)

    return (
        <>
            <label htmlFor={props.name || props.id}> {props.label} </label>
            <input {...field} {...props} />
            <ErrorMessage name={props.name} component="span" className={styles.error__span} />
        </>
    )
}

export const CustomCheckBox = (props: Props & HTMLAttributes<HTMLInputElement>) => {
    const [field] = useField(props)

    return (
        <>
            <label>
                <input type="checkbox" {...field} {...props} checked={field.value} />
                <span>{props.label}</span>
            </label>

            <ErrorMessage name={props.name} component="span" className={styles.error__span} />
        </>
    )
}

export const CustomSelect = ({ label, options, ...props }: SelectProps & HTMLAttributes<HTMLSelectElement>) => {
    const [field] = useField(props)

    if ("fetchConfig" in options) {
        return (
            <>
                <label htmlFor={props.name || props.id}> {label} </label>
                <select {...field} {...props} >
                    {(options.fieldRef) ? (<FetcherSelectWithRef {...options} id={props.id || props.name} />) : <FetcherCustomeSelect options={options.fetchConfig} />}
                </select>
                <ErrorMessage name={props.name} component="span" className={styles.error__span} />
            </>
        )
    }

    return (
        <>
            <label htmlFor={props.name || props.id}> {label} </label>

            <select {...field} {...props} >
                <option value="">--- Seleccionar ---</option>
                {
                    options.map(({ description, value }) => (
                        <option value={value} key={value}>{description}</option>
                    ))
                }
            </select>

            <ErrorMessage name={props.name} component="span" className={styles.error__span} />
        </>
    )
}

export const CustomRadioGroup = ({ label, options, ...props }: SelectProps & HTMLAttributes<HTMLInputElement>) => {
    const [field] = useField(props)

    if ("fetchConfig" in options) {
        return (
            <>
                <div>
                    <b>{label}</b>
                </div>
                <ErrorMessage name={props.name} component="span" className={styles.error__span} />
            </>
        )
    }

    return (
        <>
            <div>
                <b>{label}</b>
                {
                    options.map(opt => (
                        <label key={opt.value}>
                            <input {...field} {...props} type="radio" value={opt.value} checked={opt.value === field.value} />
                            {opt.description}
                        </label>
                    ))
                }
            </div>
            <ErrorMessage name={props.name} component="span" className={styles.error__span} />
        </>
    )
}