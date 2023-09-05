import { Box, Button, Container, FormControl, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { auth } from './config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Login = () => {
    const navigate = useNavigate();
    const [loginField, setLoginField] = useState({
        email: "",
        password: "",
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginField((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });

    };

    const handleLoginSubmit = (e) => {
        console.log(loginField);
        e.preventDefault();
        if (loginField.email === "") {
            alert("Email is missing");
        } else if (loginField.password === "") {
            alert("Enter the password");
        } else {
            signInWithEmailAndPassword(auth, loginField.email, loginField.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    console.log(user.uid);
                    var userUid = user.uid;
                    window.alert(`User successfully Logged In`);
                    navigate(`/home/${userUid}`);
                    // ...
                })
                .catch((error) => {

                    if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
                        console.log(error);
                        alert("Email Id is incorrect");
                    } else if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
                        console.log(error);
                        alert("Password is incorrect");
                    }
                });


        }
    };



    return (
        <div>
            <Header />
            <Container  >

                <Typography variant='h2' fontWeight="bold">Login</Typography>

                <form onSubmit={handleLoginSubmit}>
                    <FormControl fullWidth >

                        <Box mt={3}>
                            <TextField id="outlined-basic" label="Email" name="email" value={loginField.email} onChange={handleChange} variant="outlined" fullWidth />
                        </Box>
                        <Box mt={3}>
                            <TextField id="outlined-basic-password" label="Password" type="password" name="password" value={loginField.password} onChange={handleChange} variant="outlined" fullWidth />
                        </Box>
                        <Box mt={3}>
                            <Button fullWidth variant='contained' type='submit'>
                                Login
                            </Button>
                        </Box>
                    </FormControl>
                </form>
                <Box mt={3}>
                    <Link href="/">
                        <Typography sx={{ color: '#1975D1' }} >New User Register Here !</Typography>
                    </Link>
                </Box>
            </Container>
        </div>
    );
};

export default Login;