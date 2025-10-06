import { ChannelData } from './../recoil/atoms/channelAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// hooks/use-auth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";
import { usernameAtom, usernameEmail } from "../recoil/atoms/userAtom";
import { isLoggedInatom } from '../recoil/atoms/isLoggedIn';
import { channelAtom } from '../recoil/atoms/channelAtom';

export const useAuth = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const navigate = useNavigate(); 

  const setusername = useSetRecoilState(usernameAtom);
  const setuseremail = useSetRecoilState(usernameEmail);

  const [channelData , setChannelData] = useRecoilState(channelAtom)

  const setIsLoggedIn = useSetRecoilState(isLoggedInatom)


  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      
      if (!res.ok || !data.success) {
        setError(true);
      } else {
        localStorage.setItem("token", data.token);

        setusername(name)
        setuseremail(email)

        navigate("/home");
        setChannelData({...channelData,name})
        setIsLoggedIn(true)
      }
    } catch (err: any) {
      setError(true);
    } finally {
      setLoading(false);
    }

  };


  const signin = async ( email: string, password: string) => {

    setLoading(true);
    setError(false);

    try {

      const res = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data.token);
      
      

      if (!res.ok) {

        setError(true);

      } else {
        
        if(data.success == false)
        alert("please create an account first");
        
        else{
        localStorage.setItem("token", data.token)
        const name = data.name;
        setusername(data.name)
        setuseremail(email)
        setChannelData({...channelData,name})
        
        navigate("/home");}

        
      }
    } catch (err: any) {
      setError(true);
    } finally {
      setLoading(false);
    }

  }

    return { signup , signin, loading, error };

  


};

