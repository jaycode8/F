export const paginate = async (model, query = {}, options = {}) => {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const select = options.select || "";

    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
        model.find(query).select(select).skip(skip).limit(limit),
        model.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        count: total,
        page: page,
        page_size: limit,
        total_pages: totalPages,
        next: page < totalPages ? page + 1 : null,
        previous: page > 1 ? page - 1 : null,
        results
    };
};
