import { useRef, useState } from "react";
import { Container } from "@mui/material";
import ReactPlayer from "react-player";
import Control from "./Components/Control";
import { formatTime } from "./formatTime";
import screenfull from "screenfull";

// Let utilisé pour la gestion de l'overlay au hover de la vidéo
let count = 0;

function App() {
  // State de la config vidéo
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true,
  });
  // On destructure le VideoState
  const { playing, muted, volume, played, seeking, buffer } = videoState;

  //react player reference
  const videoPlayerRef = useRef(null);

  // Gestion de l'overlay au hover de la vidéo
  const controlRef = useRef(null);

  // Gestion du fullScreen
  const playerDivRef = useRef(null);

  // Handler permettant de suivre la progression de la vidéo
  const progressHandler = (state) => {
    if (count > 3) {
      controlRef.current.style.visibility = "hidden";
    } else if (controlRef.current.style.visibility === "visible") {
      count += 1;
    }
    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  // HandlePlayPause permettant de gérer le bouton play ou pause au clic
  const PlayPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  // SeekMouseHandler permettant de tracké l'endroit où le clic sera fait sur la barre de progression

  const seekMouseHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  // volumeChangeHandler permettant de tracker le clic de l'utilisateur sur la barre de son
  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false,
    });
  };

  // muteHandler permet de gérer la mute du son
  const muteHandler = () => {
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  // const permettant de récupérer la durée déjà écoulé de la vidéo
  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00";

  // const permettant de récupérer le temps de la vidéo
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00";

  // Format les durée avec la fonction formatTime
  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  // Const permettant de gérer quand hover sur la vidéo
  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };

  // Handler qui gére le full screen
  const handleFullScreenMode = () => {
    screenfull.toggle(playerDivRef.current);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div>React Player</div>
      <Container maxWidth="md" justify="center">
        <div className="relative">
          <div onMouseMove={mouseMoveHandler} ref={playerDivRef}>
            <ReactPlayer
              ref={videoPlayerRef}
              url="pexels-veronika-9946641.mp4"
              width="100%"
              height="100%"
              playing={playing}
              volume={volume}
              muted={muted}
              onProgress={progressHandler}
            />
            <Control
              onPlayPause={PlayPauseHandler}
              playing={playing}
              played={played}
              onSeekMouseUp={seekMouseHandler}
              volume={volume}
              onVolumeChangeHandler={volumeChangeHandler}
              muted={muted}
              onMute={muteHandler}
              duration={formatDuration}
              currentTime={formatCurrentTime}
              controlRef={controlRef}
              fullScreenMode={handleFullScreenMode}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
