import axios from "axios";
import { useState } from "react";

export const saveUser = (response) => {
  localStorage.setItem("userData", JSON.stringify(response.data.userData));
  return response.data.userData;
};

export const saveQuestion =(response)=>{
  localStorage.setItem("questions", JSON.stringify(response))
  return response
}

export const saveID =(response)=>{
  localStorage.setItem("id", JSON.stringify(response))
  return response
}

export const getID =(response)=>{
  localStorage.setItem("id", JSON.stringify(response))
  return response
}

export const getCurrentQuestion=()=>{
  const questions = JSON.parse(localStorage.getItem("questions"))
  return questions
}

export const updateUser = (userData) => {
  localStorage.setItem("userData", userData);
  return userData;
};

export const getUser = () => {
  try {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data) {
      return false;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = () => {
  localStorage.removeItem("userData");
};

export const amIloggedIn = (navigate) => {
  const loggedInUser = getUser();
  if (!loggedInUser) navigate("/login");
  return loggedInUser;
};

export const rememberMe = (email_address, password) => {
  localStorage.setItem(
    "remembered",
    JSON.stringify({
      email_address,
      password,
    })
  );
};

export const getRemembered = () => {
  return JSON.parse(localStorage.getItem("remembered"));
};

export const API = axios.create({ baseURL: "http://localhost:4000/api" });
