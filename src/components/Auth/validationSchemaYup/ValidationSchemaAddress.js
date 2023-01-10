import * as Yup from "yup";

export const validationSchemaAddress = Yup.object().shape({
    firstname: Yup.string()
        .required("le prenom est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    lastname: Yup.string()
        .required("le nom est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    street: Yup.string()
        .required("la rue est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    city: Yup.string()
        .required("la ville est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    country: Yup.string()
        .required("le pays est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
});