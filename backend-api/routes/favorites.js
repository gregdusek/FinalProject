const express = require('express');
const passport = require('passport');
const validateAddMovie = require('../utilities/validators').addMovie;

// User model
const User = require('../models/User');

const router = express.Router();

/**
 * @route   GET api/favorites
 * @desc    Gets the user's favorite movies
 * @access  Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(user => res.json(user.favorite))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   PATCH api/favorites/add/:id
 * @desc    Adds to the user's favorite list
 * @access  Private
 */
router.patch('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	// TODO: add an appropriate validator
	// const { errors, isValid } = validateAddMovie(req.body);
	// validate request params
	// if (!isValid) return res.status(400).json(errors);

	User.updateOne(
		// Add movie to top of favorite array, only if it is unique
		{ $and: [{ _id: req.user._id }, { favorite: { $ne: req.body } }] },
		{ $push: { favorite: { $each: [req.body], $position: 0 } } }
	)
		.then(() => res.json(req.body))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   DELETE api/favorites/:id
 * @desc    Creates habit
 * @access  Private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(user => {
			const id = parseInt(req.params.id, 10);
			let movieFound = false;
			user.favorite.forEach(movie => {
				if (movie.id === id) movieFound = true;
			});
			if (movieFound !== true)
				return res.status(404).json({ message: 'That movie id was not found in the list' });
			// eslint-disable-next-line no-param-reassign
			user.favorite = user.favorite.filter(movie => movie.id !== id);
			return user.save().then(() => res.json(id));
		})
		.catch(err => res.status(400).json(err));
});

// export router for use by server
module.exports = router;