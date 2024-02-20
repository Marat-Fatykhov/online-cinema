import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import style from '../css_modules/MovieContainer.module.css';
import { useResize } from '../use-resize';
import { Context } from '../context';

import InputSearch from './SearchInput';
import { MovieCardDesktop } from './MovieCardDesktop';
import { MovieCardMobile } from './MovieCardMobile';

const API_AUTHORIZATION =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmRkYmJhNjdjYzIzOGYxYjlkYTc2ZjFmZTlkMTAyZSIsInN1YiI6IjY1YmZkYmRmNDM5OTliMDE4NGM4NThjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TDTqMYy2qJP5gEkLFc-ni0OOr9C1EWRQNcgdJ508KC0';

const MovieContainer = () => {
  const { width } = useResize();

  const [isLoading, setIsLoading] = useState(true);

  const [searched, setSearched] = useState(false);

  const [page, setPage] = useState(1);

  const [value, setValue] = useState('');

  const [data, setData] = useState({});

  const [rated, setRated] = useState({});

  const handleChange = (value) => {
    setValue(value);
  };

  const handleClickRated = () => {
    setSearched(false);
  };

  const handleClickSearched = () => {
    setSearched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURI(value)}&include_adult=false&language=ru-RU&page=${page}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: API_AUTHORIZATION,
          },
        }
      );
      const json = await data.json();
      !data.ok ? setIsLoading(true) : setIsLoading(false);
      setData(json);
    };

    const timeout = setTimeout(() => {
      if (value.length !== 0) fetchData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value, page]);

  const [rate, setRate] = useState(0);
  const [ratedID, setRatedID] = useState(0);

  const handleRateChange = (value, id) => {
    setRate(value);
    setRatedID(id);
  };

  useEffect(() => {
    const setRate = async () => {
      await fetch(`https://api.themoviedb.org/3/movie/${ratedID}/rating`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: API_AUTHORIZATION,
        },
        body: `{"value":${JSON.stringify(rate)}}`,
      });
    };
    ratedID && setRate();
  }, [ratedID, rate]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/account/20967720/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
        {
          headers: {
            accept: 'application/json',
            Authorization: API_AUTHORIZATION,
          },
        }
      );
      const res = await data.json();
      data.ok ? setIsLoading(false) : setIsLoading(true);
      setRated(res);
    };
    const interval = setInterval(() => fetchData(), 100);

    return () => clearInterval(interval);
  }, [rate, page]);

  return (
    <Context.Provider
      value={{
        handleRateChange,
      }}
    >
      <div className="task__container">
        <div className={style.header}>
          <button className={searched === true ? style.focus : style.tab__button} onClick={handleClickSearched}>
            Search
          </button>
          <button className={searched === false ? style.focus : style.tab__button} onClick={handleClickRated}>
            Rated
          </button>
        </div>
        {searched && <InputSearch onChange={handleChange} />}
        <div className="main">
          {isLoading === true ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={
                    width < 720
                      ? { fontSize: 50, marginTop: 50, marginLeft: 30 }
                      : width > 720 && width < 1011
                        ? { fontSize: 50, marginTop: 50, marginLeft: 450 }
                        : { fontSize: 50, marginTop: 50, marginLeft: 30 }
                  }
                />
              }
            />
          ) : searched === false ? (
            rated.results.map((movie) => {
              return width <= 720 ? (
                <MovieCardMobile key={movie.id} movie={movie} rateChange={handleRateChange} />
              ) : (
                <MovieCardDesktop key={movie.id} movie={movie} rateChange={handleRateChange} />
              );
            })
          ) : (
            searched &&
            Object.keys(data).length > 0 &&
            value !== '' &&
            data.results.map((movie) => {
              return width <= 720 ? (
                <MovieCardMobile key={movie.id} movie={movie} rateChange={handleRateChange} />
              ) : (
                <MovieCardDesktop key={movie.id} movie={movie} rateChange={handleRateChange} />
              );
            })
          )}
        </div>
        {searched
          ? value !== '' && (
              <Pagination
                defaultCurrent={1}
                showSizeChanger={false}
                total={data.total_pages}
                onChange={(e) => setPage(e)}
                style={{ marginTop: 10 }}
              />
            )
          : !isLoading && (
              <Pagination
                defaultCurrent={1}
                showSizeChanger={false}
                total={rated.total_pages}
                onChange={(e) => setPage(e)}
                style={{ marginTop: 10 }}
              />
            )}
      </div>
    </Context.Provider>
  );
};

export default MovieContainer;
