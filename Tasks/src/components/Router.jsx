import React, { useEffect } from "react";

const Router = () => {
  useEffect(() => {
    console.log("start", new Date().getTime());
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("photoURL", user.photoURL);
        console.log("end", new Date().getTime());
        if (location.pathname == "/") navigate("/my-drive");
        setLoaded(true);
      } else {
        console.log("not logged");
        localStorage.removeItem("uid");
        localStorage.removeItem("photoURL");
        setLoaded(false);
        GoogleSignin();
      }
    });
  }, []);
};

export default Router;
