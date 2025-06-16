import { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import { ListaFavoritos } from "./WatchlistModal"; // Importamos el componente ListaFavoritos que muestra la watchlist

export function Cards({ peliculas }) { // Definimos el componente Cards que recibe un prop llamado "peliculas"
  
  // Estado para la watchlist, inicializándolo con un array vacío
  const [watchlist, setWatchlist] = useState([]);

  // Función para agregar una película a la watchlist
  const addToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie]); // Actualizamos el estado de la watchlist agregando la nueva película
    localStorage.setItem("watchlist", JSON.stringify([...watchlist, movie])); // Guardamos la watchlist actualizada en localStorage
  };

  // Función para eliminar una película de la watchlist
  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter(movie => movie.id !== id); // Filtramos la watchlist para eliminar la película con el id proporcionado
    setWatchlist(updatedList); // Actualizamos el estado de la watchlist
    localStorage.setItem("watchlist", JSON.stringify(updatedList)); // Guardamos la watchlist actualizada en localStorage
  };

  // Cargamos la watchlist desde localStorage al montar el componente
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || []; // Obtenemos la watchlist guardada en localStorage o un array vacío si no existe
    setWatchlist(savedWatchlist); // Actualizamos el estado de la watchlist con los datos obtenidos
  }, []); // Este efecto se ejecuta solo una vez, cuando el componente se monta

  return (
    <>
      {/* Mostramos la lista de favoritos utilizando el componente ListaFavoritos */}
      <ListaFavoritos favoritos={watchlist} eliminarFavorito={removeFromWatchlist} />

      {/* Lista de películas */}
      <ol className="flex flex-wrap justify-center w-[90%] m-auto pt-20">
        {peliculas.map((pelicula) => ( // Mapeamos el array de películas para renderizar cada una
          <li key={pelicula.id} className="max-w-80 ml-1 mr-1 mb-2"> {/* Cada película se muestra en un elemento li con un key único */}
            <div className="shadow-2xl relative h-[100%] text-center flex flex-wrap group overflow-hidden rounded-2xl">
              
              {/* Imagen de la película */}
              <img
                src={pelicula.imagen} // URL de la imagen de la película
                alt={pelicula.nombre} // Nombre de la película como texto alternativo
                className="w-[100%] h-[100%] object-cover group-hover:scale-120 transition duration-400 ease-in-out" // Estilos para la imagen
              />
              
              {/* Nombre de la película */}
              <h2 className="font-semibold w-[100%] text-xl text-white absolute p-4 bg-[var(--color-black-50)] bottom-0 group-hover:text-[var(--color-red-500)] transition duration-400 ease-in-out">
                {pelicula.nombre} {/* Mostramos el nombre de la película */}
              </h2>

              {/* Íconos de agregar/quitar de la watchlist */}
              <div className="absolute right-0 m-2">
                
                {/* Ícono para agregar a la watchlist */}
                <i
                  className={`bi bi-bookmark-heart text-4xl text-green-300 cursor-pointer ${
                    watchlist.some(movie => movie.id === pelicula.id) ? "hidden" : "block" // Mostramos el ícono solo si la película no está en la watchlist
                  }`}
                  onClick={() => addToWatchlist(pelicula)} // Agregamos la película a la watchlist al hacer clic
                ></i>

                {/* Ícono para quitar de la watchlist */}
                <i
                  className={`bi bi-bookmark-heart-fill text-4xl text-green-300 cursor-pointer ${
                    watchlist.some(movie => movie.id === pelicula.id) ? "block" : "hidden" // Mostramos el ícono solo si la película está en la watchlist
                  }`}
                  onClick={() => removeFromWatchlist(pelicula.id)} // Eliminamos la película de la watchlist al hacer clic
                ></i>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}