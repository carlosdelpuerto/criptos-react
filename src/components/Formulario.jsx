import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'



const InputSubmit = styled.input `
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;


  &:hover{
    background-color: #7A7DFE;
    cursor: pointer;
  }
`


//Formulario con uso de tus propios HOOKS

const Formulario = ({setMonedas}) => {
 
// el "state" del return de useSelectMonedas, aqui pasa a ser "monedas". Los hooks se toman por indice, asi que no importa como se llamen o dejen de llamar, en fin solo importa el indice.

  
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)

//consulta API pasos: {1: crear una constante con funcion async} {2: Dentro de su lexical enviroment crear constantes de la URL con valor del url de la api.} {3: crear el await para extraer los datos con el fetch()} {4: el resultado siendo await convertir la respuesta.json()} {5:consolear o extraer la Data} {6: crear un array de objetos con un map}


  useEffect(() =>{

    const consultarAPI = async () =>{
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch(url) 
      const resultado = await respuesta.json()
      
      const arrayCriptos = resultado.Data.map( cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
          return objeto
      } )

      setCriptos(arrayCriptos)
    }

    consultarAPI()

  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if([moneda, criptomoneda].includes('')){
      setError(true)
      return
    }
    setError(false)

    setMonedas({
      moneda,
      criptomoneda
    })
  }


  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
   
    <form
    onSubmit={handleSubmit}>
    
    <SelectMonedas/>
    <SelectCriptomoneda/>

   
    <InputSubmit
      type='submit' value='Cotizar'
    />
    </form>
    </>
  )
}

export default Formulario