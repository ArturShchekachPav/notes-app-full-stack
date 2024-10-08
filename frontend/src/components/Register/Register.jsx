import {
    Link,
    useNavigate
} from 'react-router-dom';
import './Register.css';
import ApiError from '../ApiError/ApiError';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import api from "../utils/api";

function Register({
                      isLoading,
                      setIsLoading,
                      getProfileInfo
                  }) {
    const [apiError, setApiError] = useState({
        message: '',
        show: false
    });

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
            isDirty
        },
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    function handleRegister({
                                name,
                                email,
                                password
                            }) {
        setIsLoading(true);

        return api.register(name,
            email,
            password
        )
            .then(({email}) => api.authorize(email,
                password
            ))
            .then(() => getProfileInfo())
            .then(() => {
                navigate('/',
                    {replace: true}
                );

                reset();
            })
            .catch(err => {
                console.log(err);
                setApiError({
                    message: err.message,
                    show: true
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="register container">
            <header className="register__header">
                <Link
                    className="register__logo hover hover_type_link"
                    to="/"
                ></Link>
                <h1 className="register__greeting">Добро пожаловать!</h1>
            </header>
            <main className="register__main">
                <form
                    className="register__form"
                    name="register"
                    onSubmit={handleSubmit(handleRegister)}
                    noValidate
                >
                    <fieldset className="register__fieldset">
                        <label
                            className="register__label"
                        >
                            Имя
                            <input
                                type="text"
                                className={`register__input ${errors?.name && 'register__input_error'}`}
                                minLength="2"
                                maxLength="30"
                                placeholder="Имя"
                                pattern="^[а-яА-Яa-zA-Z\s\-]+$"
                                {...register('name',
                                    {
                                        required: 'Это обязательное поле',
                                        minLength: {
                                            value: 2,
                                            message: 'Значение должно быть длиннее 2-х символов'
                                        },
                                        maxLength: 30,
                                        pattern: {
                                            value: /^[а-яА-Яa-zA-Z\s\-]+$/,
                                            message: 'Введите корректное имя'
                                        }
                                    }
                                )}
                                id="name-register"
                                disabled={isLoading}
                            />
                            {errors?.name && <span className="register__error">{errors?.name?.message}</span>}
                        </label>
                        <label
                            className="register__label"
                        >
                            E-mail
                            <input
                                type="email"
                                className={`register__input ${errors?.email && 'register__input_error'}`}
                                placeholder="Email"
                                pattern="\S+@\S+\.\S+"
                                {...register('email',
                                    {
                                        required: 'Это обязательное поле',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Введите корректный email'
                                        }
                                    }
                                )}
                                id="email-register"
                                disabled={isLoading}
                            />
                            {errors?.email && <span className="register__error">{errors?.email?.message}</span>}
                        </label>
                        <label
                            className="register__label"
                        >
                            Пароль
                            <input
                                type="password"
                                className={`register__input ${errors?.password && 'register__input_error'}`}
                                placeholder="Пароль"
                                {...register('password',
                                    {required: 'Это обязательное поле'}
                                )}
                                id="password-register"
                                disabled={isLoading}
                            />
                            {errors?.password && <span className="register__error">{errors?.password?.message}</span>}
                        </label>
                    </fieldset>
                    <div className="register__button-container">
                        <ApiError
                            message={apiError.message}
                            show={apiError.show}
                        />
                        <button
                            type="submit"
                            className="register__button hover hover_type_button"
                            disabled={!isDirty || !isValid || isLoading}
                        >{isLoading ?
                            'Регистрация...' :
                            'Зарегистрироваться'}
                        </button>
                    </div>
                </form>
                <p className="register__text">Уже зарегистрированы? <Link
                    to="/sing-in"
                    className="register__link hover hover_type_link"
                >Войти</Link></p>
            </main>
        </div>
    );
}

export default Register;