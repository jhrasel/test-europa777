// // components/LottieAnimation.js
// import lottie from "lottie-web";
// import { useEffect, useRef } from "react";

// const LottieAnimation = ({ animationData, loop = true }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Ensure document is defined before accessing it
//     if (typeof document !== "undefined") {
//       const animation = lottie.loadAnimation({
//         container: containerRef.current,
//         renderer: "svg", // Use 'canvas' if you prefer
//         loop,
//         autoplay: true,
//         animationData,
//       });

//       return () => {
//         animation.destroy(); // Cleanup on component unmount
//       };
//     }
//   }, [animationData, loop]);

//   return <div ref={containerRef} />;
// };

// export default LottieAnimation;
