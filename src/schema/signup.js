import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("*Please Enter your first name"),
    lastName: Yup.string()
        .required("*Please Enter your first name"),
    email: Yup.string()
        .required("*Please Enter your email Id")
        .email("*Please Enter a valid email Id"),
    password: Yup.string()
        .required("*Please Enter your password"),
    confirmPassword: Yup.string()
        .required("*Please Re Enter your Password")
        .label('Confirm password')
        .test('passwords-match', '*Your entered password doesnot match', function (value) {
            return this.parent.password === value;
        })
});