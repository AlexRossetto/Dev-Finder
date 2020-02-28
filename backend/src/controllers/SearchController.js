const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {

        const { latitude, longitude, techs} = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            }
        });

        return res.json({ devs });
    },

    async update(req,res) {

        const{ github_username } = req.params;

        const newDev = {
            github_username: req.body.newgithub_username,
            techs: parseStringAsArray(req.body.techs),
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }

        const dev = await Dev.findOne({ github_username });

        if (!dev) {
            return res.json({ status: 'usuario nao encontrado' })
        } else {
                const devId = dev._id;

                await Dev.update({_id: devId,}, newDev, function(err, raw) {
                    if (err) {
                        res.send(err);
                    }
                    return res.json(raw)
                });
             }
        },

        async destroy(req,res) {
            const{ github_username } = req.params;

            const dev = await Dev.findOne({ github_username });

            if (!dev) {
                return res.json({ status: 'usuario nao encontrado' })
            } else {
                    const devId = dev._id;
    
                    await Dev.deleteOne({_id: devId}, function(err, raw) {
                        if (err) {
                            res.send(err);
                        }
                        return res.json({ status : "usuario deletado" })
                    });
                 }

        }
}