import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("*Please Enter a valid email Id")
        .email("*Please Enter a valid email Id"),
    password: Yup.string()
        .required("*Please Enter your password")
});