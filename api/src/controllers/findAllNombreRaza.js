const { default: axios } = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY, URL_BASE } = process.env;
const clearInfoApi = require('./clearInfoApi');
const { Op } = require('sequelize')
const restaurarDogs = require("./restaurarDogs");

//! Este controller busca y filtra las razas de perros segun una coincidencia(pasado por query) en el name
const findAllRazas = async (query) => {

  //busco la info de la Api, la trigo toda porque si uso la endpoit de seach no me trae la imagen
  let dogsAllApi = (await axios.get(`${URL_BASE}?key=${API_KEY}`)).data;
  //la filtro por el query
  let regExp = new RegExp(`${query}`, 'i');
  dogsAllApi = dogsAllApi.filter((dog) => regExp.test(dog.name) === true);

  //limpia la info de la api para sacar algunos argumentos
  const dogsApi = clearInfoApi(dogsAllApi);

  //busco la info de la DB con el filtro 
  const PerrosDB = await Dog.findAll({
      where: {
          name: {
            [Op.iLike]: `%${query}%`,
          }
      },
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

const dogs = [...dogsDB,...dogsApi];
if (dogs.length === 0) throw Error("No existe raza de perros que coincida con lo buscado");
    
return dogs;

};

module.exports = findAllRazas;