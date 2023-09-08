import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import FileBase64 from "react-file-base64";
import Footer from "./Footer";

const EditProfile = () => {
  const { id } = useParams();
  console.log(id);

  const [editFormFields, setEditFormFields] = useState({
    userName: "",
    phoneNumber: "",
    password: "",
    fileUpload: "",
  });

  const navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState({});
  const [updating, setUpdating] = useState(false);
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
        setCurrentUserData(data);
        setEditFormFields((prevalue) => {
          return {
            ...prevalue,
            userName: currentUserData.userName,
            phoneNumber: currentUserData.phoneNumber,
            password: currentUserData.password,
            fileUpload: currentUserData.fileUpload,
          };
        });
      }
    };
    fetchData(); // call the fetchData function here
  }, [
    id,
    currentUserData.fileUpload,
    currentUserData.password,
    currentUserData.phoneNumber,
    currentUserData.userName,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setEditFormFields((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // console.log(formFields);
  };

  const handleUpdate = async (e) => {
    if (window.confirm("Are you sure to update?")) {
      console.log("OnhandleUpdateon Called");
      e.preventDefault();
      setUpdating(true);
      try {
        const docRef = doc(db, "users", id);

        await updateDoc(docRef, {
          userName: editFormFields.userName,
          phoneNumber: editFormFields.phoneNumber,
          password: editFormFields.password,
          fileUpload: editFormFields.fileUpload,
        });
        console.log("Document written with ID: ", docRef.id);
        window.alert("User Successfully Updated");
        setUpdating(false);
        window.location.href = `/user-profile/${id}`;
      } catch (e) {
        console.log("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="formEditContianerMain">
      <Header id={id} currentUserData={currentUserData} />
      <div className="formEditContianer">
        <div>
          <img
            src={editFormFields.fileUpload}
            width={250}
            height={250}
            style={{ borderRadius: "50%" }}
            alt="profilePhoto"
          />
          <Box mt={3}>
            <Button fullWidth variant="contained" component="label">
              Upload image to change Profile
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

                  setEditFormFields((preValue) => {
                    return {
                      ...preValue,
                      fileUpload: base64,
                    };
                  });
                }}
              />
            </Button>
          </Box>
        </div>
        <form>
          <FormControl fullWidth>
            <Box mt={3}>
              <TextField
                id="outlined-basic"
                label="User Name"
                name="userName"
                value={editFormFields.userName}
                
                variant="outlined"
                fullWidth
                onChange={handleChange}
              ></TextField>
            </Box>
            <Box mt={3}>
              <TextField
                id="outlined--basic-email"
                label="Email"
                type="email"
                name="email"
                value={currentUserData.email}
                defaultValue={currentUserData.email}
                variant="outlined"
                fullWidth
                // onChange={handleChange}
              ></TextField>
            </Box>
            <Box mt={3}>
              <TextField
                id="outlined-basic-phone"
                label="Phone Number"
                type="number"
                name="phoneNumber"
                value={editFormFields.phoneNumber}
                variant="outlined"
                fullWidth
                onChange={handleChange}
              ></TextField>
            </Box>
            <Box mt={3}>
              <TextField
                id="outlined-basic-password"
                label="Password"
                type="text"
                name="password"
                value={currentUserData.password}
                variant="outlined"
                fullWidth
                // onChange={handleChange}
              ></TextField>
            </Box>
            <Box mt={3}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                onClick={handleUpdate}
              >
                {updating ? "updating..." : "update"}
              </Button>
            </Box>
          </FormControl>
        </form>
      </div>
      <Container>
          <Footer />
        </Container>
    </div>
  );
};

export default EditProfile;
