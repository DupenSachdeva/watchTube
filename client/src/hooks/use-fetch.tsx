import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { channelAtom } from '@/recoil/atoms/channelAtom';
import { BACKEND_URL } from '@/config/config';

export const useFetchChannelData = () => {

  const setChannelData = useSetRecoilState(channelAtom);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/channel/details`, {
          headers: {
            authorization: localStorage.getItem('token') || '',
          },
        });

        if (res.data.success) {
          setChannelData({
            name: res.data.channel.channelName,
            description: res.data.channel.channelDescription,
            about: res.data.channel.about,
            pictureUrl: res.data.channel.picture,
          });
    
        
          setSuccess(true);
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
