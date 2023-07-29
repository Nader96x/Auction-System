module.exports.getOne = (Model) =>
    async ({ params, opts }, res, next) => {
        const { id } = params;
        console.log(opts);
        const query = Model.findOne({ _id: id, ...opts });
        const document = await query;
        if (!document)
            return next(new ApiError(`no ${Model.modelName} for this id ${id}`, 404));

        res.status(200).json({ status: "success", data: document });
    };
