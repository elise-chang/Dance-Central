import React, { useRef } from "react"; 
import Button from "./button";

export default function MediaUploader({ onAdd, uploadType = "image", buttonClassName = "" }) {
  const colorInputRef = useRef(null);

  const activateColorPick = () => {
      colorInputRef.current.click();
  }

  // Extract a thumbnail from a video file, avoiding black frames
  const getVideoThumbnail = (file) => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = url;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      const timePoints = [1, 5, 10, 30];
      let checked = 0;
      let resolved = false;
      function checkFrame() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        // Check if frame is mostly black
        let blackPixels = 0;
        let totalPixels = frame.length / 4;
        for (let i = 0; i < frame.length; i += 4) {
          if (frame[i] < 30 && frame[i+1] < 30 && frame[i+2] < 30) blackPixels++;
        }
        if (blackPixels / totalPixels < 0.7) {
          canvas.toBlob((blob) => {
            const thumbUrl = URL.createObjectURL(blob);
            resolved = true;
            resolve(thumbUrl);
            URL.revokeObjectURL(url);
          }, 'image/jpeg', 0.8);
        } else {
          checked++;
          if (checked < timePoints.length) {
            video.currentTime = Math.min(timePoints[checked], video.duration * 0.5);
          } else {
            // Last resort: use half duration
            video.currentTime = video.duration * 0.5;
            video.removeEventListener('seeked', checkFrame);
            video.addEventListener('seeked', function finalFrame() {
              video.removeEventListener('seeked', finalFrame);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              canvas.toBlob((blob) => {
                const thumbUrl = URL.createObjectURL(blob);
                resolve(thumbUrl);
                URL.revokeObjectURL(url);
              }, 'image/jpeg', 0.8);
            });
          }
        }
      }
      video.addEventListener('loadeddata', () => {
        video.currentTime = timePoints[0];
      });
      video.addEventListener('seeked', function onSeeked() {
        if (!resolved) checkFrame();
      });
      video.addEventListener('error', () => {
        resolve(null);
        URL.revokeObjectURL(url);
      });
    });
  };

  const handleFiles = async (files) => {
    const items = await Promise.all([...files].map(async (f) => {
      const isVideo = f.type.startsWith("video");
      let thumb = undefined;
      if (isVideo) {
        thumb = await getVideoThumbnail(f);
      }
      return {
        type: isVideo ? "video" : "image",
        src: URL.createObjectURL(f),
        alt: f.name,
        ...(thumb ? { thumb } : {}),
      };
    }));
    onAdd(items);
  };

  // <MediaUploader onAdd={handleAdd} uploadType="image" />
  const accept = uploadType === "video" ? "video/*" : uploadType === "image" ? "image/*" : "image/*,video/*";
  const message = uploadType === "video" ? "Upload videos" : uploadType === "image" ? "Upload images" : "Upload images or videos";

  return (
    <label className={`uploader ${buttonClassName}`}>
      <Button text ={"Upload " + uploadType} onClick={activateColorPick}/>
      <input
        type="file"
        accept={accept}
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        hidden
        ref={colorInputRef}
        
      />
    </label>
  );
}

