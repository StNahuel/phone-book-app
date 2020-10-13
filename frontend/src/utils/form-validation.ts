import * as Yup from 'yup';

const standardRequiredMessage = "This field is required.";
const validEmailMessage = "Please enter a valid email address.";
const validPhoneMessage = "Invalid phone format.";
const minPasswordLengthMessage = "Password must contain at least 6 characters."

export const loginValidationSchema = Yup.object({
  email: Yup.string().email(validEmailMessage).required(standardRequiredMessage),
  password: Yup.string().min(6, minPasswordLengthMessage).required(standardRequiredMessage),
})

export const newContactValidationSchema = Yup.object({
  first_name: Yup.string().required(standardRequiredMessage),
  last_name: Yup.string().required(standardRequiredMessage),
  phone: Yup.string()
            .min(9)
            .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, validPhoneMessage)
            .required(standardRequiredMessage),
})