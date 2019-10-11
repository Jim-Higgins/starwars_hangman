import Axios from "axios";

const url = "https://swapi.co/api/films/";

const getFilms = () => {
	return Axios.get(`${url}`).then(({ data: { results } }) => results);
};
export default getFilms;
