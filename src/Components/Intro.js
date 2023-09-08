import React, { useEffect, useState } from "react";
import intro from "../Images/QuizIntro.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import { useSelector } from "react-redux";

const Intro = () => {
  const { id } = useParams();
  console.log(id);

  const [currentUserData, setCurrentUserData] = useState({});
  const [userScore, setUserScore] = useState([]);
  const [showCurrentScore, setShowCurrentScore] = useState(false);
  const navigate = useNavigate();

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
        console.log(currentUserData.score);
        setUserScore([currentUserData.score]);
      }
    };
    fetchData(); // call the fetchData function here
  }, []);

  console.log(userScore);

  const currentScore =
    currentUserData.score?.[currentUserData.score.length - 1];
  const previousScore =
    currentUserData.score?.[currentUserData.score.length - 2];

  const handleGetSarted = () => {
    navigate(`/home/${id}`);
  };

  

  return (
    <div className="introContainer">
      <div>
        <h3>
          Welcome<b> {currentUserData.userName}!</b>
        </h3>
        <h4 className="introHeading">Are you Ready to start the Quiz Test ?</h4>
        <img src={intro} alt="introImage" width={400} height={250} />
      </div>
      <div>
        <h5 className="introdescription">
          There are <b>24 Categories, 3 difficulty level, 3 types</b> and you
          can choose question from <b>1-20</b>.<br></br>If{" "}
          <b>something wrong!</b> window appears, means you have to alter your
          selections.
        </h5>
        <p>(You'll have to provide your own snacks, sorry!.)</p>
        <button className="getStartBtn" onClick={handleGetSarted}>
          Let's Get Started
        </button>
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
  );
};

export default Intro;
