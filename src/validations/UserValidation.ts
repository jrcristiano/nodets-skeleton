const {check} = require('express-validator');

const fName = check('name').notEmpty()
    .withMessage('The field name is required.')
    .isString()
    .withMessage('The field name must be a string.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('The field name must have between 3 and 255 characters.')
    .trim();

const lastname = check('lastname').notEmpty()
    .withMessage('The field lastname is required.')
    .isString()
    .withMessage('The field lastname must be a string.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('The field lastname must have between 3 and 255 characters.')
    .trim();

const email = check('email').notEmpty()
    .withMessage('The field email is required.')
    .isEmail()
    .withMessage('The field email must be a valid e-mail address.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('The field email must have between 3 and 255 characters.')
    .trim();

const password = check('password').notEmpty()
    .withMessage('The field password is required.')
    .isString()
    .withMessage('The field password must be a string.')
    .isLength({
      min: 8,
      max: 255,
    })
    .withMessage('The field password must have between 8 and 255 characters.')
  .trim();
    
const login = [
  email,
  password,
];

const store = [
  fName,
  lastname,
  email,
  password,
];

const update = [
  fName,
  lastname,
  email,
];

export default {login, store, update};