const {PaymentMethodModel} = require("../models/paymentmethod.model");

const GetPaymentMethods = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await PaymentMethodModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const counts = await PaymentMethodModel.countDocuments(query);

    return {
        error: null,
        data: {
            data: result,
            pagination: {
                perPage: limit, current: page, counts, pages: Math.ceil(counts/limit)
            },
            query
        }
    }
};

const GetPaymentMethod = async (filter, projection = null, options = null) => {
    const result = await PaymentMethodModel.findOne(filter, projection, options).lean();
    if (result === null) {
        return { error: 'Data Not Found', data: null}
    }

    return {data: result} ;
};

const CreatePaymentMethod = async (params) => {
    const result = await PaymentMethodModel.create(params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const UpdatePaymentMethod = async (filter, params) => {
    const result = await PaymentMethodModel.findOneAndUpdate(filter,params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const DeletePaymentMethod = async (filter) => {
    const result = await PaymentMethodModel.deleteMany(filter, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

exports.PaymentMethodService = {
    GetPaymentMethods,
    GetPaymentMethod,
    CreatePaymentMethod,
    UpdatePaymentMethod,
    DeletePaymentMethod
};