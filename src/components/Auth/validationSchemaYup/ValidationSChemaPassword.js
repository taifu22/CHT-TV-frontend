import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required("Mot de passe est obligatoire")
     .matches(/([0-9])/, "Au moins un entier")
        .min(8, "Mot de passe doit être plus grand que 8 caractères")
        .max(50, "Mot de passe doit être plus petit que 50 caractères"),
    confirmPassword: Yup.string()
    .required("le mod de passe de confirmation est obligatoire")
        .oneOf(
            [Yup.ref("password"), null],
            "Le mot de passe de confirmation ne correspond pas"
        )
});