Array.prototype.indexOfKey = function (key, value) {
    return this.map(data => {
        return (key === "")
            ? data
            : (typeof data[key] !== undefined)
                ? data[key]
                : -1;
    }).indexOf(value);
}
Array.prototype.findSingle = function (key, value) {
    return this.find(function(data, index){
        data._index = index;
        return ((key === "") ? data : data[key]) == value
    });
}
Array.prototype.findMulti = function (key, value) {
    let founds = Array();
    this.find(function(data, index){
        // @ts-ignore
        let query = ((Array.isArray(value)) ? value.includes(((key === "") ? data : data[key])) : ((key === "") ? data : data[key]) == value);
        // @ts-ignore
        data = Object.assign(data, {_index: index});
        if(query) founds.push(data);
    });
    return founds;
}
Array.prototype.orderBy = function (key, sort_type = `asc` | `desc`) {
    return this.sort(function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (sort_type === "desc") ? (comparison * -1) : comparison
        );
    });
}
Array.prototype.findMultiForObject = function (obj, find, type = 'string' | `number`){
    let query = '';
    let multi_find = false;
    for (const key in find) {
        if (find[key] instanceof Array && find[key].length > 0){
            multi_find = true
            if (type == 'string') query += `[${find[key].map((e)=>`'${e}'`)}].includes(a['${key}']) || `
            if (type == "number") query += `[${find[key].map((e)=>`${e}`)}].includes(a['${key}']) || `
        }else {
            query += `a['${key}']=='${find[key]}' && `
        }
    }
    query = query.slice(0,-3)
    return obj.filter(e => eval(query));
}