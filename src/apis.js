const account_id = 20967720;
// вынести все переменные в env файл
export const APIS = {
    API_AUTHORIZATION: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmRkYmJhNjdjYzIzOGYxYjlkYTc2ZjFmZTlkMTAyZSIsInN1YiI6IjY1YmZkYmRmNDM5OTliMDE4NGM4NThjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TDTqMYy2qJP5gEkLFc-ni0OOr9C1EWRQNcgdJ508KC0',
    API_GENRES: 'https://api.themoviedb.org/3/genre/movie/list',
    API_SEARCH: 'https://api.themoviedb.org/3/search/movie?query={movie_name}&include_adult=false&language=en-US&page=',
    API_RATED: 'https://api.themoviedb.org/3/movie/{movie_id}/rating',
    API_RATED_LIST: `https://api.themoviedb.org/3/account/${account_id}/rated/movies?language=en-US&page=`
};

