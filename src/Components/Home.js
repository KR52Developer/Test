import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SelectField from './SelectField';
import TextFieldComponent from './TextFieldComponent';
import useAxios from '../hooks/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { collection, getDocs } from "firebase/firestore";
import { db } from './config';



const Home = () => {
    const { id } = useParams();
    console.log(id);

    const [currentUserData, setCurrentUserData] = useState({});
    console.log(currentUserData);

    useEffect(() => {
        console.log("UseEffect is working ");
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            // let currentUser = querySnapshot.forEach((doc) => {
            //     if (doc.id === id) { return doc.id, " => ", doc.data(); }

            // });

            let currentUser = querySnapshot.docs.find((doc) => doc.id === id);

            console.log(currentUser);

            if (currentUser) {
                let data = currentUser.data();
                console.log(data);
                console.log(currentUserData);
                setCurrentUserData(data);
                console.log(currentUserData);
            }
        };
        fetchData(); // call the fetchData function here
    }, []);

    const { response, error, loading } = useAxios({ url: "/api_category.php" });
    // console.log(response);
    console.log(response);
    // console.log(response.trivia_categories);
    const navigate = useNavigate();

    if (loading) {
        return (
            <Box mt={20}>
                <CircularProgress />
            </Box>
        );
    }

    const difficultyOptions = [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
    ];

    const typeOptions = [
        { id: "any", name: "Any Type" },
        { id: "multiple", name: "Multiple Choise" },
        { id: "boolean", name: "True/false" },
    ];

    if (error) {
        return (
            <Typography variant='h6' mt={20} color="red">
                Something went Wrong!
            </Typography>
        );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/questions/${id}`);
    };
    return (
        <>
            <Header id={id} currentUserData={currentUserData} />
            <Container >
                <Typography variant='h2' fontWeight="bold">Quiz App</Typography>
                <form onSubmit={handleSubmit}>
                    <SelectField options={response.trivia_categories} label='Category' />
                    <SelectField options={difficultyOptions} label='Difficulty' />
                    <SelectField options={typeOptions} label='Type' />
                    <TextFieldComponent />
                    <Box mt={3}>
                        <Button fullWidth variant='contained' type='submit'>Get Started</Button>
                    </Box>
                </form>

            </Container>
        </>

    );
};

export default Home;