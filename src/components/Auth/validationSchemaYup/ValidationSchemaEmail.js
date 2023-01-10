import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("email invalide")
        .required("L'email est obligatoire"),
    confirmEmail: Yup.string()
    .required("L'email' de confirmation est obligatoire")
        .oneOf(
            [Yup.ref("email"), null],
            "L'email' de confirmation ne correspond pas"
        )
});