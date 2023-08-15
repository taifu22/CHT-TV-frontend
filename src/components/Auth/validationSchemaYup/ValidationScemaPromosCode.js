import * as Yup from "yup";

export const ValidationSchemaPromosCode = Yup.object().shape({
    code: Yup.string() 
        .required("le nom de fichier est obligatoire")
        .matches(/^[A-Z]{3,4}\d{2,3}$/, '6 carachtères requises dont 3/4 lettres majuscules et 2/3 chiffres')
        .min(5, "trop petit!")
        .max(7, "trop long!"),
    price: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Le prix n\'est pas valide')
        .required('Le prix est requis'),
    description: Yup.string()
        .required("la description est obligatoire")
        .matches(/^[A-Za-z0-9 ]+$/, 'Please enter valid description')
        .min(1, "trop petit!")
        .max(100, "trop long!"),  
})