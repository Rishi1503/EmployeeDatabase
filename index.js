//start with
// $ cd vue-3-crud
//  $ npm run serve

const fastify = require('fastify')({
    logger: true,
    ignoreTrailingSlash: true
});

fastify.register(require('@fastify/cors'), { 
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  })

const db = require('./queries');
const PORT = process.env.PORT || 8080;

fastify.get('/', (req, res)=>{
    res.send({hello: 'world'})
});

fastify.get('/employees', db.getEmployees);
fastify.get('/employees/:id', db.getEmployeeById);
fastify.post('/employees', db.addEmployee);

const start = async () => {
    try{
        await fastify.listen(PORT, '0.0.0.0');
        fastify.log.info('server listening on ${fastify.server.address().port}');
    }
    catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
};
start();