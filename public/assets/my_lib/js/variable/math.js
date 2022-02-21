Math.Random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
Math.Range = function (value,min, max,equal=false) {
    return (equal) ? ((value >= min) && (value <= max)) : ((value > min) && (value < max));
};