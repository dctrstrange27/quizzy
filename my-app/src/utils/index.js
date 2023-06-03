import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const saveUser = (response) => {
  localStorage.setItem("userData", JSON.stringify(response.data.userData));
  return response.data.userData;
};

export const saveCurrentQuestion = (response) => {
  localStorage.setItem("questions", JSON.stringify(response));
  return response;
};
export const getCurrentQuestion = () => {
  const questions = JSON.parse(localStorage.getItem("questions"));
  return questions;
};

export const saveQuestionOnly = (response) => {
  localStorage.setItem("questionsOnly", JSON.stringify(response));
  return response;
};
export const getQuestionOnly = () => {
  const questionsOnly = JSON.parse(localStorage.getItem("questionsOnly"));
  return questionsOnly;
};

export const saveCurrentQ = (response) => {
  localStorage.setItem("currentQ", JSON.stringify(response));
  return response;
};

export const getCurrentQ = () => {
  try {
    const current = JSON?.parse(localStorage.getItem("currentQ") || undefined);
    if (!current) {
      return false;
    }
    return current;
  } catch (error) {
    console.log("error Papi! " + error);
  }
};

export const generateRandomNum = (len) => {
  return Math.floor(Math.random() * len);
};

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

export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const toastFailed = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

 export const API = axios.create({ baseURL: "http://localhost:5000/api" });
// export const API = axios.create({ baseURL: "https://quizzy-api-0ria.onrender.com/api" });
