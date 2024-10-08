import './ApiError.css';

export default function ApiError({
                                     message,
                                     show,
                                     success
                                 }) {
    return (
        <p className={`api-error ${show && 'api-error_open'} ${success && 'api-error_success'}`}>{message}</p>
    );
}