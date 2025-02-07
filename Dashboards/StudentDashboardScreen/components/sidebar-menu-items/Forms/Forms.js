import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

// Step labels for the form
const steps = ["Personal Information", "Job Information", "Credentials"];

// Regex for validating phone numbers
const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// Validation schema for the form fields
const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    middleName: yup.string(),
    lastName: yup.string().required("required"),
    sex: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
    jobTitle: yup.string().required("required"),
    department: yup.string().required("required"),
    username: yup.string().required("required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("required"),
});

// Initial values for the form
const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    email: "",
    contact: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    jobTitle: "",
    department: "",
    username: "",
    password: "",
};

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)"); // For responsive layout
    const [activeStep, setActiveStep] = useState(0); // To track current step

    // Function to handle form submission
    const handleFormSubmit = (values) => {
        window.alert(JSON.stringify(values, null, 2)); // Show form data in alert (just for demo)
    };

    // Handle step change
    const handleStepChange = (step) => setActiveStep(step);

    return (
        <Box m="20px">
            {/* Stepper for showing step navigation */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel onClick={() => handleStepChange(index)}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Formik wrapper to handle form state and validation */}
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Conditional rendering of form based on activeStep */}
                        {activeStep === 0 && <PersonalInformationForm {...{ values, errors, touched, handleBlur, handleChange, isNonMobile }} />}
                        {activeStep === 1 && <JobInformationForm {...{ values, errors, touched, handleBlur, handleChange, isNonMobile }} />}
                        {activeStep === 2 && <CredentialsForm {...{ values, errors, touched, handleBlur, handleChange, isNonMobile }} />}

                        {/* Buttons for navigation */}
                        <Box display="flex" justifyContent="space-between" mt="20px">
                            {/* Back button */}
                            <Button
                                disabled={activeStep === 0}
                                onClick={() => setActiveStep((prev) => prev - 1)}
                                color="primary"
                                variant="contained"
                            >
                                Back
                            </Button>
                            {/* Next button or Submit button based on activeStep */}
                            {activeStep < steps.length - 1 ? (
                                <Button
                                    onClick={() => setActiveStep((prev) => prev + 1)}
                                    color="primary"
                                    variant="contained"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" color="secondary" variant="contained">
                                    Submit
                                </Button>
                            )}
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// Form to collect personal information
const PersonalInformationForm = ({ values, errors, touched, handleBlur, handleChange, isNonMobile }) => (
    <>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Personal Information
        </Typography>
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
        >
            {/* First Name input */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
            />
            {/* Middle Name input */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                sx={{ gridColumn: "span 2" }}
            />

            {/* Last Name input */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
            />
            {/* Sex selection */}
            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel>Sex</InputLabel>
                <Select
                    name="sex"
                    value={values.sex}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.sex && !!errors.sex}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
                {touched.sex && errors.sex && (
                    <Typography color="error" variant="caption">
                        {errors.sex}
                    </Typography>
                )}
            </FormControl>
        </Box>
    </>
);

// Form to collect job information
const JobInformationForm = ({ values, errors, touched, handleBlur, handleChange, isNonMobile }) => (
    <>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Job Information
        </Typography>
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
        >
            {/* Job Title input */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobTitle}
                name="jobTitle"
                error={!!touched.jobTitle && !!errors.jobTitle}
                helperText={touched.jobTitle && errors.jobTitle}
                sx={{ gridColumn: "span 2" }}
            />
            {/* Department input */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
            />
        </Box>
    </>
);

// Form to collect credentials
const CredentialsForm = ({ values, errors, touched, handleBlur, handleChange, isNonMobile }) => (
    <>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Credentials
        </Typography>
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
        >
            {/* Username input */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
            />
            {/* Password input */}
            <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
            />
        </Box>
    </>
);

export default Form;
