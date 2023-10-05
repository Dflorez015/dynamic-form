# Formulario dinámico

Este proyecto consta en que por una serie de parámetros se cree un formulario con distintas validaciones.

## Configuración
En un principio la entrada de la configuración está dada por una interfaz: *InputProps* el cual tiene que ser un listado:

```ts
interface InputProps {
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
```

#### validations
Las validaciones de los campos constan de la siguiente estructura:

```ts
interface Validation {
    // tipo de validation, si es requerida, es email, es requerida cuando..., etc.
    type: 'required' | 'isEmail' | 'minLength' | 'isTrue' | 'maxLength' | 'oneOf' | 'requiredWhen' | 'requiredUntil'
    value?: string | number | boolean // esta opción es requerida para los tipos de validaciones como maxLength, minLength, requiredUntil
    message: string | 'some' // mensaje que aparece cuando se detecta un error en el diligenciamiento del campo
    ref?: string // esta opción es requerida para los tipos de validaciones que dependen de otros campos en el formulario, como: requiredUntil, requiredWhen, oneOf
}
```

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
