import * as Yup from "yup";

export const validationSchemaMessage = Yup.object().shape({
    message: Yup.string()
        .required("le message est vide")
        //.matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(5, "trop petit!")
        .max(250, "trop long ca dépasse les 250 carachtères!"),
});