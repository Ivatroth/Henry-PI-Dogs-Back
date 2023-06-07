const { Router } = require('express');
// Importar todos los routers;
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);

router.use('/temperaments', temperamentsRouter)



module.exports = router;
