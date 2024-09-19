const CREATED_CODE = 201;

const serverErrorMessage = 'На сервере произошла ошибка';
const authNeedMessage = 'Необходима авторизация';
const tokenNotFoundMessage = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';
const incorrectTokenMessage = 'При авторизации произошла ошибка. Переданный токе некорректен';
const authDataErrorMessage = 'Неправильные почта или пароль';
const authSuccessMessage = 'Успешная авторизация';
const dublicateEmailErrorMessage = 'Пользователь с таким email уже существует';
const registerErrorMessage = 'При регистрации пользователя произошла ошибка';
const incorrectRequestErrorMessage = 'Переданы некорректные данные';
const userNotFoundMessage = 'Запрашиваемый пользователь не найдет';
const listNotFoundErrorMessage = 'Запрашиваемый лист не найден';
const noteNotFoundErrorMessage = 'Запрашиваемая записка не найдена';
const noAccessErrorMessage = 'У вас нет прав на эту операцию';
const updateUserErrorMessage = 'При обновлении пользователя произошла ошибка';
const colorNotFoundErrorMessage = 'Запрашиваемый цвет не найден';

module.exports = {
  CREATED_CODE,
  serverErrorMessage,
  authDataErrorMessage,
  authSuccessMessage,
  authNeedMessage,
  tokenNotFoundMessage,
  incorrectRequestErrorMessage,
  incorrectTokenMessage,
  dublicateEmailErrorMessage,
  registerErrorMessage,
  userNotFoundMessage,
  noAccessErrorMessage,
  updateUserErrorMessage,
  listNotFoundErrorMessage,
  noteNotFoundErrorMessage,
  colorNotFoundErrorMessage, 
}