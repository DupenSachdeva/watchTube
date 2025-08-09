import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { channelAtom } from '@/recoil/atoms/channelAtom';
import { BACKEND_URL } from '@/config/config';
import { isLoggedInatom } from '../recoil/atoms/isLoggedIn';
import { usernameAtom, usernameEmail } from '../recoil/atoms/userAtom';

export const useFetchChannelData = () => {

  const setChannelData = useSetRecoilState(channelAtom);

  const setusername = useSetRecoilState(usernameAtom);
  const setemail = useSetRecoilState(usernameEmail)

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const setIsloggedin = useSetRecoilState(isLoggedInatom);

  useEffect(() => {


    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/channel/details`, {
          headers: {
            authorization: localStorage.getItem('token') || '',
          },
        });

        if (res.data.success) {
          const name = res.data.channel.channelName;
          const email = 
          setChannelData({
            name: res.data.channel.channelName,
            description: res.data.channel.channelDescription,
            about: res.data.channel.about,
            pictureUrl: res.data.channel.picture,
          });
           
          setusername(name);
          setemail(res.data.email)
        
          setSuccess(true);
          setIsloggedin(true);
          
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching channel data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { success, loading, error };
};
