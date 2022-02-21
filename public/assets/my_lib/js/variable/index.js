const Variable = (function() {
    function Variable(){}

    Variable.Clear = function (variable, type = ClearTypes.STRING, clear_html_tags = true) {
        variable = (typeof variable != "undefined") ? variable : null;
        if(variable !== null){
            variable = (clear_html_tags) ? variable.toString().stripTags() : variable;
            if (isNaN(variable)) {
                variable = variable.toString().trim();
            }
            switch (type){
                case ClearTypes.INT:
                    // @ts-ignore
                    variable = Number.parseInt(filterVar(variable, FilterTypes.INT));
                    break;
                case ClearTypes.FLOAT:
                    // @ts-ignore
                    variable = Number.parseFloat(filterVar(variable, FilterTypes.FLOAT));
                    break;
                case ClearTypes.ALPHABETS:
                    variable = variable.replace(/[^a-zA-ZğüşöçİĞÜŞÖÇ\w ]/g, "");
                    break;
                case ClearTypes.EMAIL:
                    variable = filterVar(variable, FilterTypes.EMAIL);
                    break;
                case ClearTypes.SEO_URL:
                    variable = variable.toString().convertSEOUrl();
                    break;
            }
        }

        return variable;
    }

    Variable.ClearAllData = function (data, not_column) {
        if(!Variable.isSet(() => data)) return false;

        // @ts-ignore
        for (let [key, _1] of Object.entries(data)) {
            // @ts-ignore
            if (not_column.includes(key)) continue;
            let clear_type = ClearTypes.STRING;
            if(!Variable.isEmpty(_1)) {
                if(typeof _1 === "object"){ Variable.ClearAllData(_1); continue; }
                if (!isNaN(Number(_1))){
                    if (Number(_1).isInt()) clear_type = ClearTypes.INT;
                    else if (Number(_1).isFloat()) clear_type = ClearTypes.FLOAT;
                }
            }
            data[key] = Variable.Clear(_1, clear_type, true);
        }

        return data;
    }

    Variable.isSet = function (...variable) {
        let result;
        try{
            for (let i = 0; i < variable.length; i++){
                result = variable[i]();
            }
        }catch (e){
            result = undefined;
        }finally {
            return result !== undefined;
        }
    }

    Variable.isEmpty = function (...variable) {
        for (let i = 0; i < variable.length; i++){
            if(
                !Variable.isSet(() => variable[i]) ||
                variable[i] === null ||
                variable[i].length === 0 ||
                !variable[i].toString().trim()
            ) return true;
        }
        return false;
    }

    Variable.setDefault = function (variable, default_value){
        return (Variable.isSet(variable)) ? variable() : default_value;
    }

    function filterVar(variable, filter_type) {
        let regex;

        // Check Filter Type
        switch(filter_type){
            case FilterTypes.EMAIL:
                regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                break;
            case FilterTypes.INT:
                regex = /([0-9]+)/g;
                break;
            case FilterTypes.FLOAT:
                regex = /[+-]?([0-9]*[.])[0-9]+/g;
        }
        // Check Defined
        let match;
        if ((match = regex.exec(variable)) != null) {
            variable = match[0];
        } else {
            variable = "";
        }

        return variable;
    }

    return Variable;
})();

const FilterTypes = {
    EMAIL: 1,
    INT: 2,
    FLOAT: 3
}

const ClearTypes = {
    STRING: 1,
    EMAIL: 2,
    INT: 3,
    FLOAT: 4,
    SEO_URL: 5,
    ALPHABETS: 6
}