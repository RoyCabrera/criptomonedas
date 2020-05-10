import React,{useEffect,useState} from 'react';
import styled from 'styled-components';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';

import axios from 'axios';

const Boton = styled.input`
        margin-top: 20px;
        font-weight: bold;
        font-size: 20px;
        padding: 10px;
        background-color: #66a2fe;
        border: none;
        width: 100%;
        border-radius: 10px;
        color: #FFF;
        transition: background-color .3s ease;
        &:hover {
            background-color: #326AC0;
            cursor:pointer;
        }
    `

const Formulario = ({setMoneda,setCriptomoneda}) => {

    const [error, setError] = useState(false);
    const [listacripto,setListaCripto] = useState([]);
    const MONEDAS = [
        
        {codigo:'PEN',nombre:'Sol Peruano'},
        {codigo:'USD',nombre:'Dolar de Estados Unidos'},
        {codigo:'MXN',nombre:'Peso Mexicano'},
        {codigo:'EUR',nombre:'Euro'},
        {codigo:'GBP',nombre:'Libra Esterlina'}

    ]


    // USAR CUSTOMS HOOKS PARA LOS SELECTS

    const [moneda,SelectMonedas] = useMoneda('Elige tu moneda','',MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda','',listacripto)

    // useEffect para cargar el api

    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const res = await axios.get(url);
            setListaCripto(res.data.Data);
            
        }
        consultarAPI();
    },[])

    // FUNCIONES

    const cotizarMoneda = (e) => {
        e.preventDefault();
        if(moneda === '' || criptomoneda === ''){
            setError(true);
            return;
        }

        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return(

        <form onSubmit={cotizarMoneda} >
            {
                error ? <Error mensaje='Todos los campos son obligatorios' /> : null
            }
            <SelectMonedas/>
            <SelectCripto/>
            <Boton type='submit' value='Calcular' />
        </form>

    );
}

export default Formulario;