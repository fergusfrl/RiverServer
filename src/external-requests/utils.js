const makeArrayString = arr => {
    return (
        "[" + arr.map(gaugeName => '"' + gaugeName.toLowerCase() + '"') + "]"
    );
};

module.exports = makeArrayString;
