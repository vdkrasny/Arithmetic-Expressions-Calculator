module.exports = (inputValue) => {
    if (typeof inputValue === 'string' || inputValue instanceof String) {
        return true;
    }

    return false;
};
