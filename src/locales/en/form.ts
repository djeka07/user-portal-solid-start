export default {
  login: {
    title: 'Login',
    input: {
      email: {
        label: 'Email',
        placeholder: 'Enter email',
        error: {
          empty: 'Email is required',
          'not-valid': 'The email is not valid',
        },
      },
      password: {
        label: 'Password',
        placeholder: 'Enter password',
        error: {
          empty: 'Password is required',
        },
      },
    },
    error: 'Email or password is wrong',
    button: 'Login',
    link: {
      'not-a-user': 'Not a user?',
      forgot: 'Forgot password?',
    },
  },
  register: {
    title: 'Register user',
    button: 'Register',
    success:
      'The user is created. To be able to login you need to be granted access. You will receive a email when you have access to the system.',
    error: 'Could not create the user. Contact us with id {{requestId}} for help.',
    input: {
      'first-name': {
        label: 'First name',
        placeholder: 'Enter first name',
        error: {
          empty: 'First name is required',
        },
      },
      'last-name': {
        label: 'Last name',
        placeholder: 'Enter last name',
        error: {
          empty: 'Last name is required',
        },
      },
      'confirm-password': {
        label: 'Confirm password',
        placeholder: 'Enter password again',
        error: {
          empty: 'Confirm password is required',
        },
      },
    },
  },
  reset: {
    title: 'Reset password',
    button: 'Reset',
    success: 'An email has been sent with instructions how to reset your password.',
    link: {
      login: 'Login',
    },
  },
  conversation: {
    title: 'New conversation',
    input: {
      message: {
        label: 'Message',
        placeholder: 'Enter message',
      },
    },
  },
  user: {
    title: {
      create: 'Create new user',
      update: 'Update user',
    },
    input: {
      firstName: { label: 'First name', placeholder: 'Enter first name' },
      lastName: { label: 'Last name', placeholder: 'Enter last name' },
      roles: { label: 'Roles' },
      users: { error: 'You need to select at least one user' },
      apps: { error: 'You need to select at least on app' },
    },
    success: {
      create: 'User successfully created',
      update: 'User successfully updated',
    },
    error: {
      create: 'Could not create user',
      roles: 'You need to select at least one role',
    },
  },
};
