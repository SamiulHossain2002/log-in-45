import "./App.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./Firebase/Firebase.config";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState();
  //googlw-provider:
  const googleProvider = new GoogleAuthProvider();
  //github provider:
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser([]);
      })
      .catch((error) => {
        setUser([]);
      });
  };
  return (
    <div className="App">
      {user?.uid ? (
        <button className="google-button" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <>
          <button className="google-button" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
          <button className="github-button" onClick={handleGithubLogin}>
            Sign in with github
          </button>
        </>
      )}

      {user?.uid && (
        <div>
          <h2>Name: {user?.displayName}</h2>
          <h2>Email: {user?.email}</h2>
          <img src={user?.photoURL} alt="user photo" />
        </div>
      )}
    </div>
  );
}

export default App;
