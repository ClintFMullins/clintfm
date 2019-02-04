import React from 'react';
import { useWindowSize } from '../../../../utils/dom';

const SECTION_TITLE_TO_TEXT = {
  'Exhibit ownership': `I try to always think like an owner. "How can I make this better?" I believe if everyone feels ownership, the resulting product will excel.`,

  'Be pragmatic': `I generally don't believe in absolutes when it comes to development. Beyond a few language-independent universal truths, 'best practice' is something that usually depends on the context of a problem.`,

  'Align before execution': `I read/write product/engineering specs, ask hard questions, build prototypes as needed, and expect transparency from everyone to get proper plans in place. Agreement up front means smoother and more intentional development.`,

  'Measure and iterate': `It's dangerous to assume product changes are making the UX better. Measure the impact of your changes, and use those measurements to inform further iterations.`,

  'Be product obsessed': 'Teams who challenge each other and have tough conversations will build better products. I encourage all engineers to ask product/design/data folks about their decisions. Sometimes you find a solid foundation and other times you find holes that need to be filled. Regardless of findings, everyone hardens their understanding of the product and how to move forward.',

  'Be demanding, but understanding': `I believe my most rewarding times at work have been when I am invested, productive, and working hard. I generally expect my coworkers to give a similar level of effort within a standard work week. I'm also empathetic to the curveballs life can throw and realize giving 100% for 40ish hours a week isn't always on the table.`
}

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
  )
}