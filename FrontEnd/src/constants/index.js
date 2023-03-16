const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

const signupFields = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

const taskFields = [
  {
    labelText: "Title",
    labelFor: "Title",
    id: "Title",
    name: "title",
    type: "text",
    autoComplete: "Title",
    isRequired: true,
    placeholder: "Task title",
  },
  {
    labelText: "description",
    labelFor: "description",
    id: "description",
    name: "description",
    type: "text",
    autoComplete: "description",
    isRequired: true,
    placeholder: "Task description",
  },
  {
    labelText: "duration",
    labelFor: "duration",
    id: "duration",
    name: "duration",
    type: "date",
    autoComplete: "duration",
    isRequired: true,
    placeholder: "Task duration",
  },
];

export { loginFields, signupFields, taskFields };
