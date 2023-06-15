import {
  Form,
  useActionData,
  useSearchParams,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function RegisterFrom() {
  const [searchParams] = useSearchParams();
  const validationErrors = useActionData();

  const authMode = searchParams.get('mode') || 'login';

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">First Name</label>
        <input type="text" id="first_name" name="first_name" required />
      </p>
      <p>
        <label htmlFor="email">Last Name</label>
        <input type="text" id="last_name" name="last_name" required />
      </p>
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

export default RegisterFrom;