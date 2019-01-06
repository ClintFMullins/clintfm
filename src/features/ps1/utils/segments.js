/* eslint-disable no-template-curly-in-string */

// Data here taken from https://github.com/jmatth/ezprompt/blob/master/js/easyprompt.js and altered

export const SEGMENT_DATA = {
  currentDirectory: {
      code: "\\W",
      example: "cur-dir",
  },
  date: {
      code: "\\d",
      example: generateDate()
  },
  fqdn: {
      code: "\\H",
      example: "host.domain.com"
  },
  fullTime: {
      code: "\\A",
      example: generateTime(false, false)
  },
  fullTimeSeconds: {
      code: "\\t",
      example: generateTime(false, true)
  },
  halfTime: {
      code: "\\@",
      example: generateTime(true, false)
  },
  halfTimeSeconds: {
      code: "\\T",
      example: generateTime(true, true)
  },
  hostname: {
      code: "\\h",
      example: "host-with-most"
  },
  pathToCurrentDirectory: {
      code: "\\w",
      example: "~/projects/cur-dir"
  },
  promptChar: {
      code: "\\\\$",
      example: "$"
  },
  returnCode: {
      code: "\\`nonzero_return\\`",
      pre: "function nonzero_return() {\n\tRETVAL=$?\n\t[ $RETVAL -ne 0 ] && echo \"$RETVAL\"\n}\n",
      example: "1"
  },
  shell: {
      code: "\\s",
      example: "bash"
  },
  shellRelease: {
      code: "\\V",
      example: "4.2.42"
  },
  shellVersion: {
      code: "\\v",
      example: "4.2"
  },
  space: {
      code: " ",
      example: "&nbsp;"
  },
  username: {
      code: "\\u",
      example: "clintfm"
  },
  gitStatus: {
      code: "\\`parse_git_branch\\`",
      example: "[master]",
      pre: "# get current branch in git repo\n"+
          "function parse_git_branch() {\n"+
          "\tBRANCH=`git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \\(.*\\)/\\1/'`\n"+
          "\tif [ ! \"${BRANCH}\" == \"\" ]\n"+
          "\tthen\n"+
          "\t\tSTAT=`parse_git_dirty`\n"+
          "\t\techo \"[${BRANCH}${STAT}]\"\n"+
          "\telse\n"+
          "\t\techo \"\"\n"+
          "\tfi\n"+
          "}\n\n"+
          "# get current status of git repo\n"+
          "function parse_git_dirty {\n"+
          "\tstatus=`git status 2>&1 | tee`\n"+
          "\tdirty=`echo -n \"${status}\" 2> /dev/null | grep \"modified:\" &> /dev/null; echo \"$?\"`\n"+
          "\tuntracked=`echo -n \"${status}\" 2> /dev/null | grep \"Untracked files\" &> /dev/null; echo \"$?\"`\n"+
          "\tahead=`echo -n \"${status}\" 2> /dev/null | grep \"Your branch is ahead of\" &> /dev/null; echo \"$?\"`\n"+
          "\tnewfile=`echo -n \"${status}\" 2> /dev/null | grep \"new file:\" &> /dev/null; echo \"$?\"`\n"+
          "\trenamed=`echo -n \"${status}\" 2> /dev/null | grep \"renamed:\" &> /dev/null; echo \"$?\"`\n"+
          "\tdeleted=`echo -n \"${status}\" 2> /dev/null | grep \"deleted:\" &> /dev/null; echo \"$?\"`\n"+
          "\tbits=''\n"+
          "\tif [ \"${renamed}\" == \"0\" ]; then\n"+
          "\t\tbits=\">${bits}\"\n"+
          "\tfi\n"+
          "\tif [ \"${ahead}\" == \"0\" ]; then\n"+
          "\t\tbits=\"*${bits}\"\n"+
          "\tfi\n"+
          "\tif [ \"${newfile}\" == \"0\" ]; then\n"+
          "\t\tbits=\"+${bits}\"\n"+
          "\tfi\n"+
          "\tif [ \"${untracked}\" == \"0\" ]; then\n"+
          "\t\tbits=\"?${bits}\"\n"+
          "\tfi\n"+
          "\tif [ \"${deleted}\" == \"0\" ]; then\n"+
          "\t\tbits=\"x${bits}\"\n"+
          "\tfi\n"+
          "\tif [ \"${dirty}\" == \"0\" ]; then\n"+
          "\t\tbits=\"!${bits}\"\n"+
          "\tfi\n"+
          "\tif [ ! \"${bits}\" == \"\" ]; then\n"+
          "\t\techo \" ${bits}\"\n"+
          "\telse\n"+
          "\t\techo \"\"\n"+
          "\tfi\n"+
          "}\n"
  },
};

function generateDate() {
  const date = Date().split(" ").slice(0,3);
  let dateString = date[0];
  for (var i = 1; i < date.length; i += 1) {
    dateString += " " + date[i];
  }

  return dateString;
}

function generateTime(halfHours, showSeconds) {
    const today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = showSeconds ? today.getSeconds() : undefined;

    const hours_suffix = halfHours && !showSeconds ? hours >= 12 ? " PM" : " AM" : "";

    hours = hours >= 12 && halfHours ? hours - 12 : hours;
    hours = hours < 10 ? "0" + String(hours) : String(hours);

    minutes = ":" + (minutes < 10 ? "0" + String(minutes) : String(minutes));

    seconds = seconds < 10 ? ":0" + String(seconds) : seconds ? ":" + String(seconds) : "";

    return hours + minutes + seconds + hours_suffix;
}