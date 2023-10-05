import { useFormikContext } from "formik"
import { Tooltip } from "react-tooltip"
import styles from "../../App.module.css"

export const SubmitButton = () => {
    const { isValid, dirty, isSubmitting } = useFormikContext()

    return (
        <button className={styles.btn__submit} disabled={!isValid || !dirty || isSubmitting} type="submit">Submit</button>
    )
}

export const IconTooltip = ({ msn, name }: { msn: string, name: string }) => {
    return (
        <>
            <img src="../../inputInformation.svg" data-tooltip-id={`tooltip-${name}`} />

            <Tooltip id={`tooltip-${name}`} className={styles.tooltip__wrapper} variant='light' place='top-start' offset={5} openOnClick >
                <>
                    <div dangerouslySetInnerHTML={{ __html: msn }} />
                </>
            </Tooltip>
        </>
    )
}