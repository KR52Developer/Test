import { Box, Button, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from './config';


const Header = ({ id, currentUserData }) => {
    const navigate = useNavigate();
    // const { id } = useParams();
    console.log(`From Header:${id}`);
    console.log(currentUserData);


    const location = useLocation();
    const isHome = location.pathname === `/home/${id}`;
    const isScorePage = location.pathname === `/score/${id}`;
    const isQuestionPage = location.pathname === `/questions/${id}`;
    const isProfilePage = location.pathname === `/user-profile/${id}`;
    const isRegisterPage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';


    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });

    };


    return (

        <div className='headerContainer'>

            <Box className="logo">
                <Typography variant='h4' fontWeight="bold"><Link to="/" style={{ "textDecoration": "none", "color": "black" }}>Quiz-Test</Link></Typography>
            </Box>
            <Box className="navBtn">
                {!isRegisterPage && !isLoginPage && (

                    <img src={currentUserData.fileUpload} width={50} height={50} style={{ "borderRadius": "50%" }} alt='profilePhoto' />)}
                {!isRegisterPage && !isHome && !isScorePage && !isQuestionPage && !isProfilePage && (
                    <>
                        <Button variant='contained' ><Link to="/" style={{ "textDecoration": "none", "color": "white" }}>Register</Link></Button>{" "}

                    </>
                )}

                {!isLoginPage && !isHome && !isScorePage && !isQuestionPage && !isProfilePage && (
                    <>
                        < Button variant='contained'  ><Link to="/login" style={{ "textDecoration": "none", "color": "white" }}>Login</Link></Button>{" "}
                    </>
                )}
                {!isRegisterPage && !isLoginPage && (
                    <>
                        <Button variant='contained' ><Link to={`/user-profile/${id}`} style={{ "textDecoration": "none", "color": "white" }}>Profile</Link></Button>{" "}
                        <Button variant='contained' onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </Box>
        </div>

    );
};

export default Header;