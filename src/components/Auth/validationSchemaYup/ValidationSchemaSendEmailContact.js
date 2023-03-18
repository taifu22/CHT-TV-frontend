import * as Yup from "yup";

export const ValidationSchemaSendEmailContact = Yup.object().shape({
    name: Yup.string()
        .required("le nom est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    email: Yup.string()
        .email("email invalide")
        .required("l'email est obligatoire"),
    object: Yup.string()
        .required("l'object est obligatoire")
        .min(10, "trop petit!"),
    textMessage: Yup.string()
        .required("le message est obligatoire")
        .min(10, "trop petit!")
        .max(300, "trop long! il ne faut pas dépasser 300 carachtères"),
});