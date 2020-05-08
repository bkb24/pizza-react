const PASS_MIN = 8;
const PASS_MAX = 255;
const PHONE_MIN = 7;
const PHONE_MAX = 15;
const ADDRESS_MIN = 10;
const ADDRESS_MAX = 255;

const min = (data, fieldName, min, errors) => {
    if (data[fieldName] < min) {
        errors[fieldName] = `Should be more than ${min}`;
    }
}

const max = (data, fieldName, max, errors) => {
    if (data[fieldName] > max) {
        errors[fieldName] = `Should be less than ${max}`;
    }
}

const minLen = (data, fieldName, min, errors) => {
    if (data[fieldName] && data[fieldName].trim().length < min) {
        errors[fieldName] = `Should be at least ${min} characters long`;
    }
}

const maxLen = (data, fieldName, max, errors) => {
    if (data.name && data.name.trim().length > max) {
        errors[fieldName] = `Too long, should be maximum ${max} characters long`;
    }
}

const isNumber = (data, fieldName, errors) => {
    if (isNaN(data[fieldName]))
        errors[fieldName] = 'Must be numeric'
}

const lengthCheck = (data, fieldName, min, max, errors) => {
    required(data, fieldName, errors)
    minLen(data, fieldName, min, errors)
    maxLen(data, fieldName, max, errors)
}

const required = (data, fieldName, errors) => {
    if (
        !data[fieldName] ||
        (typeof stringValue === 'string' && data[fieldName].trim().length === 0) ||
        data[fieldName].length === 0
    ) {
        errors[fieldName] = 'Required';
        return;
    }
}

export const passwordChange = (data) => {
    let errors = {};

    lengthCheck(data, 'current_password', PASS_MIN, PASS_MAX, errors)
    lengthCheck(data, 'password', PASS_MIN, PASS_MAX, errors)
    lengthCheck(data, 'password_confirmation', PASS_MIN, PASS_MAX, errors)

    return errors;
}

export const phoneUpdate = (data) => {
    let errors = {};

    lengthCheck(data, 'phone', PHONE_MIN, PHONE_MAX, errors)
    isNumber(data, 'phone', errors)

    return errors;
}

export const addressUpdate = (data) => {
    let errors = {};

    lengthCheck(data, 'address', ADDRESS_MIN, ADDRESS_MAX, errors)

    return errors;
}

const PNAME_MIN = 3;
const PNAME_MAX = 100;
const DESC_MIN = 3;
const DESC_MAX = 100;
const PRICE_MIN = 0.01;
const PRICE_MAX = 999.99;

export const productSave = (data) => {
    let errors = {};

    lengthCheck(data, 'name', PNAME_MIN, PNAME_MAX, errors)

    lengthCheck(data, 'description', DESC_MIN, DESC_MAX, errors)

    isNumber(data, 'price', errors)
    min(data, 'price', PRICE_MIN, errors)
    max(data, 'price', PRICE_MAX, errors)

    // On new product creation
    if (data.hasOwnProperty('fileInput')) {
        required(data, 'fileInput', errors)
    }

    required(data, 'category_id', errors)

    isNumber(data, 'in_stock', errors)

    isNumber(data, 'category_id', errors)

    return errors;
}

export const shippingDetails = (data) => {
    let errors = {}

    lengthCheck(data, 'first_name', PNAME_MIN, PNAME_MAX, errors)
    lengthCheck(data, 'last_name', PNAME_MIN, PNAME_MAX, errors)

    lengthCheck(data, 'phone', PHONE_MIN, PHONE_MAX, errors)
    isNumber(data, 'phone', errors)

    lengthCheck(data, 'address', 0, ADDRESS_MAX, errors)

    lengthCheck(data, 'city', 2, 30, errors)
    lengthCheck(data, 'state', 2, 30, errors)

    return errors
}
