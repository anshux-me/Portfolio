import { useEffect, useState } from "react";
import "./intro.css";

const IntroOverlay = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Total animation duration
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3200); // matches CSS animation timing

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-overlay">
      <h1 className="intro-text">
        Let’s dive into Anshu’s portfolio
      </h1>
    </div>
  );
};

export default IntroOverlay;
