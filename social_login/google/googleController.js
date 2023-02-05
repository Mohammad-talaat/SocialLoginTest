

const googleLoginSuccess = async (req,res) => {
    try{
        if(!req.user){
            res.redirect('/callback/failure');
        }
        console.log(req.user)
        const user = req.user._json

        res.send(`
        Welcome ${user.name} <br>
        with email ${user.email} <br>
        with picture <br> <img src='${user.picture}'></img> <br>
        with langauge ${user.locale}<br>
        isEmailVerified --> ${user.email_verified}`);

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    googleLoginSuccess
}