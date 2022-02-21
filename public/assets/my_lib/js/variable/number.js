Number.prototype.isInt = function (){
    if (typeof this !== "number") return false;
    let n = this;
    return Number(n) === n && n % 1 === 0;
};
Number.prototype.isFloat = function () {
    if (typeof this !== "number") return false;
    let n  = this;
    return Number(n) === n && n % 1 !== 0;
}