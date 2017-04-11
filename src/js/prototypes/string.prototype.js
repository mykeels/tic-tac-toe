/***
This 2015 code is an update to a particularly crappy one written by Ikechi Michael in July 2014
***/

String.prototype.toNumber = function () {
    var s = this;
    if (!Number.isNaN(Number(s))) {
        return Number(s);
    }
    else {
        return 0;
    }
}

String.prototype._endsWith = function (f) {
    var s = this;
    var count = f.length;
    var b = true;
    for (var i = count; i > 0; i--) {
        if (s.charAt(s.length - i) != f.charAt(count - i)) {
            b = false;
        }
    }
    return b;
}

String.prototype._startsWith = function (f) {
    var s = this.valueOf();
    s = s.toLowerCase();
    f = f.toLowerCase();
    var count = f.length;
    var b = true;
    for (var i = 0; i < count; i++) {
        if (s.charAt(i).toLowerCase() != f.charAt(i).toLowerCase()) {
            b = false;
        }
    }
    return b;
}

String.prototype._find = function (f) {
    var s = this;
    if (f.length > s.length) {
        return undefined;
    }
    else {
        var obj = new Object()
        obj.start = s.indexOf(f);
        obj.end = s.indexOf(f) + f.length - 1;
        return obj;
    }
}

String.prototype._findAll = function (f) {
    var s = this;
    if (f.length > s.length) {
        return undefined;
    }
    else {
        var fArray = [];
        var b = false;
        var newStartIndex = 0;
        if (s.indexOf(f) >= 0) {
            b = true;
            var obj = {};
            obj.start = s.indexOf(f);
            obj.end = s.indexOf(f) + f.length - 1;
            fArray.push(obj);
            newStartIndex = s.indexOf(f) + f.length;
        }
        while (b == true) {
            //search for others
            var f_new = s.substring(newStartIndex, s.length)
            if (f_new.indexOf(f) >= 0) {
                b = true;
                var obj = new Object();
                obj.start = f_new.indexOf(f) + newStartIndex;
                obj.end = f_new.indexOf(f) + f.length - 1 + newStartIndex;
                fArray.push(obj);
                newStartIndex = f_new.indexOf(f) + f.length + newStartIndex;
            }
            else {
                b = false;
            }
        }
        return fArray;
    }
}

String.prototype._between = function (f1, f2) {
    var s = this;
    if (s.indexOf(f1) < 0 || s.indexOf(f2) < 0) {
        return undefined;
    }
    else {
        var obj1 = this._find(f1);
        var obj2 = this._find(f2);
        if (obj2.start > obj1.end) {
            return s.substring(obj1.end + 1, obj2.start);
        }
        else {
            return s.substring(obj2.end + 1, obj1.start);
        }
    }
}

String.prototype._allBetween = function (f1, f2) {
    var s = this;
    var fArray = [];
    var i = 0;
    var b = true;
    while (b == true) {
        if (this._between(f1, f2) != undefined) {
            var f = new Object();
            f = this._between(f1, f2);
            fArray.push(f);
            var obj1 = this._find(f1);
            var obj2 = this._find(f2);
            s = s.substring(Math.max(obj1.end, obj2.end) + 1, s.length);
            if (f != undefined) {
                b = true;
            }
            else {
                b = false
            }
            i += 1;
        }
        else {
            b = false;
        }

    }
    return fArray;
}

String.prototype._toUpper = function () {
    var s = this.valueOf();
    return s.toUpperCase();
}

String.prototype._toLower = function () {
    var s = this.valueOf();
    return s.toLowerCase();
}

String.prototype._toSentenceCase = function () {
    var s = this.valueOf();
    var f = "";
    f += s.charAt(0).toUpperCase();
    for (var i = 1; i < s.length; i++) {
        f += s.charAt(i);
    }
    return f;
}

String.prototype._toCamelCase = function () {
    var s = this.valueOf();
    var fArray = new Array();
    fArray = s.split("_");
    if (fArray.length > 0) {
        var f = fArray[0];
        for (var i = 1; i < fArray.length; i++) {
            f += this._toSentenceCase(fArray[i]);
        }
        return f;
    }
    else {
        return undefined;
    }
}

String.prototype._chompLeft = function (count) {
    var s = this;
    if (count > s.length) {
        return "";
    }
    else {
        var f = "";
        for (var i = count; i < s.length; i++) {
            f += s.charAt(i);
        }
        s = f;
        return f;
    }
}

String.prototype._chompRight = function (count) {
    var s = this;
    if (count > s.length) {
        return "";
    }
    else {
        var f = "";
        for (var i = 0; i < s.length - count; i++) {
            f += s.charAt(i);
        }
        s = f;
        return f;
    }
}

String.prototype._remove = function (f) {
    var s = this.valueOf();
    while (s.indexOf(f) >= 0) {
        var ret = "";
        var start = s.indexOf(f);
        var end = start + f.length - 1;
        for (var i = 0; i < s.length; i++) {
            if (i < start || i > end) {
                ret += s.charAt(i);
            }
        }
        s = "";
        s = ret;
    }
    return s;
}

String.prototype._removeIndex = function (index, count) {
    var s = this;
    var f = "";
    for (var i = 0; i < s.length; i++) {
        if (i >= index && i < index + count) {

        }
        else {
            f += s.charAt(i);
        }
    }
    return f;
}

String.prototype._replace = function (f1, f2) { //for future work
    var s = this.valueOf();
    var ret = "";
    var start = s.indexOf(f1);
    if (start >= 0) {
        var end = start + f1.length - 1;
        for (var i = 0; i < start; i++) {
            ret += s.charAt(i);
        }
        for (var j = 0; j < f2.length; j++) {
            ret += f2.charAt(j);
        }
        var rem = s.substring(end + 1, s.length);
        //console.log(rem + " " + rem.length);
        if (s.length > end + 1 + f1.length) ret += rem._replace(f1, f2);
        else ret += rem;
    }
    else {
        ret += s;
    }
    s = "";
    s = ret;
    return s;
}

String.prototype._first = function () {
    var s = this;
    return s.charAt(0);
}

String.prototype._last = function () {
    var s = this;
    return s.charAt(s.length - 1);
}

String.prototype.collapse = function () {
    var s = this;
    s = s._replace(new RegExp(" ", "g"), "");
    s = s._replace(new RegExp("\n", "g"), "");
    s = s._replace(new RegExp("\t", "g"), "");
    s = s._replace(new RegExp("\r", "g"), "");
    return s
}

String.prototype._contains = function (f) {
    var s = this;
    if (this._find(s, f).start >= 0) {
        return true;
    }
    else {
        return false;
    }
}

String.prototype._count = function (f) {
    var s = this;
    var obj = this._findAll(s, f);
    if (obj == undefined) return 0;
    return obj.length;
}

String.prototype._deCamelize = function () {
    var s = this.valueOf();
    var f = "";
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == s.charAt(i).toUpperCase()) {
            f += "_" + s.charAt(i).toLowerCase();
        }
        else {
            f += s.charAt(i);
        }
    }
    return f;
}

String.prototype._HTMLEncode = function () {
    var s = this.valueOf();
    s = this._replace(s, "<", "&lt;");
    s = this._replace(s, ">", "&gt;");
    s = this._replace(s, "'", "&#39;");
    s = this._replace(s, ",", "&#44;");
    s = this._replace(s, "\"", "&quot;");
    return s;
}

String.prototype._HTMLDecode = function () {
    var s = this.valueOf();
    s = this._replace(s, "&lt;", "<");
    s = this._replace(s, "&gt;", ">");
    s = this._replace(s, "&#39;", "'");
    s = this._replace(s, "&#44;", ",");
    s = this._replace(s, "&quot;", "\"");
    return s;
}

String.prototype._prefix = function (f) {
    var s = this;
    return f + s;
}

String.prototype._suffix = function (f) {
    var s = this;
    return s + f;
}

String.prototype._isAlpha = function () {
    var s = this;
    var b = false;
    for (var i = 0; i < s.length; i++) {
        if (isNaN(Number(s.charAt(i)))) {
            b = true;
        }
        else {
            return false;
        }
    }
    return b;
}

String.prototype._isAlphaNumeric = function () {
    var s = this;
    return !(this._isAlpha(s)) && !(Number(s) < 0);
}

String.prototype._isEmpty = function () {
    var s = this;
    var f = s.trim();
    if (f == "") {
        return true;
    }
    else {
        return false;
    }
}

String.prototype._isLower = function () {
    var s = this;
    var f = s.toLowerCase();
    if (f == s) {
        return true;
    }
    else {
        return false;
    }
}

String.prototype._isUpper = function () {
    var s = this;
    var f = s.toUpperCase();
    if (f === s) {
        return true;
    }
    else {
        return false;
    }
}

String.prototype._isNumeric = function () {
    var s = this;
    var b = true;
    for (var i = 0; i < s.length; i++) {
        if (isNaN(Number(s.charAt(i)))) {
            return false;
        }
        else {
            b = true;
        }
    }
    return b;
}

String.prototype._left = function (count) {
    var s = this;
    if (count >= s.length) {
        return s;
    }
    else {
        var f = "";
        for (var i = 0; i < count; i++) {
            f += s.charAt(i);
        }
        return f;
    }
}

String.prototype._right = function (count) {
    var s = this;
    if (count >= s.length) {
        return s;
    }
    else {
        var f = "";
        for (var i = s.length - count; i < s.length; i++) {
            f += s.charAt(i);
        }
        return f;
    }
}

String.prototype._lines = function () {
    var s = this;
    var fArray = s.split("\n");
    return fArray;
}

String.prototype._repeat = function () {
    var s = this;
    var f = "";
    for (var i = 0; i < count; i++) {
        f += s;
    }
    return f;
}

String.prototype._stripHTML = function () {
    var s = this.valueOf();
    var div = document.createElement("div");
    div.innerHTML = s;
    return div.textContent || div.innerText || "";
}

String.prototype._trim = function () {
    var s = this.valueOf();
    var f = "";
    while (this.startsWith(s, " ") || this._startsWith(s, "\n") || this._startsWith(s, "\t") || this._startsWith(s, "\r")) {
        s = f = this.removeIndex(s, 0, 1);
    }
    while (this._endsWith(s, " ") || this._endsWith(s, "\n") || this._endsWith(s, "\t") || this._endsWith(s, "\r")) {
        s = f = this._removeIndex(s, s.length - 1, 1);
    }
    return f;
}

String.prototype._trimLeft = function (ch) {
    var s = this.valueOf();
    var f = "";
    var b = false;
    if (ch) {
        b = s._startsWith(ch)
    }
    while (s._startsWith(" ") || s._startsWith("\n") || s._startsWith("\t") || s._startsWith("\r") || b) {
        s = f = this._removeIndex(s, 0, 1);
    }
    return f;
}

String.prototype._trimRight = function () {
    var s = this.valueOf();
    var f = "";
    while (this._endsWith(s, " ") || this._endsWith(s, "\n") || this._endsWith(s, "\t") || this._endsWith(s, "\r")) {
        s = f = this._removeIndex(s, s.length - 1, 1);
    }
    return f;
}

String.prototype._truncate = function (length) {
    var s = this.valueOf();
    var fArray = s.split(" ");
    var index = 0;
    var ret = "";
    for (var i = 0; i < fArray.length; i++) {
        index += fArray[i].length + 1;
        if (index - 1 <= length) {
            ret += fArray[i].toString() + " ";
        }
    }
    return ret;
}

String.prototype._copyright = function () {
    return "Copyright (C) Str.js Ikechi Michael I. 2015";
}

String.prototype._version = function () {
    return "Version 2.0";
}

String.prototype._isUsername = function () {
    var s = this.valueOf();
    var reg1 = /^[a-zA-Z]([a-zA-Z0-9_])*$/;
    if (s.length < 5) {
        return false;
    }
    else if (s.search(reg1) >= 0) {
        return true;
    }
    else {
        return false;
    }
}

String.prototype._isPassword = function () {
    var s = this.valueOf();
    if (s.length < 6) {
        return false;
    }
    else if (this._isAlphaNumeric(s) && this._hasCaps(s) && this._hasSpecial(s)) {
        return true;
    }
    else {
        return false;
    }
}

String.prototype._hasCaps = function () {
    var s = this;
    var b = false;
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == s.charAt(i).toUpperCase()) {
            return true;
        }
        else {
            b = false;
        }
    }
    return b;
}

String.prototype._hasSpecial = function () {
    var s = this;
    var b = false;
    for (var i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) < 48 || (s.charCodeAt(i) > 57 && s.charCodeAt(i) < 65) || (s.charCodeAt(i) > 90 && s.charCodeAt(i) < 97) || s.charCodeAt(i) > 122) {
            if (s.charAt(i) != ' ') return true;
        }
        else {
            b = false;
        }
    }
    return b;
}

String.prototype._charMatch = function (s2) {
    var s2 = s2.toString().toLowerCase();
    var s1 = this.valueOf().toLowerCase();
    var size = Math.max(s1.length, s2.length);
    var count = 0;
    for (var i = 0; i < Math.min(s2.length, s1.length) ; i++) {
        if (s1.charAt(i) === s2.charAt(i)) count++;
    }
    return count / size;
}

String.prototype._stringMatch = function (s2) {
    s2 = s2.toString();
    var s1 = this.valueOf();
    var start = 0;
    var end = 1;
    var substr = "";
    var s = "";
    while (end <= s2.length) {
        if (s1._contains(s2.substring(start, end))) {
            s = s2.substring(start, end);
            end += 1
        }
        else {
            substr += s;
            s = "";
            start = end;
            end += 1;
        }
    }
    substr += s;
    var score = 0;
    if (s1.charAt(0) == s2.charAt(0)) score += 0.1;
    if (s1._last() == s2._last()) score += 0.1;
    if (s1.length == s2.length) score += (0.1);
    score += ((substr.length / ((s1.length + s2.length) / 2)) * 0.8) * this._charMatch(s2);
    return score;
}

String.prototype._looksLikeItContains = function (f) {
    var s = this.valueOf();
    var start = 0;
    var end = start + f.length;
    var maxval = 0;
    while (end <= s.length) {
        var sub = s.substring(start, end).toString();
        //console.log(sub + ' ' + sub._stringMatch(f));
        maxval = Math.max(sub._stringMatch(f), maxval);
        start++;
        end++;
    }
    return maxval;
}

String._randomText = function (count) {
    count = def(count, 7);
    var ret = "";
    for (var i = 0; i < count; i++) {
        if (Math.random() < 0.1) {
            ret += " ";
        }
        else {
            ret += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
    }
    return ret;
}

String._randomPhone = function () {
    var ret = "0";
    for (var i = 0; i < 10; i++) {
        ret += Math.floor(Math.random() * 10);
    }
    return ret;
}