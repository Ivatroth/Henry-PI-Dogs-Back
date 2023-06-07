const { Router } = require("express");

const findAllDogs = require("../controllers/findAllDogs");
const findDogById = require("../controllers/findDogById");
const findAllNombreRaza = require("../controllers/findAllNombreRaza");
const createDog = require("../controllers/createDog")


const dogsRouter = Router();

// 📍 GET | /dogs
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

dogsRouter.get("/", async (req, res) => {
  //res.status(200).send("Estos son todos las razas de perros");
    try {
        const dogs = await findAllDogs();
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });
    
    // 📍 GET | /dogs/name?name="..."
    // Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query.
    // (No es necesario que sea una coincidencia exacta).
    // Debe poder buscarlo independientemente de mayúsculas o minúsculas.
    // Si no existe la raza, debe mostrar un mensaje adecuado.
    // Debe buscar tanto los de la API como los de la base de datos.
    
    dogsRouter.get("/name", async (req, res) => {
      try {
        const { name } = req.query;
        const raza = name ? await findAllNombreRaza(name)
                          : await findAllDogs();

        res.status(200).json(raza);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // 📍 GET | /dogs/:idRaza
// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro (ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

dogsRouter.get("/:idRaza", async (req, res) => {
    try {
      const { idRaza } = req.params;
      const raza = await findDogById(idRaza);
      res.status(200).json(raza);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// 📍 POST | /dogs
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

dogsRouter.post("/", async (req, res) => {
  try {
    const { name, image, height, weight, life_span, temperament } = req.body;
    const newDog = await createDog({ name, image, height, weight, life_span, temperament });
    res.status(200).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = dogsRouter;