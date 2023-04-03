function validateEmail(email: string) {
  if (!email) {
    return "Por favor forneça um e-mail";
  }

  if (!email.includes("@")) {
    return "Por favor forneça um e-mail válido";
  }

  return null;
}

function validatePassword(password: string) {
  if (!password) {
    return "Por favor forneça uma senha";
  }

  return null;
}

function validateUsername(username: string) {
  if (!username) {
    return "Por favor forneça um nome";
  }

  return null;
}

export { validateEmail, validatePassword, validateUsername };
