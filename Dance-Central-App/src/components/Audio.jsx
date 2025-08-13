import React, { useState, useRef, useEffect } from "react";
import "./audio.css";

export default function Audio() {
  const audioControl = useRef(null);
  const progressBar = useRef(null);
  const progressBarContainer = useRef(null);

  const [audioSrc, setAudioSrc] = useState(
    sessionStorage.getItem("audioFile") || ""
  );
  const [lyricsHTML, setLyricsHTML] = useState(
    sessionStorage.getItem("lyrics") || ""
  );
  const [timeStampList, setTimeStampList] = useState([]);
  const [lyricsState, setLyricsState] = useState([]);
  const [currLyricIndex, setCurrLyricIndex] = useState(0);
  const [prevLyricID, setPrevLyricID] = useState("");
  const [currLyricID, setCurrLyricID] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rawLyricsText, setRawLyricsText] = useState(sessionStorage.getItem("lyrics") || "");

  useEffect(() => {
    if (rawLyricsText) {
        const parsed = parseLyrics(rawLyricsText);
        setLyricsState(parsed.lyrics);
        setTimeStampList(parsed.timestamps);
    }
  }, [rawLyricsText]);
  
  useEffect(() => {
    if (progressBar.current && duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.current.style.width = `${progressPercent}%`;
    }
  }, [currentTime, duration]);

  useEffect(() => {
    if (!audioControl.current) return;
    const audio = audioControl.current;

    function syncMusicLyrics() {
      const audioTime = audio.currentTime;
      if (currLyricIndex >= timeStampList.length) return;

      const currLyricTime = timeStampList[currLyricIndex];
      if (audioTime >= currLyricTime) {
        const newCurrLyricID = "lyric-" + currLyricTime.toString();

        if (prevLyricID) {
          const prevLyricLine = document.getElementById(prevLyricID);
          if (prevLyricLine) prevLyricLine.style.fontWeight = "normal";
        }

        const currLyricLine = document.getElementById(newCurrLyricID);
        if (currLyricLine) {
          if (currLyricLine.checkVisibility?.({ visibilityProperty: true })) {
            currLyricLine.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          currLyricLine.style.fontWeight = "bold";
        }
        setPrevLyricID(newCurrLyricID);
        setCurrLyricID(newCurrLyricID);
        setCurrLyricIndex((index) => index + 1);
      }
    }

    audio.addEventListener("timeupdate", syncMusicLyrics);
    return () => {
      audio.removeEventListener("timeupdate", syncMusicLyrics);
    };
  }, [currLyricIndex, timeStampList, prevLyricID]);

  useEffect(() => {
    if (!audioControl.current) return;
    const audio = audioControl.current;

    function onLoadedMetadata() {
      setDuration(audio.duration);
    }

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioSrc]);

  useEffect(() => {
    if (audioSrc) sessionStorage.setItem("audioFile", audioSrc);
  }, [audioSrc]);

  useEffect(() => {
    if (lyricsHTML) sessionStorage.setItem("lyrics", lyricsHTML);
  }, [lyricsHTML]);

   useEffect(() => {
   if (!audioControl.current) return;
   const audio = audioControl.current;

   function onTimeUpdate() {
     setCurrentTime(audio.currentTime);
   }

   audio.addEventListener("timeupdate", onTimeUpdate);
   return () => audio.removeEventListener("timeupdate", onTimeUpdate);
 }, []);

  // handle play/pause button
  function handlePlayPause() {
    const audio = audioControl.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  // format time
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  // go to line when lyric is clicked
  function onLyricLine(lyricTime) {
    if (!audioControl.current) return;
    audioControl.current.currentTime = lyricTime;

    const idx = timeStampList.findIndex((time) => time === lyricTime);
    if (idx !== -1) {
      if (currLyricID) {
        const oldCurrLyric = document.getElementById(currLyricID);
        if (oldCurrLyric) oldCurrLyric.style.fontWeight = "normal";
      }
      setCurrLyricIndex(idx);
      setCurrLyricID("lyric-" + lyricTime.toString());
    }
  }

  // audio file selection
  function setupAudioFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setAudioSrc(fileURL);
    setCurrLyricIndex(0);
    setPrevLyricID("");
    setCurrLyricID("");
    setIsPlaying(false);
  }

  // lyrics file selection
  function setupLyrics(e) {
    const lyricsFile = e.target.files[0];
    if (!lyricsFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const lyricsText = event.target.result.toString();
        setRawLyricsText(lyricsText);
        sessionStorage.setItem("lyrics", lyricsText);
        setCurrLyricIndex(0);
        setPrevLyricID("");
        setCurrLyricID("");
    };
    reader.readAsText(lyricsFile);
  }

  function parseLyrics(lyricsText) {
    const lyrics = [];
    const timestamps = [];

    const regex = /^\[(?<time>\d{2}:\d{2}(?:\.\d{1,2})?)](?<text>.*)/;
    const textLines = lyricsText.split("\n");

    textLines.forEach((line) => {
      const match = line.match(regex);
      if (!match) return;

      const { time, text } = match.groups;
      const textLine = text.trim();
      const timeSec = parseTime(time);

      timestamps.push(timeSec);
      lyrics.push({ timeSec, text: textLine });
    });
    return { lyrics, timestamps };
  }

  function parseTime(time) {
    const [minStr, secStr] = time.split(":");
    const min = parseInt(minStr, 10) * 60;
    const sec = parseFloat(secStr);
    return min + sec;
  }

  function onProgressBarClick(e) {
   if (!audioControl.current || !progressBarContainer.current) return;


   const rect = progressBarContainer.current.getBoundingClientRect();
   const clickX = e.clientX - rect.left;
   const containerWidth = progressBarContainer.current.offsetWidth;
   const newTime = (clickX / containerWidth) * duration;
   audioControl.current.currentTime = newTime;
   if (timeStampList.length === 0) return;


   if (newTime < timeStampList[0]) {
     setCurrLyricIndex(0);
     return;
   }
   for (let idx = 0; idx < timeStampList.length; idx++) {
     if (
       newTime >= timeStampList[idx] &&
       idx + 1 < timeStampList.length &&
       newTime < timeStampList[idx + 1]
     ) {
       setCurrLyricIndex(idx);
       break;
     }
   }
 }

  return (
    <>
      <main>
            <div className="front-text-audio-container">
              <div>
                <input
                  id="audio-file"
                  type="file"
                  accept="audio/*"
                  onChange={setupAudioFile}
                />

                <div className="front-audio">
                  <audio
                    id="music-audio"
                    ref={audioControl}
                    src={audioSrc}
                    preload="metadata"
                  ></audio>

                  <div>
                    <input
                      id="lyrics-file"
                      type="file"
                      accept="text/*"
                      onChange={setupLyrics}
                    />
                    <div id="lyrics-display" className="front-lyrics">
                      {lyricsState.map(({ timeSec, text }) => {
                       const id = `lyric-${timeSec}`;
                       return (
                         <div key={id} id={id}>
                           <a
                             href="#"
                             onClick={(e) => {
                               e.preventDefault();
                               onLyricLine(timeSec);
                             }}
                             style={{
                               cursor: "pointer",
                               fontWeight: currLyricID === id ? "bold" : "normal",
                               display: "block",
                               padding: "2px 0",
                             }}
                           >
                             {text}
                           </a>
                         </div>
                       );
                     })}
                    </div>
                  </div>

                  <div className="audio-controls">
                    <div>
                        {!isPlaying ? (
                        <button
                            id="playButton"
                            onClick={handlePlayPause}
                            aria-label="Play"
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                        >
                            <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.6em"
                            height="1.6em"
                            viewBox="0 0 1066.000000 1280.000000"
                            preserveAspectRatio="xMidYMid meet"
                            fill="#FFC8DA"
                            >
                            <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
                            <g
                                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                                fill="#FFC8DA"
                                stroke="none"
                            >
                                <path d="M555 12794 c-89 -21 -116 -30 -160 -52 -191 -93 -324 -302 -376 -592 -21 -112 -21 -11388 0 -11500 52 -290 185 -499 376 -592 84 -42 142 -53 265 -52 145 0 240 25 394 103 61 31 1191 727 2511 1545 2742 1701 5439 3373 6233 3865 570 352 629 395 723 520 183 241 183 481 0 723 -91 119 -156 167 -616 452 -383 238 -5024 3115 -7830 4854 -528 328 -1000 615 -1050 638 -126 60 -220 84 -345 89 -58 2 -114 2 -125 -1z" />
                            </g>
                            </svg>
                        </button>
                        ) : (
                        <button
                            id="pauseButton"
                            onClick={handlePlayPause}
                            aria-label="Pause"
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                        >
                            <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.6em"
                            height="1.6em"
                            viewBox="0 0 1262.000000 1280.000000"
                            preserveAspectRatio="xMidYMid meet"
                            fill="#FFC8DA"
                            >
                            <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
                            <g
                                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                                fill="#FFC8DA"
                                stroke="none"
                            >
                                <path d="M669 12214 c-59 -18 -130 -81 -160 -141 l-24 -48 0 -5650 0 -5650 23 -47 c13 -26 43 -65 67 -87 83 -77 -104 -71 2295 -71 2400 0 2212 -6 2295 71 24 23 54 62 67 87 l23 47 0 5650 0 5650 -23 47 c-13 25 -43 64 -67 87 -83 77 105 71 -2299 70 -1824 0 -2158 -3 -2197 -15z" />
                                <path d="M7542 12211 c-63 -22 -123 -76 -155 -141 l-22 -45 0 -5650 0 -5650 23 -47 c13 -25 43 -64 67 -87 83 -77 -105 -71 2295 -71 2399 0 2212 -6 2295 71 24 22 54 61 67 87 l 23 47 0 5650 0 5650 -24 48 c-31 63 -101 123 -164 142 -44 13 -321 15 -2201 15 -2062 -1 -2153 -1 -2204 -19z" />
                            </g>
                            </svg>
                        </button>
                        )}
                    </div>

                    <div id="progressBarContainer" className="progressBarContainer" style={{ flexGrow: 1 }}>
                        <input
                        id="progressBar"
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        step="0.01"
                        className="progressBar"
                        onChange={(e) => {
                            if (!audioControl.current) return;
                            const newTime = Number(e.target.value);
                            audioControl.current.currentTime = newTime;
                            setCurrentTime(newTime);

                            if (timeStampList.length === 0) return;
                            if (newTime < timeStampList[0]) {
                            setCurrLyricIndex(0);
                            return;
                            }
                            for (let idx = 0; idx < timeStampList.length; idx++) {
                            if (
                                newTime >= timeStampList[idx] &&
                                idx + 1 < timeStampList.length &&
                                newTime < timeStampList[idx + 1]
                            ) {
                                setCurrLyricIndex(idx);
                                break;
                            }
                            }
                        }}
                        style={{ width: "100%" }}
                        />
                    </div>

                    <div style={{ fontSize: "0.8rem", minWidth: "65px", textAlign: "right" }}>
                        <span id="currentTime">{formatTime(currentTime)}</span> /{" "}
                        <span id="duration">{formatTime(duration)}</span>
                    </div>
                    </div>
                </div>
              </div>
            </div>
      </main>
    </>
  );
}
