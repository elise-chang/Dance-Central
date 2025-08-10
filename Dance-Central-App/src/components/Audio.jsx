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
  const [currLyricIndex, setCurrLyricIndex] = useState(0);
  const [prevLyricID, setPrevLyricID] = useState("");
  const [currLyricID, setCurrLyricID] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!duration) return;
    const progressPercent = (currentTime / duration) * 100;
    if (progressBar.current) {
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
      const { parsedLyrics, timestamps } = parseLyrics(lyricsText);
      setLyricsHTML(parsedLyrics);
      setTimeStampList(timestamps);
      setCurrLyricIndex(0);
      setPrevLyricID("");
      setCurrLyricID("");
    };
    reader.readAsText(lyricsFile);
  }

  function parseLyrics(lyricsText) {
    let parsedLyrics = "";
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
      parsedLyrics += `<div id="lyric-${timeSec}"><a href="#" onclick="return false;" onClick="">{textLine}</a></div>\n`;
    });
    return { parsedLyrics, timestamps };
  }

  function parseTime(time) {
    const [minStr, secStr] = time.split(":");
    const min = parseInt(minStr, 10) * 60;
    const sec = parseFloat(secStr);
    return min + sec;
  }

  function renderLyrics() {
    if (!lyricsHTML || timeStampList.length === 0) return null;

    return lyricsState.map(({ timeSec, text }) => {
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
    });
  }

  const [lyricsState, setLyricsState] = useState([]);

  function setupLyrics(e) {
    const lyricsFile = e.target.files[0];
    if (!lyricsFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const lyricsText = event.target.result.toString();
      const parsed = parseLyrics1(lyricsText);
      setLyricsState(parsed.lyrics);
      setTimeStampList(parsed.timestamps);
      setCurrLyricIndex(0);
      setPrevLyricID("");
      setCurrLyricID("");
    };
    reader.readAsText(lyricsFile);
  }

  function parseLyrics1(lyricsText) {
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

  // update currentTime
  useEffect(() => {
    const audio = audioControl.current;
    if (!audio) return;

    function onTimeUpdate() {
      setCurrentTime(audio.currentTime);
    }

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  function onProgressBarClick(e) {
    if (!audioControl.current) return;
    const rect = progressBarContainer.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = progressBarContainer.current.offsetWidth;
    const newTime = (clickX / containerWidth) * duration;
    audioControl.current.currentTime = newTime;
  }

  return (
    <>
      <main>
        <div className="front-message-container">
          <div className="front-message">
            <h2 className="front-title">Blocking</h2>
            <h3 className="front-subtitle">subheading</h3>
            <div className="front-text-audio-container">
              <div className="front-text" style={{ marginBottom: "1.0em" }}>
                test
              </div>

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
                      {renderLyrics()}
                    </div>
                  </div>

                  <div className="audio-controls">
                    <button id="playPauseButton" onClick={handlePlayPause}>
                      {isPlaying ? "Pause" : "Play"}
                    </button>

                    <div
                      className="progressBarContainer"
                      ref={progressBarContainer}
                      onClick={onProgressBarClick}
                    >
                      <div className="progressBar" ref={progressBar}></div>
                    </div>

                    <span id="currentTime">{formatTime(currentTime)}</span> /{" "}
                    <span id="duration">{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
