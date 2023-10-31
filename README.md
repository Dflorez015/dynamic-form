
# Formulario dinámico

  

Este proyecto consta en que por una serie de parámetros se cree un formulario con distintas validaciones.

  

## Configuración de la lógica del formulario

En un principio la entrada de la configuración está dada por una interfaz: *InputProps* el cual tiene que ser un listado:

  

```ts

interface  InputProps {

name: string  // id del campo

value: string | number | boolean  // valor inicial

placeholder?: string  // marcador del campo

type: inputTypes  // naturaleza del campo (si es select, checkbox, etc.)

validations: Validation[] // las distintas validaciones que tendrá el campo

label?: string  // etiqueta del campo

typeValue?: 'string' | 'boolean'  // establece el tipo de valor en el esquema del formulario (si se evaluará como string o booleano)

options?: SelectOptions[] | SelectWithRef  // opciones iniciales para los radio button o selects. Como también puede ser una configuración para pedir un listado de opciones para un select

tooltipMsn?: string  // mensaje del tooltip informativo

}

```

  

### Validations
Las validaciones de los campos constan de la siguiente estructura:

```ts

interface  Validation {

// tipo de validation, si es requerida, es email, es requerida cuando..., etc.

type: 'required' | 'isEmail' | 'minLength' | 'isTrue' | 'maxLength' | 'oneOf' | 'requiredWhen' | 'requiredUntil'

value?: string | number | boolean | 'some'// esta opción es requerida para los tipos de validaciones como maxLength, minLength, requiredUntil (si para estas validaciones pones "some" en 'value' entonces dichas validaciones se disparan cuando se detencten un valor x)

message: string  // mensaje que aparece cuando se detecta un error en el diligenciamiento del campo

ref?: string  // esta opción es requerida para los tipos de validaciones que dependen de otros campos en el formulario, como: requiredUntil, requiredWhen, oneOf

}

```

  

## Distribución de los campos en el formulario

La distribución está dada por una interfaz: *FormLayoutConfig* la cual es un objeto que consta de la siguiente estructura:

  

```ts

interface  FormLayoutConfig {

numCols: number; // asigna cuantas columnas tendrá el formulario (vease grid)

fields: ItemRowLayout[] // lista de los campos que tiene el formulario

justifyButtons?: "start" | "end" | "center"  // esta opción permite ubicar las acciones en una alineación

}

```

  

### Fields

Los campos constan de una configuración las cuales asignan su posición en el formulario:

  

```ts

interface  ItemRowLayout {

fieldName: string; // el nombre del campo correspondiente

gridColumn: string; // la columna en la cual se quiere que esté el campo (se puede usar la nomenclatura de css grid-column https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column)

gridRow  // la fila en la cual se quiere que esté el campo (se puede usar la nomenclatura de css grid-column https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row)

}

```

  

## ¿Qué hacer después?

Ya una vez tenida la configuración se procede a ejecutar la en el componente ```<DynamicForm/>```, el cual permite agregar le por parámetro la configuración o una url que pueda contener dicha configuración.

### Por URL
Esta es una opción que te permite realizar una petición a cualquier URL y posterior a ella obtener una configuración que permita renderizar el formulario deseado.

> Ejemplo: Se podría colocar como props del componente la siguiente URL : http://localhost:8080/task/aws
> La cual retorna un json el cual tiene como estructura: 
> 
``` json
{
  "formulary": [
    {
      "type": "number", // es un campo numerico
      "name": "doc", // su id será doc
      "placeholder": "user id", // tendrá un placeholder
      "value": "", // su valor inicial es ""
      "validations": [
        {
          "type": "minLength", // se valida que tenga más de x carácteres
          "value": 3, // en este contexto de la validación debe tener más de 3 carácteres
          "message": "Min. 3 characters" // mensaje que se muestra 
          // cuando se detecta la validación
        },
        {
          "type": "maxLength", // se valida que tenga un máximo de x carácteres
          "value": 8, // en este contexto de la validación debe tener máximo de 8 carácteres
          "message": "Max. 8 characters" // mensaje que se muestra 
          // cuando se detecta la validación
        },
        {
          "type": "required", // el campo es requerido (no debe ser vacio)
          "message": "user id is required"// mensaje que se muestra 
          // cuando se detecta la validación
        }
      ]
    },
    {
      "type": "text",
      "name": "user",
      "label": "Nombre do macaco",
      "placeholder": "Usuario",
      "value": "",
      "validations": [
        {
	     // requerido hasta que otro campo esté diligenciado o tenga un valor en especifico
          "type": "requiredUntil", 
          "message": "llena el otro campo", // mensaje que se muestra 
          // cuando se detecta la validación
          "ref": "doc", // campo al cual se referencia (o sea el cual se tiene que llenar antes)
          "value": "some" // es la validación que se evaluará con respecto al campo
          // referenciado ("ref":"doc"), en este caso el campo doc debe algún valor y ser
          // distinto a ""
        }
      ],
      "tooltipMsn": "<h1>Wagh<h1/>" // tooltip de caracter informativo
    }
  ],
  "formularyLayout": { // distribución de los campos
    "numCols": 2, // este formulario tiene solo 2 columnas [][]
    "justifyButtons": "center", // el botón de subir estará centrado
    "fields": [
      {
        "fieldName": "user", // campo el cual se desea posicionar
        "gridColumn": "1", // el campo user estará en la primera columna [X][]
        "gridRow": "1" // el campo user estará en la primera fila [X][]
      },
      {
        "fieldName": "doc", // campo el cual se desea posicionar
        "gridColumn": "2", // el campo doc estará en la segunda columna [][X]
        "gridRow": "1" // el campo user estará en la primera fila [][X] 
      }
    ]
  }
}
```
> Una vez implementada dicha URL y retorne ya un JSON válido para el sistema se podrá previsualizar el formulario en donde instanciaste el componente

### Por configuración
Esta es una opción que te permite realizar una petición a cualquier URL y posterior a ella obtener una configuración que permita renderizar el formulario deseado.
> Ejemplo: Se podría crear 2 constantes las cuales tuviesen las configuraciones correspondientes, o sea una que tenga el esquema del formulario y el otro el diseño/distribución de los campos.
>*Se usará el mismo objeto del ejemplo por URL*
```ts
export const formulary: InputProps[] = [
	{
      "type": "number", // es un campo numerico
      "name": "doc", // su id será doc
      "placeholder": "user id", // tendrá un placeholder
      "value": "", // su valor inicial es ""
      "validations": [
        {
          "type": "minLength", // se valida que tenga más de x carácteres
          "value": 3, // en este contexto de la validación debe tener más de 3 carácteres
          "message": "Min. 3 characters" // mensaje que se muestra 
          // cuando se detecta la validación
        },
        {
          "type": "maxLength", // se valida que tenga un máximo de x carácteres
          "value": 8, // en este contexto de la validación debe tener máximo de 8 carácteres
          "message": "Max. 8 characters" // mensaje que se muestra 
          // cuando se detecta la validación
        },
        {
          "type": "required", // el campo es requerido (no debe ser vacio)
          "message": "user id is required"// mensaje que se muestra 
          // cuando se detecta la validación
        }
      ]
    },
    {
      "type": "text",
      "name": "user",
      "label": "Nombre do macaco",
      "placeholder": "Usuario",
      "value": "",
      "validations": [
        {
	     // requerido hasta que otro campo esté diligenciado o tenga un valor en especifico
          "type": "requiredUntil", 
          "message": "llena el otro campo", // mensaje que se muestra 
          // cuando se detecta la validación
          "ref": "doc", // campo al cual se referencia (o sea el cual se tiene que llenar antes)
          "value": "some" // es la validación que se evaluará con respecto al campo
          // referenciado ("ref":"doc"), en este caso el campo doc debe algún valor y ser
          // distinto a ""
        }
      ],
      "tooltipMsn": "<h1>Wagh<h1/>" // tooltip de caracter informativo
    }
]

export const formularyLayout: FormLayoutConfig  = { 
    "numCols": 2, // este formulario tiene solo 2 columnas [][]
    "justifyButtons": "center", // el botón de subir estará centrado
    "fields": [
      {
        "fieldName": "user", // campo el cual se desea posicionar
        "gridColumn": "1", // el campo user estará en la primera columna [X][]
        "gridRow": "1" // el campo user estará en la primera fila [X][]
      },
      {
        "fieldName": "doc", // campo el cual se desea posicionar
        "gridColumn": "2", // el campo doc estará en la segunda columna [][X]
        "gridRow": "1" // el campo user estará en la primera fila [][X] 
      }
    ]
}
```
> Ya una vez creadas solo sería llamarlas como props del componente ```<DynamicForm/>```  y así poder renderizar el formulario.


---------------------------------------------------

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
