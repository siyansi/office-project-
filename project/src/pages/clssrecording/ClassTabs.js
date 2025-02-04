import React, { useEffect, useState, useRef } from "react";
// import "../../components/Event/event.css";

const ClassTabs = ({ selectedTab, onTabChange }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [linePosition, setLinePosition] = useState(0);
  const lineRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tabElements = document.querySelectorAll(".tab");
    const selectedTabIndex = Array.from(tabElements).findIndex(
      (tabElement) => tabElement.getAttribute("data-tab") === selectedTab
    );
    const selectedTabElement = tabElements[selectedTabIndex];
    if (selectedTabElement && lineRef.current) {
      const { offsetLeft, offsetWidth } = selectedTabElement;
      if (offsetLeft !== undefined) {
        const newPosition =
          offsetLeft + offsetWidth / 2 - lineRef.current.offsetWidth / 2;
        animateLine(linePosition, newPosition);
      }
    }
  }, [selectedTab]);

  const animateLine = (startPosition, endPosition) => {
    const duration = 300;
    const interval = 10;
    const step = (endPosition - startPosition) / (duration / interval);

    let currentPosition = startPosition;

    const animate = () => {
      if (Math.abs(currentPosition - endPosition) <= Math.abs(step)) {
        setLinePosition(endPosition);
        return;
      }
      currentPosition += step;
      setLinePosition(currentPosition);
      setTimeout(animate, interval);
    };

    animate();
  };

  const handleTabChange = (event) => {
    onTabChange(event.target.value);
  };

  const tabClass = (tabValue) => {
    return `tab ${selectedTab === tabValue ? "text-black" : "text-opacity-65"}`;
  };

  return (
    <div
      role="tablist"
      className={`flex flex-col sm:flex-row w-full tabs tabs-custom rounded ${
        windowWidth <= 640 ? "h-32" : "h-14"
      } bg-cover border-b-2 justify-around items-center`}
      style={{ fontFamily: "Poppins" }}
    >
      <input
        type="radio"
        name="my_tabs_1"
        role="radio"
        className={`${tabClass("previous")} font-medium text-xl`}
        id="previous-tab"
        aria-label="Previous"
        value="previous"
        checked={selectedTab === "previous"}
        onChange={handleTabChange}
        data-tab="previous"
      />

      <input
        type="radio"
        name="my_tabs_2"
        role="radio"
        className={`${tabClass("current")} font-medium text-xl relative overflow-hidden border-none`}
        id="current-tab"
        aria-label="Current"
        value="current"
        checked={selectedTab === "current"}
        onChange={handleTabChange}
        data-tab="current"
      />

      <input
        type="radio"
        name="my_tabs_3"
        role="radio"
        className={`${tabClass("upcoming")} font-medium text-xl`}
        id="upcoming-tab"
        aria-label="Upcoming"
        value="upcoming"
        checked={selectedTab === "upcoming"}
        onChange={handleTabChange}
        data-tab="upcoming"
      />

      <div
        ref={lineRef}
        className="absolute bg-green-500 w-0 md:w-28 h-[2px] mt-8 rounded-full transition duration-300 ease-in-out"
        style={{ left: linePosition }}
      />
    </div>
  );
};

export default ClassTabs;
