import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../hooks/action";

import { auth, db } from "./config";
import { signOut } from "firebase/auth";
// import { doc, getDoc } from 'firebase/firestore';
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import Header from "./Header";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const FinalScore = () => {
  const { id } = useParams();
  console.log(id);
  const [currentUserData, setCurrentUserData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setCurrentUserData(data);
      }
    };
    fetchData(); // call the fetchData function here
  }, [id]);

  // const [getUserName, setGetUserName] = useState([]);

  // onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //         // User is signed in
  //         const uid = user.uid;
  //         // console.log(uid);

  //         const querySnapshot = await getDocs(collection(db, "users"));
  //         querySnapshot.forEach((doc) => {
  //             // doc.data() is never undefined for query doc snapshots
  //             // console.log(doc.id, " => ", doc.data());
  //             // console.log(doc.data());
  //             let userArray = doc.data();
  //             // console.log(userArray);
  //             // console.log(userArray.id);
  //             // console.log(userArray.userName);
  //             if (userArray.id === uid) {
  //                 let currentUser = userArray.userName;
  //                 // console.log(currentUser);
  //                 setGetUserName(currentUser);
  //             }

  //         });

  //         // ...

  //     }
  // });

  // const handleSaveScore = async () => {
  //     try {
  //         await addDoc(collection(db, 'users', uid), {

  //             score: score,
  //             // ... any other data you want to save
  //         }, { merge: true });
  //     } catch (e) {
  //         // Handle any errors
  //     }
  // };

  // const handleBackToHome = (e) => {
  //     dispatch(handleScoreChange(0));
  //     dispatch(handleAmountChange(50));
  //     navigate("/home");
  // };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(handleScoreChange(0));
        dispatch(handleAmountChange(50));
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { score, amount_of_question } = useSelector((state) => state);
  console.log(amount_of_question);

  const handleSave = async (score) => {
    try {
      // Create a new score object

      const newScore = {
        score: score,
        // Add any additional score-related information if needed
      };

      // Check if the user already has scores, if not, initialize an empty array
      const userScores = currentUserData.score || [];

      // Add the new score to the array
      userScores.push(newScore);

      // Update the user's data in the database
      const updatedUserData = {
        ...currentUserData,
        score: userScores,
      };
      console.log(updatedUserData);

      const docRef = doc(db, `users`, `${id}`);
      await updateDoc(docRef, updatedUserData);
      window.alert("Score saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewTest = () => {
    navigate(`/home/${id}`);
  };

  const handleProfile = () => {
    navigate(`/user-profile/${id}`);
  };

  return (
    <div>
      <Header id={id} currentUserData={currentUserData} />
      <div className="scoreContainer">
        <Box mt={30}>
          <Typography variant="h3" fontWeight="bold" mb={3}>
            Hi {currentUserData.userName},Your Final Score is : {score}/{" "}
            {amount_of_question}
          </Typography>
          {/* <Button onClick={handleBackToHome} variant='outlined'>Back to Home!</Button> */}
          {/* <Button onClick={handleSaveScore} variant='outlined'>
                Save Score
            </Button> */}
          <Button onClick={() => handleSave(score)} variant="outlined">
            Save Score{" "}
          </Button>{" "}
          <Button onClick={handleNewTest} variant="outlined">
            New Test{" "}
          </Button>{" "}
          <Button onClick={handleLogout} variant="outlined">
            Logout
          </Button>
        </Box>
        <div className="profileContainer"></div>
        <div className="scoreTable">
          <h1>Check the score in Profile Page</h1>
          <Button onClick={handleProfile} variant="outlined">
            Profile
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FinalScore;
