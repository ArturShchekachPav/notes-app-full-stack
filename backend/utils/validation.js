const { Joi, celebrate } = require('celebrate');

const createListValidation = celebrate({
  body: Joi.object().keys({
    list: Joi.string().required(),
  }),
});

const deleteNoteByIdValidation = celebrate({
  params: Joi.object().keys({
    noteId: Joi.string().required(),
  }),
});

const deleteListByIdValidation = celebrate({
  params: Joi.object().keys({
    listId: Joi.string().required(),
  }),
});

const updateUserDataValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const updateNoteDataValidation = celebrate({
  body: Joi.object().keys({
    note: Joi.string().required(),
    content: Joi.string().required(),
    list_id: Joi.required(),
    color_id: Joi.required(),
  }),
  params: Joi.object().keys({
    noteId: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const deleteColorValidation = celebrate({
  params: Joi.object().keys({
    colorId: Joi.string().required(),
  }),
});

const updateColorValidation = celebrate({
  params: Joi.object().keys({
    colorId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    color: Joi.string().required(),
    hex: Joi.string().required(),
  }),
});

const createColorValidation = celebrate({
  body: Joi.object().keys({
    color: Joi.string().required(),
    hex: Joi.string().required(),
  }),
});

const updateListValidation = celebrate({
  body: Joi.object().keys({
    list: Joi.string().required(),
  }),
  params: Joi.object().keys({
    listId: Joi.string().required(),
  }),
});

module.exports = {
  createListValidation,
  deleteListByIdValidation,
  deleteNoteByIdValidation,
  updateUserDataValidation,
  createUserValidation,
  loginValidation,
  updateNoteDataValidation,
  deleteColorValidation,
  updateColorValidation,
  createColorValidation,
  updateListValidation,
};
