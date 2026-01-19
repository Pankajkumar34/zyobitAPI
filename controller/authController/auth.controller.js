
const models = require('../../model/index');
const { hashGenerator, generateToken, comparePassword } = require('../../helper/tokenGen');
module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            console.log(req.body)
            const isExist = await models.userModel.findOne({ email });
            if (isExist) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = hashGenerator(password);
            if (!hashedPassword) {
                return res.status(500).json({ message: "Error in password hashing" });
            }
            const token = generateToken({ email });
            if (!token) {
                return res.status(500).json({ message: "Error in token generation" });
            }
            const authToken = token;

            const newuser = await models.userModel.create({
                name,
                email,
                password: hashedPassword,
                token: authToken
            })

            res.cookie("accessToken", authToken, {
                domain: 'http://localhost:400',
                secure: false,
            });
            return res.status(201).json({ message: "User registered successfully", user: newuser });


        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const isExist = await models.userModel.findOne({ email });
            if (!isExist) {
                return res.status(400).json({ message: "User does not exist" });
            }

            const isValidPassword = await comparePassword(password, isExist.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = generateToken({ email });
            if (!token) {
                return res.status(500).json({ message: "Error in token generation" });
            }
            const authToken = token;

            isExist.token = authToken;
            await isExist.save();
            res.cookie("accessToken", authToken, {
                domain: 'http://localhost:400',
                secure: false,
            });
            return res.status(200).json({ message: "Login successful", token: authToken });

        } catch (error) {
            return res.status(500).json({ error: error.message });

        }
    }
}