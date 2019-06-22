import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useWindowSize } from "../../../../utils/dom";

const Page = styled.div`
  background: black;
  color: ghostwhite;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

const AddMovieInput = styled.input`
  font-size: 17px;
  height: 56px;
  padding: 0 16px;
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  box-shadow: inset 0 -1px 0 ${props => (props.error ? "#F6341F" : "rgba(255, 255, 255, 0.16)")};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => (props.error ? "#F6341F" : "rgba(255, 255, 255, 0.5)")};
  }
`;

const AddMovieButton = styled.button`
  height: 56px;
  width: 100%;
  background: #20c65a;
  border-radius: 8px;
  color: ghostwhite;
  font-size: 17px;
  font-weight: 600;
  border: none;
`;
const ButtonContainer = styled.div`
  padding: 16px;
  width: 100%;
`;

const MovieWrapper = styled.div`
  padding: 16px;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.16);
  display: flex;
`;

const TopDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailSection = styled.div`
  margin-left: 16px;
  flex-grow: 1;
`;

const Name = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const Score = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
`;

const Tomato = styled.img`
  margin-right: 3px;
`;

const TimeInfo = styled.div`
  font-size: 13px;
  opacity: 0.75;
  margin-top: 3px;
`;

function getApiUrl(query) {
  return `https://www.omdbapi.com/?t=${query}&apikey=22101760`;
}

function getScore(json) {
  const ratings = json.Ratings;
  let lastRating = null;

  for (let idx = 0; idx < ratings.length; idx++) {
    const rating = ratings[idx];
    lastRating = rating["Value"];

    if (rating["Source"] === "Rotten Tomatoes") {
      break;
    }
  }

  return lastRating;
}

function getName(json) {
  return json.Title;
}

function rottenTomatoImg(type) {
  return `https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/${type}.png`;
}

export function FlightFilms() {
  const { height, width } = useWindowSize();
  const [query, setQuery] = useState("");
  const [films, setFilms] = useState([]);
  const [error, setError] = useState("");
  const ref = useRef();

  function onInputChange(event) {
    setQuery(event.currentTarget.value);
  }

  function setDuplicate() {
    setQuery("");
    setError("You already have this film");
  }

  function setNoFilm() {
    setQuery("");
    setError("No matches, try again");
  }

  function clearError() {
    setError("");
  }

  function addFilm(newFilm) {
    fetch(getApiUrl(newFilm))
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        if (json.Error) {
          setNoFilm();
          return;
        }

        const name = getName(json);

        if (films.find(film => film.name === name)) {
          setDuplicate();
          return;
        }

        setFilms([...films, { name, score: getScore(json), metadata: json }]);
        setQuery("");
        focusOnInput();
      });
  }

  function onKeyPress(event) {
    if (error) {
      clearError();
    }

    if (event.keyCode === 13) {
      addFilm(query);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  });

  useEffect(() => {
    focusOnInput();
  });

  function removeMovie(name) {
    setFilms(films.filter(film => film.name !== name));
    focusOnInput();
  }

  function focusOnInput() {
    if (ref.current) {
      ref.current.focus();
    }
  }

  return (
    <Page height={height} width={width}>
      <div>
        <AddMovieInput
          value={query}
          onChange={onInputChange}
          placeholder={!!error ? error : "Search for film..."}
          ref={ref}
          error={!!error}
        />
      </div>

      <div>
        {films
          .sort((a, b) => (a.score > b.score ? -1 : 1))
          .map(({ name, score, metadata }) => (
            <MovieWrapper key={name} onClick={() => removeMovie(name)}>
              <img
                src={
                  metadata.Poster === "N/A"
                    ? "https://alumni.ctksfc.ac.uk/files/2015/12/Interview-questions-square-image-1024x768.jpg"
                    : metadata.Poster
                }
                alt={name}
                height="72"
                width="48"
              />
              <DetailSection>
                <TopDetails>
                  <Name>{name}</Name>
                  <Score>
                    {score && (
                      <Tomato
                        src={
                          parseInt(score[0]) < 6
                            ? rottenTomatoImg("new-rotten.efc30acb29c")
                            : rottenTomatoImg("new-fresh.587bf3a5e47")
                        }
                        height="16px"
                        width="16px"
                      />
                    )}
                    {score}
                  </Score>
                </TopDetails>
                <TimeInfo>
                  {metadata.Year} · {metadata.Runtime}
                </TimeInfo>
              </DetailSection>
            </MovieWrapper>
          ))}
        <ButtonContainer>
          <AddMovieButton onClick={() => addFilm(query)}>
            Add to list
          </AddMovieButton>
        </ButtonContainer>
      </div>
    </Page>
  );
}
