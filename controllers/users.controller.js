
const User = require('../models/users')


exports.getAll = async (req, res) => {

 
    const finded = await User.findAll({
        raw:true,
        where: {   }
    });

    res.status(200).json(finded)
};



