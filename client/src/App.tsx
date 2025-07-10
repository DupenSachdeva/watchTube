import { Route, Routes, Navigate } from "react-router-dom";
import { New } from "./components/video/videoSpecification/new";
import { Trending } from "./components/video/videoSpecification/trending";
import { Following } from "./components/video/videoSpecification/following";
import { Home } from "./components/home";
import { VideoSection } from "./components/video/VideoSection";
import { Signin, Signup } from "./components/auth";
import { Profile } from "./components/profile";
import { Channel } from "./components/channel-info";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

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
      </Route>
    </Routes>
  );
}

export default App;
