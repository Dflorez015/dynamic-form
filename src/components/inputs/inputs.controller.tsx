import { useState, useEffect } from "react"
import { SelectFetchConfig, SelectOptions } from "."

/**
 * realiza una petición a la configuración de peticiones proveniente y adapta la data
 * @param {SelectFetchConfig} options - option configuration
 * @returns {Array<any> | string}
 * @example useFetchOptions({url: "https://identifica.com.co:5044/departments?limit=0&page=0", selectors: ["id", "name", "items"]})
 */
export const useFetchOptions = (options: SelectFetchConfig) => {
    const [items, setItems] = useState<SelectOptions[] | string>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(options.url, { cache: "reload", credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } })
                .then(async (data) => {
                    const newData = await data.json()
                    const [key, value, root] = options.selectors
                    if (root) {
                        return newData[root].map((data: Record<string, string>) => ({ value: data[key], description: data[value] }))
                    }
                    return newData.map((data: Record<string, string>) => ({ value: data[key], description: data[value] }))
                }).catch(() => "Oops, ¡hubo un error en la consulta!")

            setItems(response)
        }
        fetchData()
    }, [options])

    return { items }
}