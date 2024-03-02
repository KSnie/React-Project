const validation = (values) => {
    let error = {};
  
    const isValid = (value) => {
      return /^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value);
    };

    if (values.username && values.username.length > 3 && isValid(values.username)) {
      error.username = "";
    } else {
      error.username = "can't be empty";
    }
  
    if (values.password && values.password.length > 3 && isValid(values.password)) {
      error.password = "";
    } else {
      error.password = "can't be empty";
    }

    return error;
  };

const validation2 = (values) => {
    let error = {};
  
    const isValid = (value) => {
      return /^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value);
    };

    if (values.username && values.username.length > 3 && isValid(values.username)) {
      error.username = "";
    } else {
      error.username = "can't be empty";
    }
  
    if (values.password && values.password.length > 3 && isValid(values.password)) {
      error.password = "";
    } else {
      error.password = "can't be empty";
    }

    if (values.password && values.Secondpassword && values.password === values.Secondpassword ) {
        error.notmatch = ""
    } else {
        error.notmatch = "Password not match";
    }

    return error;
};

const validation3 = (values) => {
    let error = {};

    const isValid2 = (value) => {
        return /^[a-zA-Z]+$/.test(value);
    };

    const isValid3 = (value) => {
        return /^[0-9]+$/.test(value);
    };

    if (values.F_name && values.F_name.length > 3 && isValid2(values.F_name)) {
        error.F_name = "";
    } else {
        error.F_name = "can't be empty";
    }

    if (values.L_name && values.L_name.length > 3 && isValid2(values.L_name)) {
        error.L_name = "";
    } else {
        error.L_name = "can't be empty ex.John koby";
    }

    if (values.date_of_birth && values.date_of_birth !== '') {
        error.date_of_birth = "";
    } else {
        error.date_of_birth = "date of birth can't be empty";
    }

    if (values.phone_number && values.phone_number.length > 9 && isValid3(values.phone_number)) {
        error.phone_number = "";
    } else {
        error.phone_number = "phone number can't be empty";
    }

    if (values.country && values.country !== "") {
        error.country = "";
    } else {
        error.country = "country can't be empty";
    }

    return error;
};

export { validation, validation2, validation3 };
  