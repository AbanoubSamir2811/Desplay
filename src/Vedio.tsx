import React, { useRef, useEffect, useState } from 'react';

const videoSrc = new URL("./assets/Final Video.mp4", import.meta.url).href;

function Video() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Start with muted video

  // Unmute the video on user interaction
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 1; // Set volume to maximum
      videoRef.current.muted = isMuted; // Mute or unmute based on state
    }
    // setTimeout(() => {
    //     if (videoRef.current) {
    //   videoRef.current.muted = false;
    //   setIsMuted(false);
    // }
    // }, 10)
  }, [isMuted]);

  return (
    <div
      className="flex justify-center items-center h-screen w-screen overflow-hidden"
      onClick={handleUnmute} // Unmute on click
    >
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted} // Muted initially
        id="myVideo"
        className="w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Add a button to indicate unmute */}
      {/* {isMuted && (
        <button
          className="absolute bottom-10 bg-white text-black px-4 py-2 rounded"
          onClick={handleUnmute}
        >
          Unmute
        </button>
      )} */}
    </div>
  );
}

export default Video;