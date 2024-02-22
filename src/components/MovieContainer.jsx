import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import style from '../App.module.css';
import { useResize } from '../use-resize';
import { Context } from '../context';
import { APIS } from '../apis';

import InputSearch from './SearchInput';
import { MovieCardDesktop } from './MovieCardDesktop';
import { MovieCardMobile } from './MovieCardMobile';

const MovieContainer = () => {
  const { width } = useResize();

  const [isLoading, setIsLoading] = useState(true);

  const [searched, setSearched] = useState(false);

  const [page, setPage] = useState(1);

  const [value, setValue] = useState('');

  const [data, setData] = useState({});

  const [rated, setRatedMovie] = useState({});

  const [genres, setGenres] = useState();

  const [rate, setRate] = useState(0);
  
  const [ratedID, setRatedID] = useState(0);

  const handleChange = (value) => {
    setValue(value);
  };

  const handleClickRated = () => {
    setSearched(false);
  };

  const handleClickSearched = () => {
    setSearched(true);
  };

  const handleRateChange = (value, id) => {
    setRate(value);
    setRatedID(id);
  };

  const API_SEARCH = APIS.API_SEARCH.replace('{movie_name}', `${encodeURI(value)}`);
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch(
        `${API_SEARCH}${page}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: APIS.API_AUTHORIZATION,
          },
        }
      );
      const json = await data.json();
      !data.ok ? setIsLoading(true) : setIsLoading(false);
      setData(json);
      setIsLoading(false);
    };

    const API_SET_RATE = APIS.API_RATED.replace('{movie_id}', ratedID);
    const setRated = async () => {
      await fetch(API_SET_RATE, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: APIS.API_AUTHORIZATION,
        },
        body: `{"value":${JSON.stringify(rate)}}`,
      });
    };

    const fetchRatedData = async () => {
      setIsLoading(true);
      const data = await fetch(
        `${APIS.API_RATED_LIST}${page}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: APIS.API_AUTHORIZATION,
          },
        }
      );
      const res = await data.json();
      data.ok && setRatedMovie(res);
      setIsLoading(false);
    };
  
    useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.length !== 0) fetchData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value, page]);

  useEffect(() => {
    ratedID && setRated();    
  }, [ratedID, rate]);

  useEffect(() => {
    fetchRatedData();
  }, [rate, ratedID]);

  useEffect(() => {
    const getGenre = async () => {
      const genres = await fetch(APIS.API_GENRES, {
        headers: {
          accept: 'application/json',
          Authorization: APIS.API_AUTHORIZATION
        }
      });
      const res = await genres.json();
      genres.ok && setGenres(res.genres);
    };
    getGenre();
  }, []);


  console.log(isLoading);
  return (
    <Context.Provider
      value={{
        handleRateChange,
        genres
      }}
    >
      <div className={style.task__container}>
        <div className={style.header}>
          <button className={searched === true ? style.focus : style.tab__button} onClick={handleClickSearched}>
            Search
          </button>
          <button className={searched === false ? style.focus : style.tab__button} onClick={handleClickRated}>
            Rated
          </button>
        </div>
        {searched && <InputSearch onChange={handleChange} />}
        <div className={style.main}>
          {isLoading === true ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={
                    width < 720
                      ? { fontSize: 50, marginTop: 50, marginLeft: 30 }
                      : width > 720 && width < 1011
                        ? { fontSize: 50, marginTop: 50, marginLeft: 450 }
                        : { fontSize: 50, marginTop: 50, marginLeft: 450 }
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
          ? (value !== '' && !isLoading) && (
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
