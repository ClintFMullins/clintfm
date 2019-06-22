import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Page = styled.div`
  background: black;
  color: ghostwhite;
  height: 100vh;
  width: 100vw;
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
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.16);

  &:focus {
    outline: none;
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
  position: absolute;
  bottom: 0;
  left: 0;
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
  return `http://www.omdbapi.com/?t=${query}&apikey=22101760`;
}

function getScore(json) {
  const ratings = json["Ratings"];
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
  return json["Title"];
}

export function FlightFilms() {
  const [query, setQuery] = useState("");
  const [films, setFilms] = useState([]);
  const ref = useRef();

  function onInputChange(event) {
    setQuery(event.currentTarget.value);
  }

  function addFilm(newFilm) {
    fetch(getApiUrl(newFilm))
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(JSON.stringify(json));
        if (json["Error"]) {
          return;
        }

        setFilms([
          ...films,
          { name: getName(json), score: getScore(json), metadata: json }
        ]);
        setQuery("");
        focusOnInput();
      });
  }

  function onKeyPress(event) {
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
    <Page>
      <div>
        <AddMovieInput
          value={query}
          onChange={onInputChange}
          placeholder="Search for film..."
          ref={ref}
        />
      </div>

      <div>
        {films
          .sort((a, b) => (a.score > b.score ? -1 : 1))
          .map(({ name, score, metadata }) => (
            <MovieWrapper key={name} onClick={() => removeMovie(name)}>
              <img src={metadata.Poster} alt={name} height="72" width="48" />
              <DetailSection>
                <TopDetails>
                  <Name>{name}</Name>
                  <Score>
                    <Tomato
                      src={
                        "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-fresh.587bf3a5e47.png"
                      }
                      height="16px"
                      width="16px"
                    />
                    {score}
                  </Score>
                </TopDetails>
                <TimeInfo>
                  {metadata.Year} · {metadata.Runtime}
                </TimeInfo>
              </DetailSection>
            </MovieWrapper>
          ))}
      </div>
      <ButtonContainer>
        <AddMovieButton onClick={() => addFilm(query)}>
          Add to list
        </AddMovieButton>
      </ButtonContainer>
    </Page>
  );
}
