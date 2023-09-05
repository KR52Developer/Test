import { Box, Button, Container, FormControl, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './config';

import { collection, setDoc, doc } from "firebase/firestore";
import Header from './Header';




const Register = () => {


    const [formFields, setformFields] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        fileUpload: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        // console.log(value);
        setformFields((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });

        // console.log(formFields);

    };




    const userdb = async (user) => {
        try {
            console.log("userDb Function Called");
            const docRef = collection(db, "users");

            await setDoc(doc(docRef, user.uid), {
                id: user.uid,
                email: formFields.email,
                userName: formFields.userName,
                phoneNumber: formFields.phoneNumber,
                password: formFields.password,
                fileUpload: formFields.fileUpload
            });
            console.log("Document written with ID: ", docRef.id);
            window.alert("User Successfully Created");
            window.location.href = `/login`;
        } catch (e) {
            console.log("Error adding document: ", e);
        }
    };






    const handleSubmit = (e) => {
        console.log("OnsubmitFunction Called");
        e.preventDefault();
        var maxSize = 1024 * 1024;
        // console.log(formFields.fileUpload);
        if (formFields.name == "") {
            window.alert("User name  is empty");
        }

        else if (formFields.email == "") {
            window.alert("Email  is empty");
        }
        else if (formFields.userName == "") {
            window.alert("Enter the userName");
        }

        else if (formFields.phoneNumber == "") {
            window.alert("Phone number  is empty");
        }
        else if (formFields.password == "") {
            window.alert("Password is empty");
        }
        else if (formFields.password.length < 6) {
            if (formFields.password.length == 1) {
                window.alert(`Password entered  is  ${formFields.password.length} character. Please enter a password of six characters`);
            }
            window.alert(`Password entered  is  ${formFields.password.length} characters. Please enter a password of six characters`);
        }
        else if (formFields.confirmPassword == "") {
            window.alert("Confirm Password is empty");
        }
        else if (formFields.password !== formFields.confirmPassword) {
            window.alert("Confirm Password is not matching");
        }
        else if (formFields.fileUpload == "") {
            window.alert("Please upload image for profile picture");
        }
        else if (formFields.fileUpload.size > maxSize) {
            window.alert("File is too large! Maximum file size is 1 MB.");
        }

        else {

            createUserWithEmailAndPassword(auth, formFields.email, formFields.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    userdb(user);

                    // ...
                })
                .catch((error) => {
                    console.log(error);
                    // ..
                });




        }
    };


    return (
        <div>
            <Container>
                <Header />
            </Container>


            <Container>
                <Typography variant='h2' fontWeight="bold">Register</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth >
                        <Box mt={3}>
                            <TextField id="outlined--basic-email" label="Email" type="email" name='email' value={formFields.email} variant='outlined' fullWidth onChange={handleChange}  ></TextField>
                        </Box>
                        <Box mt={3}>
                            <TextField id="outlined-basic" label="User Name" name='userName' value={formFields.userName} variant="outlined" fullWidth onChange={handleChange}></TextField>
                        </Box>
                        <Box mt={3}>
                            <TextField id="outlined-basic-phone" label="Phone Number" type="number" name='phoneNumber' value={formFields.phoneNumber} variant="outlined" fullWidth onChange={handleChange} ></TextField>
                        </Box>
                        <Box mt={3}>
                            <TextField id="outlined-basic-password" label="Password" type="password" name='password' value={formFields.password} variant="outlined" fullWidth onChange={handleChange} ></TextField>
                        </Box>
                        <Box mt={3}>
                            <TextField id="outlined-basic-confirm-password" label="Confirm Password" type="password" name='confirmPassword' value={formFields.confirmPassword} variant="outlined" fullWidth onChange={handleChange} ></TextField>
                        </Box>
                        <Box mt={3} >
                            <Button fullWidth variant="contained" component="label">
                                Upload image for Profile Picture
                                <FileBase64 type="file" name="fileUpload" className="my-file-input" onDone={({ base64 }) => {
                                    setformFields((preValue) => {
                                        return {
                                            ...preValue,
                                            fileUpload: base64
                                        };
                                    });
                                }} />
                            </Button>
                        </Box>


                        <Box mt={3}>
                            <Button fullWidth variant='contained' type='submit' >
                                Register Now!
                            </Button>
                        </Box>

                    </FormControl>
                </form>
                <Box mt={3}>
                    <Link href="/login">
                        <Typography sx={{ color: '#1975D1' }} >Already Registered User Please Login Here!</Typography></Link>
                </Box>
            </Container>
        </div>
    );
};

export default Register;