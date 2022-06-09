//AUTH TABLE

exports.sign = async (req, res) => {

   token = req.body.token

    res.json( {token} );

}


