import * as Yup from "yup";

export const ValidationSchemaAddProduct = Yup.object().shape({
    name: Yup.string()
        .required("le nom de fichier est obligatoire")
        .min(1, "trop petit!")
        .max(150, "trop long!"),
    price: Yup.string()
        .required("le nom de fichier est obligatoire")
        .matches(/^[0-9]+$/, "Must be only digits"),
    description: Yup.string()
        .required("le nom de fichier est obligatoire")
        .min(1, "trop petit!")
        .max(150, "trop long!"),
    category: Yup.string()
        .required("le nom de fichier est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    picture: Yup.mixed()
        // .test('required', "You need to provide a file", (value) =>{
        //   return value && value.length
        // })
        // .required('il faut charger au moins une image')
        // .test("fileSize", "The file is too large", (value, context) => {
        //   return value && value[0] && value[0].size <= 200000;
        // })
        // .test("type", "We only support jpeg", function (value) {
        //   return value && value[0] && value[0].type === "image/jpeg" || "image/png";
        // }),
        .notRequired()
        .test("fileSize", "The file is too large", (value, context) => {
          if (value && value[0]) {
            return value[0].size <= 200000; 
          } else {
            return true
          }
        })
        .test("type", "We only support jpeg", function (value) {
          if (value && value[0]) {
            return value[0].type === "image/jpeg" || "image/png";
          } else {
            return true
          }
        }),
    picture1: Yup.mixed()
        .notRequired()
        .test("fileSize", "The file is too large", (value, context) => {
          if (value && value[0]) {
            return value[0].size <= 200000; 
          } else {
            return true
          }
        })
        .test("type", "We only support jpeg", function (value) {
          if (value && value[0]) {
            return value[0].type === "image/jpeg" || "image/png";
          } else {
            return true
          }
        }),
    picture2: Yup.mixed()
        .notRequired()
        .test("fileSize", "The file is too large", (value, context) => {
          if (value && value[0]) {
            return value[0].size <= 200000; 
          } else {
            return true
          }
        })
        .test("type", "We only support jpeg", function (value) {
          if (value && value[0]) {
            return value[0].type === "image/jpeg" || "image/png";
          } else {
            return true
          }
        }),
    picture3: Yup.mixed()
        .notRequired()
        .test("fileSize", "The file is too large", (value, context) => {
          if (value && value[0]) {
            return value[0].size <= 200000; 
          } else {
            return true
          }
        })
        .test("type", "We only support jpeg", function (value) {
          if (value && value[0]) {
            return value[0].type === "image/jpeg" || "image/png";
          } else {
            return true
          }
        }),
})