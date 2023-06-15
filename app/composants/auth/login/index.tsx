import {
    Form,
    Link,
    useActionData,
    useSearchParams,
    useTransition as useNavigation,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function LoginFrom() {
    const [searchParams] = useSearchParams();
    const validationErrors = useActionData();

    const authMode = searchParams.get('mode') || 'login';

    const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
    const toggleBtnCaption =
        authMode === 'login' ? 'Create a new user' : 'Log in with existing user';


    return (
        <Form method="post" className="form" id="auth-form">
            <div className="icon-img">
                {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
            </div>
            <p>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" minLength={7} />
            </p>
            {(validationErrors) && (
                <ul>
                    {Object.values(validationErrors).map((error) => {
                        if (error != '') {
                            return <li key={error}>{error}</li>
                        }
                    })}
                </ul>
            )}
            <div className="form-actions">
                <button type='submit'>Login</button>
            </div>
        </Form>
    );
}

export default LoginFrom;