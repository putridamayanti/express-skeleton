const {UserService} = require("../services/user.service");
const {ValidatePassword, GenerateToken} = require("../utils/jwt");
const moment = require("moment");
const {RoleService} = require("../services/role.service");
const Login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.GetUser({email})
    if (!user) {
        return res.status(404).send({data: "Account not found"});
    }

    const passwordValid = ValidatePassword(password, user.password)
    if (!passwordValid) {
        return res.status(400).send({data: 'Wrong password!'});
    }

    user.lastActive = moment();
    await UserService.UpdateUser({id: user.id}, user);

    const role = await RoleService.GetRole({id: user.roleId});

    const token = GenerateToken(email);

    return res.status(200).send({data: {
        token: token,
        id: user.data?.id,
        name: user.data?.name,
        email: user.data?.email,
        role: role?.data?.code,
    }});
};

exports.AuthController = {
    Login
}