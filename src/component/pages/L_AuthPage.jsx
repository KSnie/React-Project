import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./L_LoginForm";
import Register from "./L_RegisterForm";
import Registerinfo from "./L_Registerinfo";
import RegisterPc from "./L_RegisterFormPc";
import { validation, validation2, validation3 } from "./Validation";

import axios from 'axios';


function AuthPage({onAuthentication}) {

  const [error, setError] = useState({});
//  Login

  const handleAuthentication = async (e) => {
    const validationErrors = validation(e);

    if (Object.values(validationErrors).every((error) => error === "")) {

      const res = await axios.post('http://localhost:3000/login', e);
  
      if (res.data === "error") {
        setError({ username: '', password: '', notfound: 'Username or password is incorrect' });
      } else {
        onAuthentication((res.data));
        setError({ username: '', password: '', notfound: '' });
      }
    } else {
      setError(validationErrors);
    }
  }

  const [registerdata, setData] = useState({})

// Register_user

  const Register_First = async (e) => {
    const Register_Firsterror = validation2(e);

    if (Object.values(Register_Firsterror).every((error) => error === "")) {
        const res = await axios.post('http://localhost:3000/checkusernamer', e);

        if (res.data === 'already') {
          setError({ username: 'Username already use!!', password: '', notmatch: '' });
        } else {
          setData(e)
          setError({ username: '', password: '', notmatch: '' });
          console.log(e);
        }
    } else {
      setError(Register_Firsterror);
      console.log(error);
    }
  }

// Register_info

const RegisterSecond = async (e) => {
  const RegisterSeconderror = validation3(e);

  if (Object.values(RegisterSeconderror).every((error) => error === "")) {
    if (registerdata) {
      const updatedData = { ...registerdata, ...e };
      console.log(updatedData)
      await axios.post('http://localhost:3000/newuser', updatedData);
    }
  } else {
    setError(RegisterSeconderror);
  }
};



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login errormessage = {error} onSubmit = {handleAuthentication} />}></Route>
        <Route path='/Register' element={<Register errormessage = {error} onSubmit = {Register_First}/>}></Route>
        <Route path='/Register_info' element={<Registerinfo errormessage = {error} onSubmit = {RegisterSecond}/>}></Route>
        <Route path='/RegisterPc' element={<RegisterPc/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AuthPage;
