import MovieCard from "./components/MovieCard";
import AddMovie from "./components/AddMovie";

async function obtenerPeliculas() {
  const query = `
    {
      peliculas {
        titulo
        year
        genero
      }
    }
  `;

  const respuesta = await fetch(
    `http://localhost:3000/peliculas/api/graphql?query=${encodeURIComponent(query)}`
  );

  const datos = await respuesta.json();

  return datos.data.peliculas;
}

export default async function Peliculas() {
  const peliculas = await obtenerPeliculas();


  const peliculasUnicas = peliculas.filter(
  (pelicula, index, array) =>
    index === array.findIndex(
      (p) => p.titulo === pelicula.titulo
    )
);

 return (
  <main>
    <h1>Películas</h1>

    <AddMovie />



    {peliculasUnicas.map((pelicula) => (
      <MovieCard
        key={pelicula.titulo}
        titulo={pelicula.titulo}
        year={pelicula.year}
        genero={pelicula.genero}
      />
    ))}
  </main>
);
 
}