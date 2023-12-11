import * as yup from "yup";

export const registerSchema=yup.object({
    userName:yup.string().required ("User name is required").min(3,"User name must be at least 3 characters").max(30,"User name must be at least 30 characters"),
    email:yup.string().required ("Email is required").email(),
    password:yup.string().required ("Password is required").min(3,"User name must be at least 3 characters").max(30,"User name must be at least 30 characters"),
})

export const loginSchema=yup.object({
    email:yup.string().required ("Email is required").email(),
    password:yup.string().required ("Password is required").min(3,"User name must be at least 3 characters").max(30,"User name must be at least 30 characters"),
})

export const sendcodeSchema=yup.object({
    email:yup.string().required ("Email is required").email(),
})


export const newpasswordSchema=yup.object({
    email:yup.string().required ("Email is required").email(),
    password:yup.string().required ("Password is required").min(3,"User name must be at least 3 characters").max(30,"User name must be at least 30 characters"),
    code:yup.string().required ("Code is required"),
})
