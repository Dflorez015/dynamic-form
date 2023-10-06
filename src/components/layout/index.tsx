import { styled } from "styled-components"
import { Form } from "formik";
import styles from '../../App.module.css'

/*------------------- config -------------------*/

export interface ItemRowLayout {
    itemStyle?: string
    fieldName: string
    gridColumn: string
    gridRow: string
}

export interface FormLayoutConfig {
    numCols: number
    fields: ItemRowLayout[]
    justifyButtons?: "start" | "end" | "center"
}

interface IFormStyle {
    $layoutForm: FormLayoutConfig
}

/*------------------- styles -------------------*/

export const FormStyled = styled(Form).attrs(() => ({
    noValidate: true, className: styles.form__wrapper
})) <IFormStyle>`
    display: grid;
    align-items: start;
    grid-template-rows: repeat(auto-fill, minmax(20px, 70px));

    & ${styles.btns__wrapper} {
        background-color: red;
    }

    ${({ $layoutForm }) => {
        const { fields, numCols, justifyButtons = "end" } = $layoutForm

        let css = `grid-template-columns: ${" 1fr".repeat(numCols)};`

        for (const row of fields) {
            css += `
                & > div[data-column="${row.fieldName}"] {
                    grid-column: ${row.gridColumn};
                    grid-row: ${row.gridRow};
                    ${row.itemStyle || ""};
                }
            `
        }

        css += `
            & > div.${styles.btns__wrapper} {
                justify-content: ${justifyButtons};
            }
        `

        return css
    }}    
`