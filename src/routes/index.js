const {Router} = require('express');
const router =  Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//toma los registro del json en formato string
const json_video = fs.readFileSync('src/videos.json', 'utf-8');

//cargo los datos que tiene el json y lo convierte en formato JSON
let arrVideos = JSON.parse(json_video);
// let arrVideos=[];

router.get('/', (req, res) =>{
    res.render('index.ejs', {
        arrVideos
    })
});

router.get('/entrada', (req, res)=>{
    res.render('entrada');
});

router.post('/entrada', (req,res) =>{
    // console.log(req.body);
    const {title, autor} = req.body;
    if (!title || !autor) {
        res.status(400).send('Debes ingresar los datos de Video y Autor');
        return;
    }
    let nuevoVideo={
        id: uuidv4(),
        title,
        autor
    };
    
    arrVideos.push(nuevoVideo);
    //Acá convertimos el objeto en String con JSON.strinify toma un JSON
    const jsonVideosString = JSON.stringify(arrVideos);

    //Le la ruta relativa
    fs.writeFileSync('src/videos.json', jsonVideosString, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:id', (req,res) =>{
    arrVideos= arrVideos.filter(video => video.id != req.params.id)
    const jsonVideosString = JSON.stringify(arrVideos);
    fs.writeFileSync('src/videos.json', jsonVideosString, 'utf-8');
    res.redirect('/');
});
module.exports = router;   