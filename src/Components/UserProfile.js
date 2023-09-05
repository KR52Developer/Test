import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './config';

const UserProfile = () => {
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




    return (
        <div>
            <div className='profileContainer'>
                <div>
                    <img src={currentUserData.fileUpload} width={250} height={250} style={{ "borderRadius": "50%" }} alt='profilePhoto' />
                </div>
                <div>
                    <h4>UserName:{currentUserData.userName}</h4><br />
                    <h4>Email:{currentUserData.email}</h4><br />
                    <button>Edit</button>{" "}
                    <button>Delete Profile</button>{" "}
                    <button>New Test</button>
                </div>
            </div>
            <div className='scoreTable'>
                <h1>Test Score</h1>
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Score</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            <tr>
                                <td>{post.username}</td>
                                <td>{post.description}</td>
                                <td>{post.duration}</td>
                                <td>{post.date.substring(0, 10)}</td>
                                <td>
                                    <Link to={`/post/edit/${post._id}`} style={{ textDecoration: "none" }}>
                                        <button className="btn btn-secondary">edit</button>{" "}
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deletePost(post._id)}>
                                        delete
                                    </button>
                                </td>
                            </tr>
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserProfile; 