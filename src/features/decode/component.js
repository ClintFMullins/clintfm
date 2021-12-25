import React, { useState, useRef, useEffect } from "react";
const funkyChars = {
  " ": " ",
  "☁": "☁",
  "☂": "☂",
  "☃": "☃",
  "☄": "☄",
  "★": "★",
  "☆": "☆",
  "☇": "☇",
  "☈": "☈",
  "☉": "☉",
  "☊": "☊",
  "☋": "☋",
  "☌": "☌",
  "☍": "☍",
  "☎": "☎",
  "☏": "☏",
  "☠": "☠",
  "☡": "☡",
  "☢": "☢",
  "☣": "☣",
  "☤": "☤",
  "☥": "☥",
  "☦": "☦",
  "☧": "☧",
  "☨": "☨",
  "☩": "☩",
  "☪": "☪",
  "☫": "☫",
  "☬": "☬",
  "☭": "☭",
  "☮": "☮",
  "☯": "☯",
};

const alphabet = "abcdefghijklmnopqrstuvwxyz.!?";

export function Decode() {
  const [funky, setFunky] = useState(funkyChars);
  const [letter, setLetter] = useState("a");
  const [phrase, setPhrase] = useState("☈☉ ☌☉☦");
  const curRef = useRef();
  const [strictMode, setStrictMode] = useState(true);
  const [incorrect, setIncorrect] = useState(0);

  console.log("complete?", wordComplete(phrase, funky));

  useEffect(() => {
    if (curRef.current) {
      curRef.current.focus();
    }
  }, []);

  return (
    <div
      style={{
        border: "solid 2px grey",
        background: "#efefef",
        borderRadius: "4px",
        margin: "10%",
        padding: "20px",
      }}
    >
      <div style={{ color: "green", fontSize: "40px" }}>GUESS THE CODE</div>
      <button onClick={() => setStrictMode((prev) => !prev)}>
        Strict Mode: {strictMode ? "ON" : "OFF"}
      </button>
      {strictMode && (
        <span
          style={{ color: "red", display: "inline-block", marginLeft: "10px" }}
        >
          Oopsies: {incorrect}
        </span>
      )}
      <br />
      {phrase.split("").map((key) => {
        return (
          <span
            style={{
              color: "rgba(0,0,0,0.6)",
              display: "inline-block",
              marginRight: "2px",
              width: funky[key] === " " ? "10px" : "auto",
            }}
          >
            {key}
          </span>
        );
      })}
      <br />
      <br />
      <input
        style={{
          width: "46px",
          fontSize: "30px",
          padding: "4px 8px",
          textAlign: "center",
        }}
        ref={curRef}
        onChange={(evt) => {
          const newLetter =
            evt.currentTarget.value[evt.currentTarget.value.length - 1];
          if (newLetter) {
            setLetter(newLetter.toLowerCase());
          }
        }}
        value={letter}
      />
      {wordComplete(phrase, funky) && <div>COMPLETE!</div>}
      <div style={{ fontSize: "42px" }}>
        {phrase.split("").map((key) => {
          return (
            <span
              style={{
                color: key === funky[key] ? "black" : "gray",
                textDecoration:
                  key === funky[key] && funky[key] !== " "
                    ? "underline"
                    : "none",
                display: "inline-block",
                marginRight: "2px",
                cursor: funky[key] !== " " ? "pointer" : "inherit",
                width: funky[key] === " " ? "25px" : "auto",
              }}
              onClick={() => {
                const passingStrict =
                  !strictMode ||
                  (strictMode && correctLetter(letter, funkyChars[key]));

                if (strictMode && !correctLetter(letter, funkyChars[key])) {
                  setIncorrect((prev) => prev + 1);
                }

                if (key !== " " && passingStrict) {
                  setFunky({ ...funky, [key]: letter });
                }

                if (curRef.current) {
                  curRef.current.focus();
                }
              }}
            >
              {funky[key] === " " ? <>&nbsp;</> : funky[key]}
            </span>
          );
        })}
      </div>
      <div>
        {phrase.split("").map((key) => {
          return (
            <span
              style={{
                color: "gray",
              }}
            >
              {funky[key] !== key ? (
                <div>
                  {key} is {funky[key]}
                </div>
              ) : null}
            </span>
          );
        })}
      </div>
      <div style={{ marginTop: "40px", color: "red", fontSize: "40px" }}>
        SET A NEW CODE
      </div>
      <EncodeMessage
        setPhrase={(phr) => {
          setFunky(funkyChars);
          setPhrase(phr);
          setIncorrect(0);
          if (curRef.current) {
            curRef.current.focus();
          }
        }}
      />
    </div>
  );
}

function correctLetter(letter, symbol) {
  const idx = alphabet.split("").indexOf(letter) + 1;

  return symbol === Object.keys(funkyChars)[idx];
}

function wordComplete(phrase, map) {
  let compl = true;

  phrase.split("").forEach((key) => {
    if (key !== " " && map[key] === key) {
      compl = false;
    }
  });

  return compl;
}

function EncodeMessage({ setPhrase }) {
  const [message, setMessage] = useState("");

  const translatedMessage = message
    .split("")
    .map((letter) => {
      const idx = alphabet.split("").indexOf(letter) + 1;

      return Object.keys(funkyChars)[idx];
    })
    .join("")
    .trim();

  return (
    <div>
      <input
        value={message}
        onChange={(evt) => {
          setMessage(evt.currentTarget.value.toLowerCase());
        }}
      />
      <div>{translatedMessage}</div>
      <button
        onClick={() => {
          if (translatedMessage !== "") {
            setPhrase(translatedMessage);
            setMessage("");
          }
        }}
      >
        Set Code Phrase
      </button>
    </div>
  );
}
