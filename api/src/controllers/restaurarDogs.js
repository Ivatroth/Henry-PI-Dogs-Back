//! Funcion para Limpiar el objeto que tomo del la BD
//! para que puedan ser enviados juntos con lo de la api con el mismo formato de temperamentos

const restaurarDogs = (PerrosDB) =>{
      
  const dogsDB = PerrosDB.map(dog => {
      let temp ='';
          dog.Temperaments.forEach(t => {
            temp = temp ?  temp +", "+ t.name : t.name ;
          });

          return ({
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperament: temp,
            created: dog.created,
          })
    });

  return dogsDB 
}

module.exports = restaurarDogs;