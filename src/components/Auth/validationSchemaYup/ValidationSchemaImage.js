import * as Yup from "yup";

export const ValidationSchemaImage = Yup.object().shape({
    name: Yup.string() 
        .required("le nom de fichier est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    picture: Yup.mixed()
        .test('required', "You need to provide a file", (value) =>{
          return value && value.length
        } )
        .test("fileSize", "The file is too large", (value, context) => {
          return value && value[0] && value[0].size <= 200000;
        })
        .test("type", "We only support jpeg", function (value) {
          return value && value[0] && value[0].type === "image/jpeg" || "image/png";
        })
})