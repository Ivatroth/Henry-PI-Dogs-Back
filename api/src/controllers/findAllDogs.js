const { Dog, Temperament } = require('../db')
const axios = require("axios")
const {API_KEY, URL_BASE} = process.env;
const clearInfoApi = require('./clearInfoApi')
const restaurarDogs = require("./restaurarDogs");

//! Este controller busca y retorna todos los perros(razas), tanto de la Api
//! como de la DB
const findAllDogs = async () => {
  // busco de la API
  const dogsAllApi = (await axios.get(`${URL_BASE}?key=${API_KEY}`)).data;

  if(!dogsAllApi) throw new Error("Hubo un problema con la Api, no me mando los datos")

  // busco de a DB e incluyo los temperamentos
  let PerrosDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

  
    //* Como los temperamentos guardados en DB estan en array de objetos, 
    //* debo cambiarls por un string para enviarloa al cliente
  const dogsDB = restaurarDogs(PerrosDB); 
    // filtro para eliminar algunos atributos
  const dogsApi = clearInfoApi(dogsAllApi);
    
  // retorno ambos

  return [...dogsDB,...dogsApi];
}

  
  module.exports = findAllDogs;