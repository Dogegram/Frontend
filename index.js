const path = require('path');
const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
const metas = require('metas');
const app = express();
const paths = ['login','signup','passwordreset','settings','activity','','explore','new','confirm'];

const indexPath  = path.resolve(__dirname, 'build', 'index.html');

var indexfile;
const load = () => {
    console.log('load')
    fs.readFile(indexPath, 'utf8', (err, data)=>{
        indexfile = data
       // console.log(data)
    });
}

load()

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, 'build'),
    { maxAge: '30d' },
));

app.get('/', async (req, res, next) => {
    res.send(indexfile)
})

app.get('/:userId', async (req, res, next) => {
    console.log('start')
    const userId = req.params.userId;
    if(!paths.includes(userId)){
        console.log('here?')
        let htmlData = indexfile;
        const requsermeta = await fetch(`https://privateapi.dogegram.xyz/api/user/internal/meta/${userId}`);
        const usermeta = await requsermeta.json();
        console.log(usermeta)
        const meta = metas({
            title: `${usermeta.name}'s profile'`,
            image: usermeta.image,
            description: usermeta.bio,
            url: `https://app.dogegram.xyz/${userId}`
        })
        console.log(meta)

        let metahtml = htmlData.replace('<meta name="description" content="The cool new social media platform!"/>', meta)
         metahtml = metahtml.replace(/(\r\n|\n|\r)/gm, "")

        console.log(metahtml)

        return res.send(metahtml);
} else {
 return res.send(indexfile)
}
});

app.listen(process.env.PORT || 3000, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log(`listening on ${process.env.PORT || 3000}...`);
});