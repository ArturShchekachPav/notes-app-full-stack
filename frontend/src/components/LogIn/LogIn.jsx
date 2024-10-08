import {
    Link,
    useNavigate
} from 'react-router-dom';
import ApiError from '../ApiError/ApiError';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import api from "../utils/api";

function Login({
                   getProfileInfo,
                   isLoading,
                   setIsLoading
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
            email: '',
            password: ''
        }
    });

    function handleAuthorize({
                                 email,
                                 password
                             }) {
        setIsLoading(true);

        return api.authorize(email,
            password
        )
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
                <h1 className="register__greeting">Рады видеть!</h1>
            </header>
            <main className="register__main">
                <form
                    className="register__form"
                    name="login"
                    onSubmit={handleSubmit(handleAuthorize)}
                    noValidate
                >
                    <fieldset className="register__fieldset">
                        <label
                            className="register__label"
                        >
                            E-mail
                            <input
                                type="email"
                                className={`register__input ${errors?.email && 'register__input_error'}`}
                                placeholder="Email"
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
                            'Авторизация...' :
                            'Войти'}
                        </button>
                    </div>
                </form>
                <p className="register__text">Еще не зарегистрированы? <Link
                    to="/sing-up"
                    className="register__link hover hover_type_link"
                >Регистрация</Link></p>
            </main>
        </div>
    );
}

export default Login;