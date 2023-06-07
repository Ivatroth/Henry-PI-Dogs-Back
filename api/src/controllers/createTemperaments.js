const { Temperament } = require("../db");

//! Este controller Carga la tabla Temperaments de la DB 
//! es llamada de findAllTemperament
const createTemp = async (element) => {
    const newTemp= await Temperament.create({name: element});    
    //return newTemp;
  };
  
  module.exports = createTemp;