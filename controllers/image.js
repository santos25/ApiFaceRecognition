const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f8e2ae65a8ab46a58b2c2c01a3fe9ad6'
  });


const handleImage = (req, res, dbPg) => {
    const { userid } = req.body;
    dbPg('users').where({
        user_id: userid,
    })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(404).json("No User Found"));
}

const detectFaceImage = (req, res) => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.inputImage).then(
        response => {
            console.log(response);
            res.json(response);
        })
        .catch(error => res.status(404).json(error));
}


module.exports = {
    handleImage: handleImage,
    detectFaceImage: detectFaceImage
}