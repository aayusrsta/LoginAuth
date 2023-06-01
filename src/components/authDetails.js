// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { auth } from "../components/Form/firebase";

// const AuthDetails = () => {
//   const [authUser, setAuthUser] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setAuthUser(user);
//         const firestore = getFirestore();
//         const userDoc = doc(collection(firestore, "users"), user.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           setUserData(userSnapshot.data());
//         } else {
//           setUserData(null);
//         }
//       } else {
//         setAuthUser(null);
//         setUserData(null);
//       }
//     });

//     return () => {
//       listen();
//     };
//   }, []);

//   const userSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("sign out successful");
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div>
//       {authUser ? (
//         <>
//           <p>{`Signed In as ${authUser.email}`}</p>
//           <button onClick={userSignOut}>Sign Out</button>
//           {userData ? (
//             <div>
//               <h2>User Data</h2>
//               <p>Name: {userData.Name}</p>
//               <p>Age: {userData.Age}</p>
//               <p>Marital Status: {userData.MaritalStatus}</p>
//             </div>
//           ) : (
//             <p>No user data found.</p>
//           )}
//         </>
//       ) : (
//         <p>Signed Out</p>
//       )}
//     </div>
//   );
// };

// export default AuthDetails;


// AuthDetails.js
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/Form/firebase";

const AuthDetails = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const firestore = getFirestore();
        const userDoc = doc(collection(firestore, "users"), user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
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
        navigate("/"); // Navigate back to SignIn page
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
          {userData ? (
            <div>
              <h2>User Data</h2>
              <p>Name: {userData.Name}</p>
              <p>Age: {userData.Age}</p>
              <p>Marital Status: {userData.MaritalStatus}</p>
            </div>
          ) : (
            <p>No user data found.</p>
          )}
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
