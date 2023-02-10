import * as Yup from "yup";

export const validationSchemaOpinion = Yup.object().shape({
    name: Yup.string()
        .required("le nom d'utilisateur est obligatoire")
        .min(1, "trop petit!")
        .max(150, "trop long!"),
    opinion: Yup.string()
        .required("l'avis est obligatoire")
        .min(5, "trop petit!")
        .max(150, "trop long!"),
});