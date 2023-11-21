const cookieToken = async(user, res) => {
    // generate a jwt token
    const token = await user.getJwtToken()

    // cookie options
    const options = {
        expires: new Date(
        Date.now() + 24 * 60 * 60 // expries in 24hrs
        ),
        httpOnly: true
    }
    user.password = undefined;
    console.log("token: ", token);
    res.status(200).cookie('token', token, options).json({ success: true, token, user});
}

module.exports = cookieToken;