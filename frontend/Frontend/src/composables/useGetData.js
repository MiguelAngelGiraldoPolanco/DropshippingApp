import axios from 'axios'; 
import { ref } from 'vue'; 
 
export const useGetData=()=>{ 
    const datos=ref(null); //Null xq no sabemos lo que vamos a recibir. 
 
    const getData = async (url) => { 
        try {  //esperamos a obtener los resultados del API 
            const  resultado = await axios.get(url); 
            datos.value = resultado.data; //Axios siempre devuelve .data 
            }  
        catch (error) {  //si hay algun error lo muestro por consola 
            console.log(error); 
        } 
    }; 
    return { 
        getData,    //Retornamos nuestra funcion 
        datos       //Retornamos el resultado obtenido     
    } 
}; 
