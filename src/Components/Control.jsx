import React from "react";
import { Slider } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { Pause, PlayArrow, VolumeUp, VolumeOff } from "@mui/icons-material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
const useStyles = makeStyles({
  volumeSlider: {
    width: "100px",
    color: "#B6FF00",
  },
  bottomIcons: {
    color: "#fff",
    padding: "12px 8px",
    "&:hover": {
      color: "#B6FF00",
    },
  },
  "@media (max-width: 500px)": {
    volumeSlider: {
      width: "50px",
    },
  },
});

const PrettoSlider = withStyles({
  root: {
    height: "20px",
    color: "#B6FF00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#B6FF00",
    border: "2px solid currentColor",
    marginTop: 0,
    marginLeft: 0,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
  "@media (max-width: 500px)": {
    root: {
      padding: "0",
    },
  },
})(Slider);

const styleSliderPrettoMobile = {
  // Adding media query..
  "@media (max-width: 500px)": {
    padding: "0",
  },
};
const Control = ({
  onPlayPause,
  playing,
  played,
  onSeekMouseUp,
  volume,
  onVolumeChangeHandler,
  muted,
  onMute,
  duration,
  currentTime,
  controlRef,
  fullScreenMode,
}) => {
  const classes = useStyles();
  return (
    <div
      className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex flex-col justify-between z-[1]"
      ref={controlRef}
    >
      {/* TOP CONTROL */}
      <div className="flex items-center justify-between px-5 py-1">
        <h2 className="text-[#B6FF00] font-bold">Video Player</h2>
      </div>
      {/* MID CONTROL */}
      <div className="flex items-center justify-center">
        <div className={style.iconBtn} onClick={onPlayPause}>
          {playing ? (
            <Pause fontSize="large" />
          ) : (
            <PlayArrow fontSize="large" />
          )}
        </div>
      </div>
      {/* BOTTOM CONTROL */}
      <div className="bottom_container">
        <div className="flex items-center w-full px-4">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChangeCommitted={onSeekMouseUp}
            style={styleSliderPrettoMobile}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center px-2 py-2">
              <div className={style.iconBtn} onClick={onPlayPause}>
                {playing ? (
                  <Pause fontSize="large" />
                ) : (
                  <PlayArrow fontSize="large" />
                )}
              </div>
              <div className={style.iconBtn} onClick={onMute}>
                {muted ? (
                  <VolumeOff fontSize="medium" />
                ) : (
                  <VolumeUp fontSize="medium" />
                )}
              </div>
            </div>
            <Slider
              className={`${classes.volumeSlider}`}
              value={volume * 100}
              onChange={onVolumeChangeHandler}
            />
            <span className="pl-2 text-xs text-white">
              {currentTime} / {duration}
            </span>
          </div>
          <div className={style.iconBtn} onClick={fullScreenMode}>
            <FullscreenIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

const style = {
  iconBtn: "px-2 text-[#B6FF00] hover:text-white cursor-pointer",
};
export default Control;
