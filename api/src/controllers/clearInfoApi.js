//! Funcion para Limpiar el objeto que viene de la API
//! para que coincida con la DB
//! me sirve tanto para busqueda total x ponbre y por id

const clearInfoApi = (dogs) => {  
    const Dogss = dogs.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            height:dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            created: false,
        }
    })
    return Dogss;
}
module.exports = clearInfoApi;