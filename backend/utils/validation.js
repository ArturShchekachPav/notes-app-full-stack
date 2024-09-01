const { Joi, celebrate } = require('celebrate');

const createNoteValidation = celebrate({
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
        list: Joi.string().required(),
        color: Joi.string().required(),
    }),
  });

  const createListValidation = celebrate({
    body: Joi.object().keys({
        title: Joi.string().required(),
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
        title: Joi.string().required(),
        content: Joi.string().required(),
        list: Joi.string().required(),
        color: Joi.string().required(),
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

  module.exports = {
    createNoteValidation,
    createListValidation,
    deleteListByIdValidation,
    deleteNoteByIdValidation,
    updateUserDataValidation,
    createUserValidation,
    loginValidation,
    updateNoteDataValidation,
  }