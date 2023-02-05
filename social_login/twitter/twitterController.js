const twitterLoginSuccess = async (req,res)=>{
    try{
        if(!req.user){
            res.redirect('/callback/failure');
        }
        console.log(req.user)
        const user = req.user._json

        res.send(`
        <br>${user.entities.description[0]}<br>
        Welcome ${user.name} <br>
        with email ${user.email} <br>
        with picture <br> <img src='${user.profile_image_url_https}'></img> <br>
        with langauge ${user.locale}<br>
        isPhoneNeedsVerification --> ${user.needs_phone_verification}`);

    }catch(error){
        console.log(error)
    }
}

module.exports = {twitterLoginSuccess}