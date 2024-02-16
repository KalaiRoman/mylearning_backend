import bcrypt from 'bcrypt';
import auth_shema from '../../modules/auth_shema.js';
import { auth_Validation_Shema, auth_Validation_Shema_login } from '../../middleware/Validations/Validation_Shema.js';
import Cookies from 'js-cookie';
export const CreateAccount = async (req, res, next) => {

    // const { userName, email, password, role } = req.body;

    try {

        // new method
        // await bcrypt.hash(password, 10).then((hashedpassword) => {
        //     const validatenames = { userName: req.body.userName, email: req.body.email }
        //     const result = auth_Validation_Shema.validateAsync(validatenames);
        //     const user = auth_shema.create({
        //         userName, email, password: hashedpassword, role: "user"
        //     })
        //     user.save();
        //     return res.status(201).json({ message: "usercreated", user })
        // })
        const { error, value } = await auth_Validation_Shema.validate(req.body, { abortEarly: false });
        const errormessage = error?.details?.map((item, index) => item?.message);
        if (error) {
            return res.send(`${errormessage.toString()} is Required`);
        }
        if (value) {
            const existUser1 = await auth_shema.findOne({ email: value?.email });
            const existUser2 = await auth_shema.findOne({ userName: value?.userName });
            // const existUser = await auth_shema.findOne({ $or: [{ "email": value.email, "userName": value.userName }] });
            if (existUser1 || existUser2) res.status(404).json({ message: `${existUser1?.email ? "email" : "userName"} Already Exists` })
            const changeSalt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(value?.password, changeSalt);
            const response = await auth_shema.create({
                userName: value?.userName, email: value?.email, password: hashedpassword, role: "user"
            })
            response.save();
            return res.status(201).json({ message: "usercreated", response })
        }


    } catch (error) {
        console.log(error)
    }
}

export const loginAccount = async (req, res, next) => {

    // const { userName, email, password, role } = req.body;

    console.log(req?.body)

    try {

        // new method
        // await bcrypt.hash(password, 10).then((hashedpassword) => {
        //     const validatenames = { userName: req.body.userName, email: req.body.email }
        //     const result = auth_Validation_Shema.validateAsync(validatenames);
        //     const user = auth_shema.create({
        //         userName, email, password: hashedpassword, role: "user"
        //     })
        //     user.save();
        //     return res.status(201).json({ message: "usercreated", user })
        // })
        const { error, value } = await auth_Validation_Shema_login.validate(req.body, { abortEarly: false });
        const errormessage = error?.details?.map((item, index) => item?.message);
        if (error) {
            return res.send(`${errormessage.toString()} is Required`);
        }
        if (value) {
            const existUser1 = await auth_shema.findOne({
                $or: [{
                    "email": value.usernames,
                }, {
                    "userName": value.usernames

                }]
            });
            console.log(existUser1, 'existUser1')
            if (!existUser1) res.status(404).json({ message: `user Not Found ` })
            const hashedpassword = await bcrypt.compare(req.body.password, existUser1.password);
            if (!hashedpassword) res.status(404).json({ message: "Wrong Password" })
            const { password, ...otherDatas } = existUser1?._doc;
            // res.cookie("auth", JSON.stringify(existUser1?._id), {
            //     expires: new Date(),
            //     maxAge: 1000,
            //     secure: true,
            //     httpOnly: true,
            //     sameSite: 'lax'
            // })

            Cookies.set("auth", existUser1?._id, {
                expires: 1
            })
            return res.status(200).json({ message: "login successfully", user: otherDatas })
        }


    } catch (error) {
        console.log(error)
    }
}