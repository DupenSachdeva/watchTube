import { Route, Routes, Navigate } from "react-router-dom";
import { New } from "./components/video/videoSpecification/new";
import { Trending } from "./components/video/videoSpecification/trending";
import { Following } from "./components/video/videoSpecification/following";
import { Home } from "./components/home";
import { VideoSection } from "./components/video/VideoTypesheader";
import { Signin, Signup } from "./components/auth";
import { Profile } from "./components/profile";
import { Channel } from "./components/channel-info";
import { useFetchChannelData } from "./hooks/use-fetch";
import { UploadVideo } from "./components/video/videoUpload";
import Details from "./components/video/videoUpload/details";
import VideoPlayer from "./components/videoPlayer/videoPlayer";
import { VideoDetail } from "./components/video/videoDetailShow";

function App() {

  
  return (
    <Routes>

      <Route path="/" element = {<Home></Home>}>
      
          <Route index element={<Navigate to="video/trending" replace />} />

        <Route path="profile" element={<Profile></Profile>}></Route>

        <Route path="channel-info" element={<Channel></Channel>}></Route>


        <Route path="video" element={<VideoSection />}> 

          <Route index element={<Trending></Trending>}></Route>

          <Route path="trending" element={<Trending />} />

          <Route path="new" element={<New />} />

          <Route path="following" element={<Following />} />

        </Route>
      
      </Route>


      <Route path="/signin" element={<Signin />} />
      <Route path = "/signup" element={<Signup></Signup>}></Route>

      <Route path="/home" element={<Home />}>

        <Route index element={<Navigate to="video/trending" replace />} />

        <Route path="profile" element={<Profile></Profile>}></Route>

        <Route path="channel-info" element={<Channel></Channel>}></Route>


        <Route path="video" element={<VideoSection />}> 

          <Route index element={<Trending></Trending>}></Route>

          <Route path="trending" element={<Trending />} />

          <Route path="new" element={<New />} />

          <Route path="following" element={<Following />} />

        </Route>



        <Route path = "uploadVideo" element={<UploadVideo></UploadVideo>}>
            <Route path="details" element={<Details></Details>}></Route>
            <Route path = "settings"></Route>
        </Route>

      </Route>

      
      <Route path="/video/:id" element={<VideoDetail></VideoDetail>}></Route>

    </Routes>
  );
}

export default App;
