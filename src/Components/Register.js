import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import RegisterImg from "../Images/12953573_Data_security_05.jpg";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./config";

import { collection, setDoc, doc } from "firebase/firestore";
import Header from "./Header";
import Footer from "./Footer";

const Register = () => {
  const [formFields, setformFields] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fileUpload: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

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
      setIsRegistering(true);
      const docRef = collection(db, "users");

      await setDoc(doc(docRef, user.uid), {
        id: user.uid,
        email: formFields.email,
        userName: formFields.userName,
        phoneNumber: formFields.phoneNumber,
        password: formFields.password,
        fileUpload: formFields.fileUpload,
      });
      console.log("Document written with ID: ", docRef.id);
      setIsRegistering(false);
      window.alert("User Successfully Created");
      window.location.href = `/login/`;
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  const handleSubmit = (e) => {
    console.log("OnsubmitFunction Called");
    e.preventDefault();

    if (formFields.name === "") {
      window.alert("User name  is empty");
    } else if (formFields.email === "") {
      window.alert("Email  is empty");
    } else if (formFields.userName === "") {
      window.alert("Enter the userName");
    } else if (formFields.phoneNumber === "") {
      window.alert("Phone number  is empty");
    } else if (formFields.password === "") {
      window.alert("Password is empty");
    } else if (formFields.password.length < 6) {
      if (formFields.password.length === 1) {
        window.alert(
          `Password entered  is  ${formFields.password.length} character. Please enter a password of six characters`
        );
      }
      window.alert(
        `Password entered  is  ${formFields.password.length} characters. Please enter a password of six characters`
      );
    } else if (formFields.confirmPassword === "") {
      window.alert("Confirm Password is empty");
    } else if (formFields.password !== formFields.confirmPassword) {
      window.alert("Confirm Password is not matching");
    } else if (formFields.fileUpload === "") {
      window.alert("Please upload image for profile picture");
    } else {
      createUserWithEmailAndPassword(
        auth,
        formFields.email,
        formFields.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          userdb(user);

          // ...
        })
        .catch((error) => {
          console.log(error);
          if (
            error ===
            "FirebaseError: Firebase: Error (auth/email-already-in-use)."
          ) {
            console.log(error);
            alert("Email Id is already Used");
          }
          // ..
        });
    }
  };

  return (
    <div>
      <Container>
        <Header />
      </Container>
      <div className="registeringContainer">
        <Container>
          <img src={RegisterImg} alt="banner" width={450} height={450} />
          <Box mt={2}>
            <Link href="/login">
              <Typography sx={{ color: "#1975D1" }} fontWeight="bold" fontFamily={"Rubik"}>
                Already Registered? User Please Login Here!
              </Typography>
            </Link>
          </Box>
        </Container>
        <Container>
          <Typography variant="h4" fontWeight="bold" fontFamily={"Rubik"}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <Box mt={3}>
                <TextField
                  id="outlined--basic-email"
                  label="Email"
                  type="email"
                  name="email"
                  value={formFields.email}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                ></TextField>
              </Box>
              <Box mt={3}>
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  name="userName"
                  value={formFields.userName}
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                ></TextField>
              </Box>
              <Box mt={3}>
                <TextField
                  id="outlined-basic-phone"
                  label="Phone Number"
                  type="number"
                  name="phoneNumber"
                  value={formFields.phoneNumber}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                ></TextField>
              </Box>
              <Box mt={3}>
                <TextField
                  id="outlined-basic-password"
                  label="Password"
                  type="password"
                  name="password"
                  value={formFields.password}
                  autoComplete="new-password"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                ></TextField>
              </Box>
              <Box mt={3}>
                <TextField
                  id="outlined-basic-confirm-password"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formFields.confirmPassword}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                ></TextField>
              </Box>
              <Box mt={3}>
                <Button fullWidth variant="contained" component="label">
                  Upload image for Profile Picture
                  <FileBase64
                    type="file"
                    name="fileUpload"
                    className="my-file-input"
                    onDone={({ base64, file }) => {
                      // Validate file size
                      const MAX_FILE_SIZE = 1024; // 1MB
                      const fileSizeKiloBytes = file.size / 1024;
                      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
                        // Show error message to user
                        window.alert(
                          "File is too large! Maximum file size is 1 MB."
                        );
                        return;
                      }

                      setformFields((preValue) => {
                        return {
                          ...preValue,
                          fileUpload: base64,
                        };
                      });
                    }}
                  />
                </Button>
              </Box>

              <Box mt={3}>
                <Button fullWidth variant="contained" type="submit">
                  {isRegistering ? "Registering..." : "Register Now!"}
                </Button>
              </Box>
            </FormControl>
          </form>
        </Container>
      </div>
      <Container>
        <Footer />
      </Container>
    </div>
  );
};

export default Register;
