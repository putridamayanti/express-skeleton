const express = require('express');
const {UserController} = require("../controllers/user.controller");
const {RoleController} = require("../controllers/role.controller");
const {SettingController} = require("../controllers/setting.controller");
const {PaymentMethodController} = require("../controllers/paymentmethod.controller");
const router = express.Router();

module.exports = app => {
    router.get('/payment-method', PaymentMethodController.GetPaymentMethodByQuery);
    router.get('/payment-method/:id', PaymentMethodController.GetPaymentMethodById)
    router.post('/payment-method', PaymentMethodController.CreatePaymentMethod);
    router.patch('/payment-method/:id', PaymentMethodController.UpdatePaymentMethod);
    router.delete('/payment-method/:id', PaymentMethodController.DeletePaymentMethod);
    
    router.get('/role', RoleController.GetRolesByQuery);
    router.get('/role/:id', RoleController.GetRoleById)
    router.post('/role', RoleController.CreateRole);
    router.patch('/role/:id', RoleController.UpdateRole);
    router.delete('/role/:id', RoleController.DeleteRole);

    router.get('/setting', SettingController.GetSettingsByQuery);
    router.get('/setting/:id', SettingController.GetSettingById)
    router.post('/setting', SettingController.CreateSetting);
    router.patch('/setting/:id', SettingController.UpdateSetting);
    router.delete('/setting/:id', SettingController.DeleteSetting);
    
    router.get('/user', UserController.GetUserByQuery);
    router.get('/user/:id', UserController.GetUserById)
    router.post('/user', UserController.CreateUser);
    router.patch('/user/:id', UserController.UpdateUser);
    router.delete('/user/:id', UserController.DeleteUser);

    app.use('/api', router);
};