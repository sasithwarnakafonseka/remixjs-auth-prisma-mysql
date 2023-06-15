function isValidTitle(value: any) {
    return value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value: any) {
    const amount = parseFloat(value);
    return !isNaN(amount) && amount > 0;
}

function isValidDate(value: any) {
    return value && new Date(value).getTime() < new Date().getTime();
}

export function validateExpenseInput({ amount, title, date }: InputValidation) {
    let validationErrors: OutputValidation = {
        amount: "",
        title: "",
        date: ""
    };

    if (!isValidTitle(title)) {
        validationErrors.title = 'Invalid expense title. Must be at most 30 characters long.'
    }

    if (!isValidAmount(amount)) {
        validationErrors.amount = 'Invalid amount. Must be a number greater than zero.'
    }

    if (!isValidDate(date)) {
        validationErrors.date = 'Invalid date. Must be a date before today.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors;
    }
}

function isValidEmail(value:any) {
    return value && value.includes('@');
}

function isValidPassword(value:any) {
    return value && value.trim().length >= 7;
}

export function validateCredentials(input:any) {
    let validationErrors:OutputValidateCredentials = {
        email: "",
        password: ""
    };

    if (!isValidEmail(input.email)) {
        validationErrors.email = 'Invalid email address.'
    }

    if (!isValidPassword(input.password)) {
        validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
    }

    if (validationErrors.email !=='' || validationErrors.password !=='') {
        throw validationErrors;
    }
}

export function validateCredentialsRegister(input:any) {
    let validationErrors:OutputValidateCredentialsSigning = {
        email: "",
        password: "",
        first_name:"",
        last_name:"",
    };

    if (!isValidEmail(input.email)) {
        validationErrors.email = 'Invalid email address.'
    }

    if (!isValidPassword(input.password)) {
        validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
    }

    if (!isValidPassword(input.password)) {
        validationErrors.first_name = 'First name is required'
    }

    if (!isValidPassword(input.password)) {
        validationErrors.last_name = 'Last name is required'
    }

    if (validationErrors.email !=='' || validationErrors.password !=='' || validationErrors.last_name !=='' || validationErrors.first_name !=='') {
        throw validationErrors;
    }
}
