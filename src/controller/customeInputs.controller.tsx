/*-------------------------------------- config --------------------------------------*/

export interface ModalConfig {
    contentType: "list-select"
}

export interface CustomeInput {
    fieldTarget: string
    customeInputType: "modal"
    configuration: ModalConfig
}