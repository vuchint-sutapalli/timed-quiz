import React from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Atoms";
import authService from "../../appWrite/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const setAuth = useSetRecoilState(authState);

  const navigate = useNavigate();

  const logOutHandler = () => {
    console.log("logging out");

    authService.logOut().then(() => {
      setAuth({
        status: false,
        userData: null,
      });
      navigate("/login");
    });
  };

  return <Button onClick={logOutHandler}>Log out</Button>;
};

export default LogoutBtn;
