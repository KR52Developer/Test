import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "./config";
import Header from "./Header";
import { deleteUser } from "firebase/auth";
import Footer from "./Footer";

const UserProfile = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
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
        // console.log(currentUserData);
        setCurrentUserData(data);
        // console.log(currentUserData.score);
      }
    };
    fetchData(); // call the fetchData function here
  }, [id]);

  const handleNewTest = () => {
    navigate(`/home/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete?")) {
      await deleteDoc(doc(db, `users`, `${id}`));

      const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log(error);
        });
      window.alert("User Deleted Successfully");
      navigate("/");
    }
  };

  const handleEdit = () => {
    navigate(`/editProfile/${id}`);
  };

  return (
    <div>
      <Header id={id} currentUserData={currentUserData} />
      <div className="profileContainer">
        <div>
          <img
          className="profileImg"
            src={currentUserData.fileUpload}
            width={250}
            height={250}
            style={{ borderRadius: "50%" }}
            alt="profilePhoto"
          />
        </div>
        <div>
          <h4>
            <span>
              <b>UserName:</b>
            </span>
            {currentUserData.userName}
          </h4>
          <br />
          <h4>
            <span>
              <b>Email:</b>
            </span>
            {currentUserData.email}
          </h4>
          <br />
          <button className="btn btn-secondary" onClick={handleEdit}>
            Edit
          </button>{" "}
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Profile
          </button>{" "}
          <button className="btn btn-primary" onClick={handleNewTest}>
            New Test
          </button>
        </div>
      </div>
      <div className="scoreTable">
        <h1>Test Score</h1>
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">Previous Score</th>
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {currentUserData.score?.map((sc, index) => {
              return (
                <tr key={index}>
                  <td>{sc.score}</td>
                  {/* <td>
                    <Link to={`#`} style={{ textDecoration: "none" }}>
                      <button className="btn btn-secondary">edit</button>{" "}
                    </Link>
                    <button
                      className="btn btn-danger"
                      // onClick={() => deletePost(post._id)}
                    >
                      delete
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
};

export default UserProfile;
