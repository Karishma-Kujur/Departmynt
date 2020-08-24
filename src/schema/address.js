import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("*Please Enter your first name"),
    lastName: Yup.string()
        .required("*Please Enter your last name"),
    email: Yup.string()
        .required("*Please Enter your email Id")
        .email("*Please Enter a valid email Id"),
    address1: Yup.string()
        .required("*Please Enter your address"),
    address2: Yup.string(),
    postcode: Yup.number("*Please Enter a valid postcode")
        .required("*Please Enter your postcode"),
    state: Yup.string()
        .required("*Please Enter your state"),
    city: Yup.string()
        .required("*Please Enter your city"),
    country: Yup.string()
        .required("*Please Enter your country"),
    phone: Yup.number("*Please Enter a valid phone")
        .required("*Please Enter your phone"),
});