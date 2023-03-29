const loginSchema = (email: string, password: string): boolean => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const emailValid = regex.test(email);
  const passwordValid = password.length >= 7;

  return emailValid && passwordValid;
};

const loginValidations = (email: string, password: string) => {
  if (!email || !password) {
    return { type: 'invalidFields', message: 'All fields must be filled' };
  }

  const validate = loginSchema(email, password);

  if (!validate) {
    return { type: 'incorrectInfos', message: 'Invalid email or password' };
  }

  return { type: null, message: 'OK' };
};

export default loginValidations;
