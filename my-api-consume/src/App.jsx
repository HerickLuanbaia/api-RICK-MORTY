import s from './App.module.css'
import logo from '/logo.jpg'
import { api } from './constants/api'
import { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt';

function App() {
  const [data,setData] = useState([])
  const [page, setPage] = useState()
  const [inputPage,setInputPage] = useState("")


  useEffect(() => {
      const carrega = async () => {
        try {
          const response = await api.get(`/character/?page=${page}`)
          setData(response.data.results)
        } catch {
          console.error("não foi possivel buscar personagens")
        }
      }
      carrega()
    }, [page])

  

  return (
    <>
    <div className={s.wrapImg}>
      <img  width={500}src={logo} alt="logo" className={s.logo} />
    </div>

    <div className={s.wrapInputs}>
      <label>Digite uma pagina de 1/42</label>
      <input type="number" name={1} max={42} placeholder='1/42' value={inputPage} onChange={(e) => setInputPage(e.target.value)} />
      <button onClick={() => setPage(Number(inputPage))}>buscar</button>
    </div>
      <main>
        {data.map(item  => {
          return(
            <Tilt key={item.id}>
              <div className={s.card}>
              <img src={item.image} alt={item.name} />
              <div className={s.wraptexts}>
                <h2>{item.name}</h2>
                <p>{item.status}</p>
                <p>{item.species}</p>
                <p>{item.gender}</p>
                <p>{item.location.name}</p>
              </div>
            </div>
            </Tilt>
            
          )
        })}
      </main>
    </>
  )
}

export default App
