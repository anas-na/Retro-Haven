import "../styles/SignUp.css";
import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import useUser from "../hooks/useUser";
import { apiURL } from "../util/apiURL";
import { useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import blankPhoto from "../styles/media/blankUser.png";
import axios from "axios";
import { storage } from "../services/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
const API = apiURL();

const SignUp = () => {
  const user = useContext(UserContext);
  const { signUpFireBase } = useUser();
  const history = useHistory();
  const [image, setImage] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");

  const handleSignUp = async event => {
    event.preventDefault();

    let {
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      address,
      email,
      password,
      image
    } = event.target.elements;

    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      dateOfBirth: dateOfBirth.value,
      address: address.value,
      email: email.value,
      password: password.value,
      image: imageAsUrl
    };
    try {
      const res = await signUpFireBase(email.value, password.value);
      body.id = res.user.uid;
      await axios.post(`${API}/users`, body);
      history.push("/");
    } catch (error) {
      console.log("SignUp Function:", error);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }
  const handleUpload = event => {
    event.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, "users/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      snapShot => {
        console.log(snapShot);
      },
      err => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log("File available at", downloadURL);
          setImageAsUrl(downloadURL);
        });
      }
    );
  };
  const imagePlaceHolder = img => {
    if (imageAsUrl === "") {
      return <div />;
    } else {
      return <img src={imageAsUrl} alt="newItemImg" />;
    }
  };

  const handleImage = event => {
    const img = event.target.files[0];
    setImage(image => img);
  };

  return (
    <section className="formContainer">
      <h4 className="formTitle">Create An Account</h4>

      <div className="signupForm">
        <form onSubmit={handleSignUp}>
          <section className="inputs">
            <label htmlFor="firstName">First Name</label>
            <input name="firstName" type="text" id="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" type="text" id="lastName" />

            <label htmlFor="email">Your Email</label>
            <input name="email " type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password" />

            <label htmlFor="address">Address</label>
            <input name="address" type="address" id="address" />

            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <input name="dateOfBirth" type="date" id="dateOfBirth" />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input name="phoneNumber" type="tel" id="phoneNumber" />
            <label htmlFor="image">image</label>
            <div className="avatarUpload">
              <input className="image" type="file" onChange={handleImage} />
              <button onClick={handleUpload} className=" Button">
                Upload
              </button>
            </div>
            <input type="submit" className="button signUpButton Button" />
          </section>
          <hr className="mt-0 mb-4" />
          <div className="login">
            <p> Already have an account?</p>
            <a href="/login" className=" Button loginButton1">
              Login
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
