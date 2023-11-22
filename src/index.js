const program = require('./app');

//la función va usar interna código asíncrono
async function main (){
    await program.listen(program.get('port'));
    console.log('Servicio en el port', program.get('port'));
}

main();
