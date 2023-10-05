import { useFormikContext } from "formik"
import { useMemo, useEffect } from "react"
import { SelectWithRef, SelectFetchConfig } from "."
import { refId } from "../../controller/schema.controller"
import { useFetchOptions } from "./inputs.controller"

export const FetcherSelectWithRef = ({ fetchConfig, fieldRef, id }: SelectWithRef & { id: string }) => {
    const { values, setFieldValue } = useFormikContext<Record<string, string | number>>()
    const currentValue = values[fieldRef!.inputRef]

    const configOptions = useMemo(() => {
        return { url: fetchConfig.url.replace(refId, `${currentValue}`), selectors: fetchConfig.selectors }
    }, [currentValue])

    useEffect(() => {
        setFieldValue(id, "")
    }, [currentValue])

    if (!currentValue) return <option value="" disabled>{fieldRef?.emptyMsn ?? "Se requiere otro campo para habilitarse"}</option>

    return (<FetcherCustomeSelect options={configOptions} />)
}

export const FetcherCustomeSelect = ({ options }: { options: SelectFetchConfig }) => {
    const { items } = useFetchOptions(options)

    if (typeof items === 'string') return <option value="">{items}</option>

    return (
        <>
            <option value="">--- Seleccionar ---</option>
            {items.map(({ value, description }, index) => <option value={`${value}`} key={index}>{description}</option>)}
        </>
    )
}
