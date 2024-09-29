import React from "react";
import { useWindowSize } from "../../../../utils/dom";

const SECTION_TITLE_TO_TEXT = {
  "Selfless ownership": `Own your work, but don't miss good collaboration opportunities to make it better.`,

  "Be pragmatic": `There's no silver bullet, ever. Choose the right trade-offs for each situation.`,

  "Align often": `Write plans, make prototypes, build in pieces. Share it all frequently.`,

  "Measure and iterate": `Measure your impact, iterate to improve it.`,

  "Be demanding, but understanding": `Expect the best from your team, but prepare for the unexpected speedbumps`,
};

export function CorePrinciples() {
  const { height } = useWindowSize();

  return (
    <div className="core-strengths" style={{ minHeight: height }}>
      <div>
        {Object.keys(SECTION_TITLE_TO_TEXT).map((title) => {
          return (
            <div className="wordy-section" key={title}>
              <div className="wordy-section-title">{title}</div>
              {SECTION_TITLE_TO_TEXT[title]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
