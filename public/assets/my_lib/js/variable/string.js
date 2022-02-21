String.prototype.replaceArray = function (find, replace) {
    let replaceString = this;
    for (let i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString.toString();
}

String.prototype.removeLastChar = function (remove_count = 1) {
    return this.substring(this.length-1, remove_count * -1);
}
String.prototype.Encode = function () {
    return escape(this.toString());
}
String.prototype.Decode = function () {
    return unescape(this.toString());
}
String.prototype.convertKey = function () {
    return unescape(encodeURIComponent(this.convertSEOUrl()));
}
String.prototype.stripTags = function () {
    return this.replace(/<\/?[^>]+>/gi, '');
}
String.prototype.convertSEOUrl = function () {
    let $this = this.toString();
    $this = $this.toString().toLowerCase().trim().stripTags().Encode();
    $this = $this.replace("'", '');
    let tr = Array('ş','Ş','ı','I','İ','ğ','Ğ','ü','Ü','ö','Ö','Ç','ç','(',')','/',':',',','!');
    let eng = Array('s','s','i','i','i','g','g','u','u','o','o','c','c','','','_','_','','');
    $this = $this.replaceArray(tr, eng);
    $this = $this.replace(/[^-\w\s]/g, ''); // Remove unneeded characters
    $this = $this.replace(/^\s+|\s+$/g, ''); // Trim leading/trailing spaces
    $this = $this.replace(/[-\s]+/g, '-'); // Convert spaces to hyphens
    $this = $this.toLowerCase(); // Convert to lowercase
    return $this;
}