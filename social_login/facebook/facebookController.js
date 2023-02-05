


const facebookLoginSuccess = async (req,res) => {
    try{
        if(!req.user){
            res.redirect('/callback/failure');
        }
        
        console.log('------------Req.user---------------')
        console.log(req.user._json)
        const user = req.user._json
        res.send(` Welcome ${user.name}<br> 
        with email ${user.email}<br> 
        with photo <br> <img src='${user.picture.data.url}'></img><br>
        with gender ${user.gender}<br>
        born in ${user.hometown.name}<br>
        born at ${user.birthday}` );

    }catch(error){
        console.log(error)
    }
}


module.exports = {
    facebookLoginSuccess
}