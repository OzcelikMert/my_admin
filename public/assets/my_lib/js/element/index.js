const Element = (function() {
    function Element(){}

    Element.createSelectOption = function (array, key_value, key_text, array_selected = [], check_function = (item) => { return true; }) {
        let elements = ``;
        array.forEach(item =>{
            if(!check_function(item)) return;
            let selected = (array_selected.length > 0 && array_selected.includes(item[key_value])) ? "selected" : "";
            elements += `<option value="${item[key_value]}" ${selected}>${item[key_text]}</option>`;
        });
        return elements;
    }

    Element.createTableColumn = function (tr = {},columns = []){
        let class_list = "";
        let attr_list = "";
        let id = "";
        let td = "";

        try {
            if (typeof columns !== 'undefined'){
                if (typeof columns === 'string'){
                    td = columns;
                }else if (typeof columns === 'object'){

                    columns.forEach(function (item){
                        if (typeof item == "string") td += "<td>"+item + "</td> ";
                        if (typeof item == "object") {
                            let data = {
                                html: (item.html !== undefined) ? item.html : "",
                                id: (item.id !== undefined) ? `id='${item.id}' ` : "",
                                class: (item.class !== undefined) ? `class='${item.class}' ` : "",
                                style: (item.style !== undefined) ? `style='${item.style}' ` : "",
                                attr: (item.attr !== undefined) ? `style='${item.attr}' ` : "",
                            }
                            td += `<td ${data.id}${data.class}${data.style}${data.attr}>${data.html}</td>`;
                        }
                    })
                    td.slice(0,-1)
                }
            }
            // ===-| TR |-===
            if (typeof tr !== 'undefined'){
                if (typeof tr !== 'undefined'){
                    // -> class
                    if (typeof tr.class === 'string'){
                        class_list = `class='${tr.class}'`;
                    }else if (typeof tr.class === 'object'){
                        tr.class.forEach(function (item){ class_list += item +" "; })
                        class_list = `class='${class_list.slice(0,-1)}'`;
                    }
                    // -> id
                    if (typeof tr.id == 'string'){ id = `id='${tr.id}'` }

                    // -> attributes
                    if (typeof tr.attr === 'string'){
                        attr_list = tr.attr;
                    }else if (typeof tr.attr === 'object'){
                        for (const key in tr.attr) {
                            attr_list += `${key}="${tr.attr[key]}" `
                        }
                        attr_list.slice(0,-1)
                    }
                }
                tr = `<tr ${id} ${class_list} ${attr_list}>${td}</tr>`;
            }
            return tr;
        }catch (e) {return e}
    }

    Element.createPaginationButton = function (total, per_count, current){
        let elements = ``;
        let total_page = Math.ceil((total / per_count));
        current = (Number.isNaN(current) || current <= 0) ? 1 : current;
        current = (Number.isNaN(current) || current > total_page) ? total_page : current;
        /* Button Count */

        let length = 4;
        length = (length > total_page) ? total_page - 1 : length;
        let start = current - Math.floor(length / 2);
        start = Math.max(start, 1);
        start = Math.min(start, total_page - length);

        for (let i = 0; i <= length; ++i){
            let index = i + start;
            elements += `
                <li class="page-item ${(current === index) ? "active" : ""}">
                    <a class="page-link ${(current !== index) ? "text-dark" : ""}" index=${index}">${index}</a>
                </li>
            `;
        }

        elements = `
            <ul style="list-style: none; display: inline-flex;">
                <li class="page-item ${(current <= 1) ? "disabled" : ""}">
                    <a class="page-link text-dark" index=${current - 1}" tabindex="-1">Önceki</a>
                </li>
                ${elements}
                <li class="page-item ${(current >= total_page) ? "disabled" : ""}">
                    <a class="page-link text-dark" index=${current + 1}">Sonraki</a>
                </li>
            </ul>
        `;
        return elements;
    }

    return Element;
})();