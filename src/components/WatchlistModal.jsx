import React, { useState } from "react";  // Asegúrate de importar React y useState


//crea la lista de favoritos
export function ListaFavoritos({ favoritos, eliminarFavorito }) {
    const [abierto, setAbierto] = useState(false);
  const cantidad = favoritos.length;
    return (
      <>  
        <i
          className={`bi bi-bookmark-heart-fill text-3xl  z-20 right-5 top-5 cursor-pointer text-[var(--color-red-600)] fixed bg-white p-1 rounded-2xl  `}
          onClick={() => setAbierto(!abierto)}
        > {cantidad}</i>
 
        <ol
          className={`bg-gray-200 fixed  w-[350px]  z-10 right-3 top-20 max-h-[450px] overflow-y-scroll ${abierto ? "block" : "hidden"}`}
        >
          {favoritos.map((favorito) => (
            <li key={favorito.id} className="flex p-1 relative  mb-1 bg-gray-50">
              <img
                src={favorito.imagen}
                alt={favorito.nombre}
                className="w-30 mb-2 object-cover rounded-[5px]"
              />
              <article className=" min-h-[200px] mb-5 ">
                <h3 className=" text-center font-semibold ml-0.5">
                  {favorito.nombre}
                </h3>
                <p className="w-[99%] ml-1">{favorito.sinopsis}</p>
              </article>
  
              {/* Botón de eliminación */}
              <button
                className="absolute bg-red-400 bottom-2 rounded-[5px] hover:bg-red-600 transition-ease-in-out transition-colors duration-75 right-2 pl-2 pr-2  cursor-pointer text-white "
                onClick={() => eliminarFavorito(favorito.id)} // Llama a la función para eliminar el favorito
              >
                Eliminar
              </button>
            </li>
          ))}
        </ol>
      </>
    );
  }
  