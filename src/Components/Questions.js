import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { handleScoreChange } from '../hooks/action';




function removeHTMLEntities (input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}


const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
    const { id } = useParams();
    console.log(id);

    const {
        question_category,
        question_difficulty,
        question_type,
        amount_of_question,
        score,
    } = useSelector(state => state);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [selectedAnswer, setSelectedAnswer] = useState(null);


    const handlePreviousQuestion = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
            // setSelectedAnswer(null);
        }
    };
    const handleNextQuestion = () => {
        if (questionIndex < response.results.length - 1) {
            setQuestionIndex(questionIndex + 1);
            // setSelectedAnswer(null);
        }
    };


    // const {
    //     question_category,
    //     question_difficulty,
    //     question_type,
    //     amount_of_question,
    // } = useSelector(state => ({
    //     question_category: state.question_category,
    //     question_difficulty: state.question_difficulty,
    //     question_type: state.question_type,
    //     amount_of_question: state.amount_of_question
    // }));

    console.log(question_category, question_difficulty, question_type, amount_of_question);

    let apiUrl = `/api.php?amount=${amount_of_question}`;
    // console.log(apiUrl);

    if (question_category) {
        apiUrl = apiUrl.concat(`&category=${question_category}`);
        // console.log(apiUrl);
    }

    if (question_difficulty) {
        apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
        // console.log(apiUrl);
    }
    if (question_type && question_type !== "any") {
        apiUrl = apiUrl.concat(`&type=${question_type}`);
        // console.log(apiUrl);
    }

    const { response, error, loading } = useAxios({ url: apiUrl });
    console.log(response);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions] = useState([]);
    console.log(options);

    useEffect(() => {
        if (response?.results.length) {
            const question = response.results[questionIndex];
            // console.log(question);
            let answers = [...question.incorrect_answers];
            answers.splice(
                getRandomInt(question.incorrect_answers.length), 0,
                question.correct_answer
            );
            setOptions(answers);
        }
    }, [response, questionIndex]);




    if (loading) {
        return (
            <Box mt={20}>
                <CircularProgress />
            </Box>
        );
    }
    const handleBackToHome = () => {
        navigate(`/home/${id}`);
    };
    console.log(response.response_code);
    if (response.response_code !== 0) {
        return (
            <Box mt={30} ><Typography mb={5} sx={{ color: 'red' }} variant='h5'>Something Went Wrong !</Typography>
                <Button variant='contained' onClick={handleBackToHome}>Back To Home</Button></Box>
        );
    }



    const handleClickAnswer = (e) => {
        // setSelectedAnswer(e.target.textContent);
        const question = response.results[questionIndex];
        if (e.target.textContent === question.correct_answer) {
            dispatch(handleScoreChange(score + 1));
        }
        if (questionIndex + 1 < response.results.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            navigate(`/score/${id}`);
        }
    };

    return (


        <Box>
            <Typography variant='h4'>Question {questionIndex + 1}</Typography>
            <Typography mt={5}>{removeHTMLEntities(response.results[questionIndex].question)}</Typography>
            {options.map((data, id) => (
                <Box mt={2} key={id}>
                    <Button onClick={handleClickAnswer} variant='contained' >{removeHTMLEntities(data)}</Button>
                </Box>
                // <Box mt={2} key={id}>
                //     <Button onClick={handleClickAnswer} variant='contained' style={{
                //         backgroundColor: data === selectedAnswer ? 'lightblue' : '#1976D2',
                //     }}>{removeHTMLEntities(data)}</Button>
                // </Box>
            ))}

            {/* <Box mt={3}>Score:{score}/{response.results.length}</Box> */}
            <Box mt={3}>
                <Button onClick={handlePreviousQuestion} variant='contained'>
                    Previous Question
                </Button>{" "}
                <Button onClick={handleNextQuestion} variant='contained'>
                    Next Question
                </Button>
            </Box>
        </Box>

    );
};

export default Questions;