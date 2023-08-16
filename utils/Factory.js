const {success} = require("./responses");
const {Op} = require("sequelize");

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
            const { page = 1, limit = 10, sortBy = 'id',search='', filterBy = {},fields='' } = req.query;
            let {sortOrder = 'asc'}=req.query;

            if(!["ASC","DESC"].includes(sortOrder.toUpperCase())) sortOrder = "ASC";
            const selectedFields = fields ? fields.split(',') : undefined;
            const order = [[sortBy, sortOrder.toUpperCase()]];
            const offset = (page - 1) * limit;

            const searchConditions = search
                ? {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${search}%` } },
                        { email: { [Op.iLike]: `%${search}%` } },
                    ],
                }
                : {};
            //filterBy={"name":"Nader"}
            const whereConditions = { ...filterBy, ...searchConditions };

            const result = await Model.findAndCountAll({
                where: whereConditions,
                limit: parseInt(limit),
                attributes: selectedFields?.length > 0 ? selectedFields : undefined,
                offset: offset,
                order: order,
            });
            const totalPages = Math.ceil(result.count / limit);
            res.status(200).json(success(
                result.rows,
                {
                    pagination: {
                        currentPage: parseInt(page),
                        totalPages: totalPages,
                        totalItems: result.count,
                        },
                    count: result.count,
                }
            ));
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

module.exports.deleteOnePermanently = (Model) =>
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