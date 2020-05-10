import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

import axios from "axios";

  const Contendor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media(min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2,1fr);
      column-gap: 2rem;
    }
  `;

  const Imagen = styled.img`
    max-width:100%;
    margin-top: 5rem;
  `;

  const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-align:left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top: 80px;
    text-transform: uppercase;
    &::after {
      content: '';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display:block;
    }
  `;



function App() {


  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  

  useEffect(()=>{

      const contizarCriptomoneda = async () => {

        if(moneda==='') return;
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const res = await axios.get(URL);

        // cargar spinner
        setCargando(true);

        setTimeout(() => {

          // desparecer spinner
          setCargando(false);
          setResultado(res.data.DISPLAY[criptomoneda][moneda]);
        }, 1000);
    
        
      }
      
      contizarCriptomoneda();
  }, [moneda,criptomoneda]);

  const componenteSpinner = (cargando) ? <Spinner/> : <Cotizacion resultado ={resultado} />

  return (
    
    <Contendor>
      <div>
        <Imagen src={imagen} alt='imagen cryptomonedas' />
      </div>
      <div>
        <Heading className='ml3'>Cotiza Cryptomonedas al instante</Heading>
        <Formulario setMoneda={setMoneda} setCriptomoneda={setCriptomoneda} />
        {componenteSpinner}
      </div>
    </Contendor>
  );
}

export default App;
