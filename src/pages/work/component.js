import React, { useEffect, useState } from "react";
import { CorePrinciples } from "./components/core-principles/component";
import { TechSkills } from "./components/tech-skills/component";
import styled from "styled-components";
import "./styles.css";
import { useWindowSize } from "../../utils/dom";

const SCALE_FACTOR = 15;

const SubtleLink = styled.a`
  color: grey;
  font-weight: 600;
`;

const LINKEDIN_URL = "https://www.linkedin.com/in/clint-m-5651a161/";
const MIN_SCALE = 1;
const MAX_SCALE = 5;

export function Work() {
  const { height } = useWindowSize();
  const [color, setColor] = useState(window.scrollY);
  const [scale, setScale] = useState(MIN_SCALE);
  const [opacity, setOpacity] = useState(1);

  function throttledOnScroll(scrollPosition) {
    const newHue = (scrollPosition / SCALE_FACTOR) % 360;

    setColor(newHue);
  }

  function onScroll() {
    const transitionLength = height / 1.5;
    const startHeight = 0;
    const endHeight = startHeight + transitionLength;

    const num = convertRange(
      window.scrollY,
      [startHeight, endHeight],
      [0, 100]
    );
    setOpacity(clamp((100 - num) / 100, 0, 1));
    setScale(
      clamp(
        convertRange(num, [0, 100], [MIN_SCALE, MAX_SCALE]),
        MIN_SCALE,
        MAX_SCALE
      )
    );

    const timeoutId = setTimeout(function () {
      throttledOnScroll(window.scrollY);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <div
      className="work-wrapper"
      style={{
        background: `hsl(${color}, 80%, 93%)`,
        transition: "background 400ms linear",
      }}
    >
      <div className="work">
        <div
          className="intro"
          style={{
            height,
            transform: `scale(${scale})`,
            opacity,
            pointerEvents: window.scrollY > 200 ? "none" : "inherit",
          }}
        >
          <div className="intro-wrapper">
            <div className="intro-sec">
              <div className="intro-text">Hi, my name is</div>{" "}
              <div className="bold-it intro-text-right">Clint Mullins</div>
            </div>
            <div className="intro-sec">
              <div className="intro-text">I'm a </div>
              <div className="intro-text-right">
                <span className="bold-it">tech lead</span> &{" "}
                <div className="bold-it">engineering manager</div>
              </div>
            </div>
            <div className="intro-sec">
              <div className="intro-text">with a love for </div>
              <div className="fe-focus intro-text-right">
                a/b testing & <br /> user delight
              </div>
            </div>
            <div className="intro-hint">
              Scroll down for information that compliments my{" "}
              <a rel="noopener noreferrer" target="_blank" href={LINKEDIN_URL}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <CorePrinciples />
        <TechSkills />

        <div className="explanation-wrapper" style={{ minHeight: height }}>
          <div>
            <div className="tech-skills-skill-wrapper">
              <h2>Why is this page so simple? Where's the pizzazz?</h2>
              <p>
                Good question! My goal here is to give you a quick overview of
                my work philosophy and toolset. If that answer leaves you
                wanting, here are some options for you:
                <ul>
                  <li>
                    For some pizzazz check out the{" "}
                    <SubtleLink href="/play">play page</SubtleLink> for fun
                    experiments of mine
                  </li>
                  <li>
                    If you want strictly professional experience,{" "}
                    <SubtleLink
                      rel="noopener noreferrer"
                      target="_blank"
                      href={LINKEDIN_URL}
                    >
                      LinkedIn
                    </SubtleLink>{" "}
                    is the place to be
                  </li>
                  <li>
                    Or see the{" "}
                    <SubtleLink
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://growdoku.netlify.app/growdoku"
                    >
                      growing sudoku
                    </SubtleLink>{" "}
                    game I made while messing with Remix.run
                  </li>
                  <li>
                    Or{" "}
                    <SubtleLink
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://gridbingo.netlify.app/?size=3"
                    >
                      this thing
                    </SubtleLink>{" "}
                    my sister asked me to build for my young nephews :)
                  </li>
                  <li>
                    Or{" "}
                    <SubtleLink
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://craftbuild.netlify.app/"
                    >
                      this minecraft build instruction toy
                    </SubtleLink>{" "}
                    I made in just a few hours thanks to the amazing tooling out
                    there
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
