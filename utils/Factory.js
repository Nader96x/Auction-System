const {success} = require("./responses");

module.exports.getOne = (Model) =>
    async ({params : {id}}, res, next) => {
        try {
            const result = await Model.findByPk(id);
            if (!result) throw new Error(`${Model.name} Not Found`)
            res.status(200).json(success(result));
        } catch (err) {
            next(err);
        }
    };

module.exports.getAll = (Model) =>
    async (req, res, next) => {
        try {
            const result = await Model.findAll();
            res.status(200).json(success(result));
        } catch (err) {
            next(err);
        }
}
module.exports.createOne = (Model) =>
    async (req, res, next) => {
        try {
            const result = await Model.create(req.body);
            res.status(201).json(success(result));
        } catch (err) {
            next(err);
        }
    };


module.exports.updateOne = (Model) =>
    async ({params : {id}, body}, res, next) => {
        try {
            const result = await Model.update(body, {where : {id}});
            res.status(200).json(success(result));
        } catch (err) {
            next(err);
        }
    }

module.exports.deleteOne = (Model) =>
    async ({params : {id}}, res, next) => {
        try {
            const result = await Model.destroy({where : {id}});
            res.status(200).json(success(result));
        } catch (err) {
            next(err);
        }
    }

module.exports.deleteOneHard = (Model) =>
    async ({params : {id}}, res, next) => {
        try {
            const result = await Model.destroy({where : {id}, force:true});
            res.status(200).json(success(result));
        } catch (err) {
            next(err);
        }
    }

module.exports.restoreOne = (Model)=>
    async ({params : {id}}, res, next) => {
        try {
            const result = await Model.restore({where : {id}});
            res.status(200).json(success(result));
        } catch (err) {
            next(err);
        }
    }