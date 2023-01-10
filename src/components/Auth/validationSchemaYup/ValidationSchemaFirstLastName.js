import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required("le prenom est obligatoire")
        //.matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    lastname: Yup.string()
        .required("le nom est obligatoire")
        //.matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
});