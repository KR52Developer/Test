import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import TextFieldComponent from "./TextFieldComponent";
import useAxios from "../hooks/useAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import Footer from "./Footer";
import intro from "../Images/QuizIntro.jpg";

const Home = () => {
  const { id } = useParams();
  console.log(id);

  const [currentUserData, setCurrentUserData] = useState({});
  const [userScore, setUserScore] = useState([]);
  console.log(currentUserData);

  useEffect(() => {
    console.log("UseEffect is working ");
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));

      let currentUser = querySnapshot.docs.find((doc) => doc.id === id);

      console.log(currentUser);

      if (currentUser) {
        let data = currentUser.data();
        console.log(data);
        console.log(currentUserData);
        setCurrentUserData(data);
        console.log(currentUserData);
        setUserScore([currentUserData.score]);
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
      <Typography variant="h6" mt={20} color="red">
        Something went Wrong!
      </Typography>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/questions/${id}`);
  };

  const currentScore =
    currentUserData.score?.[currentUserData.score.length - 1];
  const previousScore =
    currentUserData.score?.[currentUserData.score.length - 2];

  return (
    <>
      <Header id={id} currentUserData={currentUserData} />

      <div className="homeContainerMain">
        <div>
          <div>
            <h3>
              Welcome<b> {currentUserData.userName}!</b>
            </h3>
            <h4 className="introHeading">
              Are you Ready to start the Quiz Test ?
            </h4>
            <img src={intro} alt="introImage" width={400} height={250} />
          </div>
          <div>
            <h5 className="introdescription">
              There are <b>24 Categories, 3 difficulty level, 3 types</b> and
              you can choose question from <b>1-20</b>.<br></br>If{" "}
              <b>something wrong!</b> window appears, means you have to alter
              your selections.
            </h5>
            <p>(You'll have to provide your own snacks, sorry!.)</p>
          </div>
          <div className="prevScore">
            <h5>
              Your Previous Score:<b>{previousScore?.score}</b>
            </h5>
          </div>

          <div className="currentScore">
            {/* {showCurrentScore ? (
          <h5>
            Your Current Score: <b>{currentScore?.score}</b>
          </h5>
        ) : (
          <h5>Your Current Score will appear here</h5>
        )} */}

            <h5>
              Your Current Score: <b>{currentScore?.score}</b>
            </h5>
          </div>
        </div>

        <div className="homeContainer">
          <Container>
            <Typography variant="h2" fontWeight="bold">
              Quiz App
            </Typography>
            <form onSubmit={handleSubmit}>
              <SelectField
                options={response.trivia_categories}
                label="Category"
              />
              <SelectField options={difficultyOptions} label="Difficulty" />
              <SelectField options={typeOptions} label="Type" />
              <TextFieldComponent />
              <Box mt={3}>
                <Button fullWidth variant="contained" type="submit">
                  Get Started
                </Button>
              </Box>
            </form>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
