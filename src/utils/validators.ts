/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation (min 6 characters)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Username validation (alphanumeric, 3-20 characters)
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Validate todo title
 */
export const isValidTodoTitle = (title: string): boolean => {
  return title.trim().length >= 1 && title.trim().length <= 200;
};

/**
 * Validate todo description
 */
export const isValidTodoDescription = (description: string): boolean => {
  return !description || description.length <= 1000;
};

/**
 * Form validation error messages
 */
export const validationMessages = {
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters',
  },
  username: {
    required: 'Username is required',
    invalid: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
  },
  firstName: {
    required: 'First name is required',
  },
  lastName: {
    required: 'Last name is required',
  },
  todoTitle: {
    required: 'Todo title is required',
    maxLength: 'Title must be 200 characters or less',
  },
  todoDescription: {
    maxLength: 'Description must be 1000 characters or less',
  },
};

/**
 * Validate login credentials
 */
export interface LoginErrors {
  username?: string;
  password?: string;
}

export const validateLogin = (username: string, password: string): LoginErrors => {
  const errors: LoginErrors = {};
  
  if (!username) {
    errors.username = validationMessages.username.required;
  } else if (!isValidUsername(username)) {
    errors.username = validationMessages.username.invalid;
  }
  
  if (!password) {
    errors.password = validationMessages.password.required;
  } else if (!isValidPassword(password)) {
    errors.password = validationMessages.password.minLength;
  }
  
  return errors;
};

/**
 * Validate signup credentials
 */
export interface SignupErrors {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export const validateSignup = (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
): SignupErrors => {
  const errors: SignupErrors = {};
  
  if (!username) {
    errors.username = validationMessages.username.required;
  } else if (!isValidUsername(username)) {
    errors.username = validationMessages.username.invalid;
  }
  
  if (!email) {
    errors.email = validationMessages.email.required;
  } else if (!isValidEmail(email)) {
    errors.email = validationMessages.email.invalid;
  }
  
  if (!password) {
    errors.password = validationMessages.password.required;
  } else if (!isValidPassword(password)) {
    errors.password = validationMessages.password.minLength;
  }
  
  if (!firstName.trim()) {
    errors.firstName = validationMessages.firstName.required;
  }
  
  if (!lastName.trim()) {
    errors.lastName = validationMessages.lastName.required;
  }
  
  return errors;
};

/**
 * Validate todo form
 */
export interface TodoErrors {
  title?: string;
  description?: string;
}

export const validateTodo = (title: string, description?: string): TodoErrors => {
  const errors: TodoErrors = {};
  
  if (!title.trim()) {
    errors.title = validationMessages.todoTitle.required;
  } else if (title.length > 200) {
    errors.title = validationMessages.todoTitle.maxLength;
  }
  
  if (description && description.length > 1000) {
    errors.description = validationMessages.todoDescription.maxLength;
  }
  
  return errors;
};