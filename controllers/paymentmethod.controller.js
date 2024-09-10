const {GenerateQuery} = require("../utils/helper");
const {PaymentMethodService} = require("../services/PaymentMethod.service");
const {v4: uuid} = require("uuid");

const GetPaymentMethodByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.email = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };

    const result = await PaymentMethodService.GetPaymentMethods({limit, page, skip, sort, query});

    return res.status(200).send({data: result.data});
};

const CreatePaymentMethod = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);

    const result = await PaymentMethodService.CreatePaymentMethod(params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: 'Success'});
};

const GetPaymentMethodById = async (req, res) => {
    const {id} = req.params;

    const result = await PaymentMethodService.GetPaymentMethod({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdatePaymentMethod = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    const result = await PaymentMethodService.UpdatePaymentMethod({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeletePaymentMethod = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await PaymentMethodService.DeletePaymentMethod({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.PaymentMethodController = {
    GetPaymentMethodByQuery,
    CreatePaymentMethod,
    GetPaymentMethodById,
    UpdatePaymentMethod,
    DeletePaymentMethod
};