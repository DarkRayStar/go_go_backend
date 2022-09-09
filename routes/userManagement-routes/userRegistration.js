const router = require("express").Router();
const { User, validate } = require("../../models/userManagement-models/user");
const bcrypt = require("bcrypt");

// insert data
router.post("/registration", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User Registration successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


// get all users details
router.route('/get-all').get((req, res) => {
	User.find()
		.then(userDetails => res.json(userDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-user-by-email/:email').get((req, res) => {
    User.find({ email: req.params.email })
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get user details by id
router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(userDetails => res.json(userDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

//delete Account
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Account deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
