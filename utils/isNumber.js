module.exports = (inputValue) => {
    const inputValueAsNumber = Number.parseFloat(inputValue);

    return !!((Number.isFinite(inputValueAsNumber) && Number.isSafeInteger(inputValueAsNumber)));
};
