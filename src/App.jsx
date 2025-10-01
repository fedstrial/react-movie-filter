import './App.css'
import Movies from './components/movies'
import Movie from './components/Movie'
import { useEffect, useState } from 'react'

function App() {
	const [movies, setMovies] = useState(Movies)
	const [selectedGenre, setSelectedGenre] = useState("all")
	const [search, setSearch] = useState("")
	const [genre, setGenre] = useState("")
	const [title, setTitle] = useState("")
	const [filteredMovies, setFilteredMovies] = useState(movies)

	const loadMovies = () => filteredMovies.map(movie => <Movie title={movie.title} />)

	//TODO: add keys and/or ids by using a unique state

	const filterByGenre = (movies, genre) => {
		return genre === "all" ? movies : movies.filter(movie => movie.genre === genre);
	};

	// Cool ternary idea, not the best for intuitive code
	const filterBySearch = (movies, searchTerm) => {
		const cleanSearch = searchTerm.trim().toLowerCase();
		return searchTerm ? movies.filter(movie => movie.title.trim().toLowerCase().includes(cleanSearch)) : movies;
	}; 
	
	// basically passes the result and what I wanna do to every function and returns 
	// the original array if action is unnecessary, pretty roundabout logic but ends
	// up with a clean useEffect
	useEffect(() => {
		let result = movies;
		result = filterByGenre(result, selectedGenre);
		result = filterBySearch(result, search);
		setFilteredMovies(result);

	}, [search, movies, selectedGenre]);

	const addMovie = e => {
		e.preventDefault();
		setMovies([...movies, { genre: genre.trim(), title: title.trim() }])
		setGenre("")
		setTitle("")
	}

	return (
		<main className='container py-5'>
			<div>
				<label htmlFor="movie-selctor">Genere:</label>
				<select name="movies" id="movie-selector" className='form-select' value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
					<option value="all">All</option>
					{movies.map(movie => <option value={movie.genre}>{movie.genre}</option>)}
				</select>
			</div>

			<div className='pb-4'>
				<label htmlFor="search"></label>
				<input type="text" className="form-control" placeholder="Search" id='search' value={search} onChange={e => setSearch(e.target.value)} />
			</div>

			<form className='d-flex flex-column gap-4' onSubmit={addMovie}>

				<div className="form-group">
					<input type="text" className="form-control" placeholder="Title" id='title-input' value={title} onChange={e => setTitle(e.target.value)} />
				</div>

				<div className="form-group">
					<input type="text" className="form-control" placeholder='Genre' id='genre-input' value={genre} onChange={e => setGenre(e.target.value)} />
				</div>

				<button type="submit" className="btn btn-primary" disabled={title.length === 0 && genre.length === 0}>Aggiungi</button>
			</form>

			<div className='pt-4'>
				<ul className='list-unstyled'>
					{loadMovies()}
				</ul>
			</div>
		</main>
	)
}

export default App