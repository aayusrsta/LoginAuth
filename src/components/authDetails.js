import { onAuthStateChanged, signOut } from "firebase/auth";
import "../components/authDetails.css";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/Form/firebase";

const AuthDetails = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const firestore = getFirestore();
        const userDoc = doc(collection(firestore, "users"), user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
          setTodoList(userSnapshot.data().todoList || []);
        } else {
          setUserData(null);
        }
      } else {
        setAuthUser(null);
        setUserData(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    const updatedTodoList = [...todoList, newTodo];
    updateTodoList(updatedTodoList);
    setNewTodo("");
  };

  const handleDeleteTodo = (index) => {
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    updateTodoList(updatedTodoList);
  };

  const handleResetTodos = () => {
    const updatedTodoList = [];
    updateTodoList(updatedTodoList);
  };

  const updateTodoList = async (updatedTodoList) => {
    try {
      const firestore = getFirestore();
      const userDoc = doc(collection(firestore, "users"), authUser.uid);
      await updateDoc(userDoc, { todoList: updatedTodoList });
      setTodoList(updatedTodoList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {authUser ? (
        <>
          <div className="header">
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={userSignOut} className="customLogout">
              Log Out
            </button>
          </div>
          <div className="containerDetails">
            {userData ? (
              <div>
                <h2>User Info</h2>
                <p>Name: {userData.Name}</p>
                <p>Age: {userData.Age}</p>
                <p>Marital Status: {userData.MaritalStatus}</p>
              </div>
            ) : (
              <p>No user data found.</p>
            )}

            <div className="todoContainer">
              <h2 style={{ textAlign: "center" }}>Todo List</h2>
              <form onSubmit={handleAddTodo}>
                <input
                  type="text"
                  placeholder="Enter a new task"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit" className="addTaskButton">
                  Add Task
                </button>
              </form>
              {todoList.length > 0 ? (
                <ul>
                  {todoList.map((todo, index) => (
                    <li key={index}>
                      {todo}
                      <button onClick={() => handleDeleteTodo(index)}>
                        &#10004;
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tasks found.</p>
              )}
              {todoList.length > 0 && (
                <button onClick={handleResetTodos} className="resetButton">
                  Reset
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
