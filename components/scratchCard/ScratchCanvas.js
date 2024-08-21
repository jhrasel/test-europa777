"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const ScratchCanvas = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const brushImageRef = useRef(null);
  const imageRef = useRef(null);
  const ctxRef = useRef(null);
  const isFinishedRef = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      ctx.drawImage(image, 0, 0, props.width, props.height);
      setLoaded(true);
    };

    image.src = props.image;
    imageRef.current = image;

    if (props.customBrush) {
      const brushImage = new Image(
        props.customBrush.width,
        props.customBrush.height
      );
      brushImage.src = props.customBrush.image;
      brushImageRef.current = brushImage;
    }
  }, [props.image, props.customBrush, props.width, props.height]);

  const reset = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    canvas.style.opacity = "1";
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(imageRef.current, 0, 0, props.width, props.height);
    isFinishedRef.current = false;
    setFinished(false);
  }, [props.width, props.height]);

  const getFilledInPixels = (stride = 1) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    let x = 0;
    let y = 0;
    let width = canvas.width;
    let height = canvas.height;

    if (props.customCheckZone) {
      x = props.customCheckZone.x;
      y = props.customCheckZone.y;
      width = props.customCheckZone.width;
      height = props.customCheckZone.height;
    }

    const pixels = ctx.getImageData(x, y, width, height);
    const total = pixels.data.length / stride;
    let count = 0;

    for (let i = 0; i < pixels.data.length; i += stride) {
      if (parseInt(pixels.data[i], 10) === 0) {
        count++;
      }
    }

    return Math.round((count / total) * 100);
  };

  const getMouse = (e) => {
    const canvas = canvasRef.current;
    const { top, left } = canvas.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    let x = 0;
    let y = 0;

    if (e && e.pageX && e.pageY) {
      x = e.pageX - left - scrollLeft;
      y = e.pageY - top - scrollTop;
    } else if (e && e.touches) {
      x = e.touches[0].clientX - left - scrollLeft;
      y = e.touches[0].clientY - top - scrollTop;
    }

    return { x, y };
  };

  const distanceBetween = (point1, point2) => {
    if (point1 && point2) {
      return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
      );
    }
    return 0;
  };

  const angleBetween = (point1, point2) => {
    if (point1 && point2) {
      return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    return 0;
  };

  const handlePercentage = (filledInPixels = 0) => {
    if (isFinishedRef.current) {
      return;
    }

    let finishPercent = 70;
    if (props.finishPercent !== undefined) {
      finishPercent = props.finishPercent;
    }

    if (filledInPixels > finishPercent) {
      if (props.fadeOutOnComplete !== false) {
        canvasRef.current.style.transition = "1s";
        canvasRef.current.style.opacity = "0";
      }

      setFinished(true);
      if (props.onComplete) {
        props.onComplete();
      }

      isFinishedRef.current = true;
    }
  };

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    lastPointRef.current = getMouse(e);
    audioRef.current.play();
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) {
      return;
    }

    e.preventDefault();

    const currentPoint = getMouse(e);
    const distance = distanceBetween(lastPointRef.current, currentPoint);
    const angle = angleBetween(lastPointRef.current, currentPoint);

    const ctx = ctxRef.current;
    for (let i = 0; i < distance; i++) {
      const x = lastPointRef.current
        ? lastPointRef.current.x + Math.sin(angle) * i
        : 0;
      const y = lastPointRef.current
        ? lastPointRef.current.y + Math.cos(angle) * i
        : 0;
      ctx.globalCompositeOperation = "destination-out";

      if (brushImageRef.current && props.customBrush) {
        ctx.drawImage(
          brushImageRef.current,
          x,
          y,
          props.customBrush.width,
          props.customBrush.height
        );
      } else {
        ctx.beginPath();
        ctx.arc(x, y, props.brushSize || 20, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    }

    lastPointRef.current = currentPoint;
    handlePercentage(getFilledInPixels(32));
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const containerStyle = {
    width: props.width + "px",
    height: props.height + "px",
    position: "relative",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };

  const canvasStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: "10px",
  };

  const resultStyle = {
    visibility: loaded ? "visible" : "hidden",
    width: "100%",
    height: "100%",
  };

  return (
    <div className="scratch-container" style={containerStyle}>
      <audio ref={audioRef} src="/audios/scratch.mp3" />
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        style={canvasStyle}
        width={props.width}
        height={props.height}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
      />
      <div className="scratch-result" style={resultStyle}>
        {props.children}
      </div>
    </div>
  );
};
