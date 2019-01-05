export const checkValidation = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.email) {
      isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && isValid;
    }
    if (rules.zipcode) {
        isValid =
          value.match("^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$") && isValid;
      }
    if (rules.password) {
      isValid =
        value.match(
          "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,}"
        ) && isValid;
    }
    return isValid;
  }

