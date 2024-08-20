import './Profile.css';
import {useForm} from 'react-hook-form';

export function Profile({
                            children,
                            isEditing,
                            onSubmit,
                            setIsEditing,
                            logOut,
                            isLoading
                        }) {
    const {
        register,
        handleSubmit,
        formState: {
            isValid,
            isDirty
        }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: 'Артур',
            email: 'ashhekach@gmail.com'
        }
    });

    return (
        <div className="profile">
            {children}
            <main className="profile__main">
                <h1 className="profile__greeting">Привет, Артур!</h1>
                <form
                    className="profile__data-container"
                    name="profile-edit"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <div className="profile__data-field">
                        <label className="profile__data-label">Имя</label>
                        <input
                            className="profile__data-input"
                            type="text"
                            maxLength="30"
                            minLength="2"
                            placeholder="Имя"
                            pattern="^[а-яА-Яa-zA-Z\s\-]+$"
                            {...register('name',
                                {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 30,
                                    pattern: /^[а-яА-Яa-zA-Z\s\-]+$/
                                }
                            )}
                            id="name-profile"
                            disabled={!isEditing || isLoading}
                        />
                    </div>
                    <div className="profile__data-divider"></div>
                    <div className="profile__data-field">
                        <label className="profile__data-label">E-mail</label>
                        <input
                            className="profile__data-input"
                            type="email"
                            placeholder="Email"
                            pattern="\S+@\S+\.\S+"
                            {...register('email',
                                {
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/
                                }
                            )}
                            id="email-profile"
                            disabled={!isEditing || isLoading}
                        />
                    </div>
                    <div className="profile__buttons">
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className={`profile__button ${!isEditing && 'profile__button_active'} profile__button_edit hover_type_button hover`}
                        >Редактировать
                        </button>
                        <button
                            type="button"
                            onClick={() => logOut()}
                            className={`profile__button ${!isEditing && 'profile__button_active'} profile__button_exit hover_type_button hover`}
                        >Выйти из аккаунта
                        </button>
                        <button
                            type="submit"
                            className={`profile__button ${isEditing && 'profile__button_active'} profile__button_save hover_type_button hover`}
                            disabled={!isValid || isLoading || !isDirty}
                        >{isLoading ?
                            'Сохранение...' :
                            'Сохранить'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Profile;