import { useState, useEffect } from "react";
import Input from "../components/input/Input";
import Button from "../components/button/Button";

import { signin } from "../action/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const LoginScreen = () => {

  // Declaring the dispatch and the navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // For the email and password input form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Checking if the user is logged in then redirect to the home screen
  const data = sessionStorage.getItem("userInfo");

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);


  // Handles the signin function
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center p-3">
      <form
        className="w-[30rem] drop-shadow-2xl flex flex-col justify-between pb-8 items-center z-10 bg-white rounded-xl h-[70vh] border"
        onSubmit={handleSubmit}
      >
        <div className="flex  items-center flex-col">
          <img
            src="/assets/inframent-logo.png"
            alt="logo"
            className="w-[15rem] h-auto mb-2"
          />
          <p className="mb-[3rem] text-[17px]">Welcome to inframent</p>
          <div className="flex flex-col gap-5">
            <Input
              placeholder="Type in your email"
              type="Email"
              label="Name"
              value={email}
              setValue={setEmail}
            />
            <Input
              placeholder="Type in your password"
              type="password"
              label="Password"
              value={password}
              setValue={setPassword}
            />
          </div>
        </div>

        <div>
          <Button title="Login" btnType="submit" color="bg-gray-100" />
        </div>
      </form>

      <div className="absolute bottom-0 left-0 flex flex-row justify-between">
        <img
          src="/assets/construction-crane-right.png"
          alt="/assets/construction-crane-right.png"
          className="md:w-[42%] w-[30rem] h-auto"
        />
        <img
          src="/assets/construction-crane-right.png"
          alt="/assets/construction-crane-left.png"
          className="lg:w-[42%] lg:min-w-[20rem] lg:flex hidden h-auto"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
