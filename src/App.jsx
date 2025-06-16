import {Cards} from "./components/MovieCard";
import {peliculas} from './components/ListaPeliculas';

function App() {
  return (
    <>
    <main className='bg-gray-100 min-w-full relative'>
      {/*carga peliculas*/}
     <Cards peliculas = {peliculas}></Cards>
     </main>
    </>
  )
}

export default App
