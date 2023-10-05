import { InputProps, refId } from "../controller/schema.controller";

export const formulary: InputProps[] = [
    {
        type: "text",
        name: "user",
        label: "Nombre do macaco",
        placeholder: "Usuario",
        value: "",
        validations: [
            { type: "requiredUntil", message: "llena el otro campo", ref: "doc", value: "some" }
        ],
        tooltipMsn: "<h1>Wagh<h1/>"
    },
    {
        type: "number",
        name: "doc",
        placeholder: "user id",
        value: "",
        validations: [
            {
                type: "minLength",
                value: 3,
                message: "Min. 3 characters",
            },
            {
                type: "maxLength",
                value: 8,
                message: "Max. 8 characters",
            },
            {
                type: "required",
                message: "user id is required"
            },
        ],

    },
    {
        type: "email",
        name: "email",
        placeholder: "E-mail",
        value: "",
        validations: [
            {
                type: "required",
                message: "Email is required"
            },
            {
                type: "isEmail",
                message: "Email no valid"
            }
        ],

    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        value: "",
        validations: [
            {
                type: "required",
                message: "Password is required"
            }
        ],
    },
    {
        type: "password",
        name: "passwordConfirmation",
        placeholder: "Password Confirm",
        value: "",
        validations: [
            {
                type: "required",
                message: "Confirmation is required"
            },
            {
                type: "oneOf",
                message: "password dont match",
                ref: "password"
            }
        ]
    },
    {
        type: "select",
        name: "rol",
        label: "Select an option: ",
        value: "",
        options: [
            {
                value: "admin",
                description: "Admin",
            },
            {
                value: "user",
                description: "User"
            },
            {
                value: "super-admin",
                description: "Super Admin"
            }
        ],
        validations: [
            {
                type: "required",
                message: "Rol is required"
            }
        ]
    },
    {
        name: "mondongo",
        type: "text",
        validations: [
            {
                type: "requiredWhen",
                message: "ahora es requerido por el rol", ref: "rol", value: "admin"
            },
            {
                type: "requiredWhen",
                message: "ahora es requerido por el usuario", ref: "user", value: "some"
            },
        ],
        value: "",
        label: "whe mondongo",
        placeholder: "mondongin",
    },
    {
        type: "checkbox",
        name: "genderOther",
        typeValue: "boolean",
        label: "No binario",
        value: false,
        validations: [
        ]
    },
    {
        type: "radio-group",
        name: "gender",
        label: "Gender: ",
        value: "",
        options: [
            {
                value: 'man',
                description: "Man"
            },
            {
                value: "woman",
                description: "Woman"
            },
            {
                value: "other",
                description: "Other"
            },
        ],
        validations: [
            { type: "requiredUntil", message: "Gender is required by default", ref: "genderOther", value: true }
        ]
    },
    {
        name: "department", type: "select", placeholder: "Departamento", label: "Departamento",
        validations: [{ message: "Escoja un departamento", type: "required" }], value: "",
        options: { fetchConfig: { url: "https://identifica.com.co:5044/departments?limit=0&page=0", selectors: ["id", "name", "items"] } }
    },
    {
        name: "municipio", type: "select", placeholder: "Municipio", label: "Municipio",
        validations: [{ message: "Escoja un municipio", type: "required" }], value: "",
        options: {
            fetchConfig: {
                url: `https://identifica.com.co:5044/municipalities/${refId}?limit=0&page=0`,
                selectors: ["id", "name", "items"]
            }, fieldRef: { inputRef: "department", emptyMsn: "Por favor seleccionar departamento" }
        }
    },
    {
        type: "checkbox",
        name: "terms",
        typeValue: "boolean",
        label: "Terms and Conditions",
        value: true,
        validations: [
            {
                type: "isTrue",
                message: "Accept the terms!"
            }
        ]
    },
]
