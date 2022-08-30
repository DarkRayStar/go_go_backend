const router = require("express").Router();
const { User } = require("../../models/userManagement-models/admin.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error){
			return res.status(400).send({ message: error.details[0].message });
			// return res.json('invalid password! (Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters)');
		}
			

		const user = await User.findOne({ email: req.body.email });
		if (!user){
			// return res.status(401).send({ message: "Invalid Email or Password" });
			return res.json('Invalid Email or Password!').status(401);
		}
			
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword){
			// return res.status(401).send({ message: "Invalid Email or Password" });
			return res.json("Invalid Email or Password").status(401);
		}

		if (validPassword && user) {
			const token = user.generateAuthToken();
			res.json({
			  message: "logged in successfully",
			  token,
			  user,
			  status:200
			});
		  }

		// const token = user.generateAuthToken();
		// res.status(200).send({ data: token, message: "logged in successfully" });

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
