import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required("le prenom est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    lastname: Yup.string()
        .required("le nom est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    email: Yup.string()
        .email("email invalide")
        //mise en place regex pour valider le mail par rapport au domaine
        .required("l'email est obligatoire"),
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
        ),
    acceptTerms: Yup.bool().oneOf(
        [true],
        "Accepter les conditions est obligatoire"
    ),
});