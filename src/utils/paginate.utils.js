export const paginate = async (model, query = {}, options = {}) => {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;

    const select = options.select || "";
    const sort = options.sort || { createdAt: -1 };
    const populate = options.populate || null;

    const skip = (page - 1) * limit;

    let dataQuery = model
        .find(query)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    if (populate) {
        if (Array.isArray(populate)) {
            populate.forEach(p => {
                dataQuery = dataQuery.populate(p);
            });
        } else {
            dataQuery = dataQuery.populate(populate);
        }
    }

    const [results, total] = await Promise.all([
        dataQuery,
        model.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        count: total,
        page,
        page_size: limit,
        total_pages: totalPages,
        next: page < totalPages ? page + 1 : null,
        previous: page > 1 ? page - 1 : null,
        results
    };
};
