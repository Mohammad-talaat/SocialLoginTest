

const linkedinLoginSuccess = async (req,res) => {
    try{
        if(!req.user){
            console.log(req)
            res.redirect('/callback/failure');
        }
        // res.send("Welcome " + req.user.name.givenName );
        const name = req.user.name.givenName;
        console.log(req.user)
                const family = req.user.name.familyName;
                const photo = req.user.photos[0].value;
                const email = req.user.emails[0].value;
                res.send(
                        `<center style="font-size:140%"> <p>User is Logged In </p>
                        <p>Name: ${name} ${family} </p>
                        <p> Linkedn Email: ${email} </p>
                        <img src="${photo}"/>
                        </center>
                        `)
    }catch(error){
        console.log(error)
    }
    
}



module.exports = { 
    linkedinLoginSuccess
}