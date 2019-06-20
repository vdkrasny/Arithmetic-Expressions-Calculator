module.exports = (inputValue) => {
    const inputValueAsNumber = Number.parseFloat(inputValue);

    if (Number.isFinite(inputValueAsNumber) && Number.isSafeInteger(inputValueAsNumber)) {
        return true;
    }

    return false;
};
