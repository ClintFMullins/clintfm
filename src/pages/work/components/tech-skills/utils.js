function getDateFromYearMonth(year, month) {
  const date = new Date();
  date.setYear(year);
  date.setMonth(month);
  return date;
}

const DAY_MS = 1000 * 60 * 60 * 24;
const MONTH_MS = DAY_MS * 30;
const YEAR_MS = DAY_MS * 365;

// Just adds 's'
function simpleHandlePlural(str, num) {
  return `${str}${num === 1 ? '' : 's' }`
}

export const timeSpentProgramming = Date.now() - getDateFromYearMonth(2009, 6);
export const timeAsProfessional = Date.now() - getDateFromYearMonth(2013, 8);

export const TECH_SKILLS = {
  'Javascript': {
    timeSpent: Date.now() - getDateFromYearMonth(2011, 6),
    isUsingCurrently: true,
  },
  'React': {
    timeSpent: Date.now() - getDateFromYearMonth(2014, 6),
    isUsingCurrently: true,
  },
  'Redux': {
    timeSpent: Date.now() - getDateFromYearMonth(2016, 9),
    isUsingCurrently: true,
  },
  'GraphQL (client)': {
    timeSpent: Date.now() - getDateFromYearMonth(2017, 6),
    isUsingCurrently: true,
  },
  'GraphQL (server)': {
    timeSpent: Date.now() - getDateFromYearMonth(2018, 8),
    isUsingCurrently: true,
  },
  'Ember': {
    timeSpent: getDateFromYearMonth(2017, 6) - getDateFromYearMonth(2017, 1),
    isUsingCurrently: false,
  },
  'HTML/CSS/SASS': {
    timeSpent: Date.now() - getDateFromYearMonth(2011, 6),
    isUsingCurrently: true,
  },
  'TypeScript': {
    timeSpent: Date.now() - getDateFromYearMonth(2017, 6),
    isUsingCurrently: true,
  },
  'Go': {
    timeSpent: Date.now() - getDateFromYearMonth(2018, 6),
    isUsingCurrently: true,
  },
  'Java': {
    timeSpent: getDateFromYearMonth(2013, 6) - getDateFromYearMonth(2011, 6),
    isUsingCurrently: false,
  },
  'Python': {
    timeSpent: getDateFromYearMonth(2010, 6) - getDateFromYearMonth(2009, 6),
    isUsingCurrently: false,
  },
  'Ruby': {
    timeSpent: getDateFromYearMonth(2016, 6) - getDateFromYearMonth(2013, 8),
    isUsingCurrently: false,
  },
  'Rails': {
    timeSpent: getDateFromYearMonth(2016, 6) - getDateFromYearMonth(2013, 8),
    isUsingCurrently: false,
  },
};

export const SORTED_TECH_SKILLS_KEYS = Object.keys(TECH_SKILLS).sort((keyA, keyB) => {
  const skillA = TECH_SKILLS[keyA];
  const skillB = TECH_SKILLS[keyB];

  if (skillA.isUsingCurrently && !skillB.isUsingCurrently) {
    return -1;
  } else if (!skillA.isUsingCurrently && skillB.isUsingCurrently) {
    return 1;
  }

  return skillB.timeSpent - skillA.timeSpent;
});

export function getWrittenTime(millis) {
  if (millis >= YEAR_MS) {
    const numberOfYears = Math.round(millis / YEAR_MS);
    return `~${numberOfYears} ${simpleHandlePlural('year', numberOfYears)}`;
  } else if (millis >= MONTH_MS) {
    const numberOfMonths = Math.round(millis / MONTH_MS);
    return `~${numberOfMonths} ${simpleHandlePlural('month', numberOfMonths)}`;
  } else {
    return '< 1 month';
  }
}