import { CustomCheckBox, CustomRadioGroup, CustomSelect, CustomTextInput } from "../components/inputs";
import { InputProps, inputTypes } from "./schema.controller";
import { IconTooltip } from '../components/buttons';
import styles from "../App.module.css"
import { CustomeInput } from "./customeInputs.controller";

/*-------------------------------------- config --------------------------------------*/

interface IInputController extends InputProps { }
interface IInputCustomeController extends CustomeInput { }

/*-------------------------------------- components --------------------------------------*/

/**
 * switch form inputs components
 * @param param0 
 * @returns 
 */
export const InputController = ({ type, name, value, tooltipMsn, validations, ...props }: IInputController) => {
    return (
        <div className={styles.form__row__wrapper}>
            {tooltipMsn ? (<IconTooltip msn={tooltipMsn} name={name} />) : null}

            {(
                {
                    "checkbox": <CustomCheckBox label={props.label!} key={name} name={name} />,
                    "select": <CustomSelect key={name} label={props.label!} name={name} options={props.options ?? []} />,
                    "radio-group": <CustomRadioGroup label={props.label} key={name} name={name} options={props.options ?? []} />,
                } as Record<inputTypes, React.ReactNode>
            )[type] ?? <CustomTextInput label={props.label} key={name} name={name} placeholder={props.placeholder} type={type} />}
        </div>
    )
}

export const InputCustomeController = ({ customeInputType, configuration, fieldTarget }: IInputCustomeController) => {
    return (
        <div className={styles.form__row__wrapper}>
            {({
                "modal": <></>
            })[customeInputType]}
        </div>
    )
}