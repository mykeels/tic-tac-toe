function tryAdd(arr, obj, prop1, prop2) {
    if (!arr.contains(prop2, prop1)) {
        arr.add(obj);
    }
    else {
        arr[arr.indexOfProp(prop2, prop1)] = obj;
    }
}

function syncArrays(collector, giver, prop) {
    for (var i = 0; i < giver.length; i++) {
        var g = giver[i];
        tryAdd(collector, g, prop, g[prop]);
    }
}


function createEvent(name, obj) {
    var evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
    evt.data = obj;
    dispatchEvent(evt);
}

/*adds an item into array*/
Array.prototype.add = function (item) {
    var arr = this;
    arr.push(item);
    return arr;
}

/*adds an item into the array, if the array does not already have 
    an item whose [arrprop] property matches itemval*/
Array.prototype.addif = function (item, arrprop, itemval) {
    var arr = this;
    if (!arr.contains(arrprop, itemval)) {
        arr.add(item);
    }
    else {
        var matches = arr.selectWhere(arrprop, itemval);
        if (matches.count() > 0) matches[0] = item;
    }
    return arr;
}

/*adds a range of items. Usage: arr.addRange([0, 1, 2, 3])*/
Array.prototype.addRange = function (arrs) {
    var arr = this;
    for (var i = 0; i < arrs.length; i++) {
        arr.add(arrs[i]);
    }
    return arr;
}

/*Gets the first item in the array, or first range of items. Usage: arr.first() or arr.first(count)*/
Array.prototype.first = function (count) {
    var arr = this.valueOf();
    if (count == undefined) {
        if (arr.length > 0) {
            return arr[0];
        }
        else return {};
    }
    else {
        var ret = [];
        for (var i = 0; i < Math.min(count, arr.count()); i++) {
            ret.add(arr[i]);
        }
        return ret;
    }
}

//Gets the last item in the array, or last range of items. Usage: arr.last() or arr.last(count)
Array.prototype.last = function (count) {
    var arr = this;
    if (count == undefined) {
        if (arr.length > 0) {
            return arr[arr.length - 1];
        }
        return {};
    }
    else {
        var ret = [];
        for (var i = Math.max(arr.length - count, 0); i < arr.length; i++) {
            ret.add(arr[i]);
        }
        return ret;
    }
}

/*Gets a sub-array with items whose specified property match a specified value. Usage: arr.selectWhere(property as string, value to match).
*Can be chained. E.g. arr.selectWhere(prop, val).selectWhere(prop1, val1).selectWhere(prop2, val2)
*/
Array.prototype.selectWhere = function (prop, val) {
    var arr = this;
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] == val) {
            ret.add(arr[i]);
        }
    }
    return ret;
}

Array.prototype.where = function (prop, val) {
    var arr = this;
    return arr.selectWhere(prop, val);
}

/*Gets a sub-array where properties have values specified
*Usage: arr.selectWheres([ { prop: "name", val: "michael" }, { prop: "sex", val: "male" } ])
*Note: You could use Chained selectWhere instead.
*/
Array.prototype.selectWheres = function (prop_vals) {
    var arr = this;
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        var b = true;
        for (var j = 0; j < prop_vals.length; j++) {
            var prop = prop_vals[j].prop;
            var val = prop_vals[j].val;
            if (arr[i][prop] != val) {
                b = false;
            }
        }
        if (b) {
            ret.add(arr[i]);
        }
    }
    return ret;
}

/*Returns a sub array with items that meet a specified condition provided in a function
*Usage: arr.selectByFunction(function (i) {
*                               if (arr[i].price <= 500) { return arr[i]; }
*                            });
*Note that you should always return the sub item if you want it to be in the sub array
*You could also use this as an iterator in place of a for / foreach loop.
*/
Array.prototype.selectByFunction = function (condition) {
    var arr = this;
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        if (condition(i)) {
            ret.add(arr[i]);
        }
    }
    return ret;
}

/*Performs bubble sort on an array
*Usage: arr.sort() or arr.sort("asc"): sorts in ascending order.
*Usage: arr.sort("desc"): sorts in descending order.
*Note: For best performance, use on primitive types only
*/
Array.prototype.sort = function (type) {
    var arr = this;
    var swapped;
    do {
        swapped = false;
        var b;

        for (var i = 0; i < arr.length - 1; i++) {
            if (type == undefined || type == "asc") b = arr[i] > arr[i + 1];
            else b = arr[i] < arr[i + 1];
            if (b) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    }
    while (swapped);
    return arr;
}

/*Performs insertion sort on an array
*Usage: arr.sort()
*Note: Much faster than bubble sort. To be used on very large arrays. A bit annoying to debug tho
*/
Array.prototype.isort = function (type) {
    var arr = this.valueOf();
    if (arr.length > 1) {
        arr.push(arr[0]);
    }
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        var index = 0;
        var finished = true;
        for (var j = 1; j < ret.length; j++) {
            if (ret[j] >= arr[i]) {
                index = j;
                finished = false;
                break;
            }
            else finished = false;
        }
        if (ret.length === 0) ret.push(arr[i]);
        else if (index === 0 || finished == true) ret.push(arr[i]);
        else ret = ret.insert(arr[i], index);
    }
    if (ret.length > 1) {
        var first = ret[0];
        ret = ret.splice(1, ret.length - 1);
    }
    return ret;
}

/*Performs binary search on a sorted array and returns index of found item
*Usage: arr.bsearch(5)
*/
Array.prototype.bsearch = function (item) {
    var arr = this.valueOf();
    if (arr.length == 0) return -1
    else {
        var start = 0;
        var end = arr.length - 1;
        while (start < end) {
            var mid = Math.floor(Number(start + end) / 2);
            if (item < arr[mid]) {
                end = mid;
            }
            else if (item > arr[mid]) {
                start = mid;
            }
            else {
                return mid;
            }
        }
        console.log(arr[start]);
        console.log(start);
        if (item == arr[start]) return start;
        else return -1;
    }
}

/*Sort by array_item property. type could be empty (undefined) or 'asc' or 'desc'
* Sorts an array by a specific property.
* Usage: arr.sortBy(property)
* Usage: arr.sortBy(property, "asc")
* Usage: arr.sortBy(property, "desc")
*/
Array.prototype.sortBy = function (prop, type) {
    var arr = this;
    var swapped;
    do {
        swapped = false;

        for (var i = 0; i < arr.length - 1; i++) {
            var b;
            if (type == undefined || type == "asc") b = arr[i][prop] > arr[i + 1][prop];
            else b = arr[i][prop] < arr[i + 1][prop];
            if (b) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    }
    while (swapped);
}

/*returns boolean whether the array is sorted or not
*Usage: arr.isSorted() or arr.isSorted("asc")
*Usage: arr.isSorted("desc")
*/
Array.prototype.isSorted = function (type) {
    var arr = this;
    for (var i = 1; i < arr.length; i++) {
        var b;
        if (type == undefined || type == "asc") b = arr[i] < arr[i - 1];
        else b = arr[i] > arr[i - 1];
        if (b) {
            return false;
        }
    }
    return true;
}

/*inserts into an index
*Usage: arr.insert(5, 2);
*/
Array.prototype.insert = function (item, index) {
    var ret = [];
    var arr = this;
    if (index == undefined) {
        arr.push(item);
        return arr;
    }
    if (index > arr.count() - 1) return arr;
    for (var i = 0; i < index; i++) {
        ret.add(arr[i]);
    }
    ret.add(item);
    for (var i = index; i < arr.length; i++) {
        ret.add(arr[i]);
    }
    arr.clear();
    arr = ret;
    return ret;
}

/*clears the array
*Usage: arr.clear();
*/
Array.prototype.clear = function () {
    var arr = this;
    while (arr.count() > 0) {
        arr.pop();
    }
}

//returns number of items in array. same as array.length. Usage: arr.count()
Array.prototype.count = function () {
    var arr = this;
    return this.length;
}

/*returns index of an arrayitem where arrayitem's property is equal to item. Similar to arr.contains(item, prop)
*Usage: arr.indexOfProp("michael", "name");
*/
Array.prototype.indexOfProp = function (item, prop) {
    var arr = this;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] == item) {
            return i;
        }
    }
    return -1;
}

//get array item at index
Array.prototype.getAt = function (index) {
    var arr = this;
    for (var i = 0; i < arr.length; i++) {
        if (i == index) return arr[i];
    }
    return undefined;
}

//returns boolean showing whether array contains an item, or if one of its properties (arr[i].prop) is equal to item
Array.prototype.contains = function (item, prop) {
    var arr = this;
    if (prop == undefined || prop == null) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == item) {
                return true;
            }
        }
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] == item) return true;
        }
    }
    return false;
}

//makes items distinct
Array.prototype.distinct = function (prop) {
    var arr = this.valueOf();
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        var b;
        if (prop == undefined) b = !ret.contains(arr[i]);
        else b = !ret.contains(arr[i][prop], prop);
        if (b) {
            ret.push(arr[i]);
        }
    }
    return ret;
}

//removes an item by either itself or its property
Array.prototype.remove = function (item, prop) {
    var arr = this;
    var x = 0;
    var ret = [];
    if (prop == undefined || prop == null) {
        for (var i = 0; i < arr.count() ; i++) {
            if (arr[i] != item) {
                ret.push(arr[i]);
            }
        }
    }
    else {
        for (var i = 0; i < arr.count() ; i++) {
            if (arr[i][prop] != item) {
                ret.push(arr[i]);
            }
        }
    }
    arr.clear();
    arr.addRange(ret);
}

//Removes an item at an index of the array
Array.prototype.removeAt = function (index) {
    var arr = this;
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        if (i != index) {
            ret.add(arr[i]);
        }
    }
    arr.clear();
    arr.addRange(ret);
    return arr;
}

//Shuffles the items in an Array
Array.prototype.shuffle = function () {
    var arr = this.valueOf();
    var ret = [];
    while (ret.length < arr.length) {
        var x = arr[Math.floor(Number(Math.random() * arr.length))];
        if (!(ret.indexOf(x) >= 0)) ret.push(x);
    }
    return ret;
}

/*Creates a new Array using an existing one. Could be used to clone an array.
*Usage: [].create([0, 1, 2, 3])
*/
Array.prototype.create = function (items) {
    var ret = [];
    for (var i = 0; i < items.length; i++) {
        ret.add(items[i]);
    }
    return ret;
}

/*Returns an array of items consisting of all numbers starting from Number(start) till and including Number(end)*/
Array.prototype.range = function (start, end) {
    var arr = this;
    var ret = [];
    for (var i = start; i <= end; i++) {
        ret.add(i);
    }
    return ret;
}

Array.prototype.select = function (prop) {
    var arr = this;
    var ret = [];
    arr.selectByFunction(function (i) {
        ret.push(arr[i][prop]);
    });
    return ret;
}

Array.prototype.isEmpty = function () {
    return this.length == 0;
}

Array.prototype.each = function (fn) {
    var arr = this;
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i]);
    }
    return arr;
}

Array.prototype.flatten = function () {
    var arr = this.valueOf();
    var ret = [];
    arr.each(function (item) {
        if (Array.isArray(item)) {
            item.each(function (itm) {
                ret.add(itm);
            });
        }
        else {
            ret.add(item);
        }
    });
    arr.clear();
    arr = [].create(ret);
    return arr;
}

Array.prototype.string = function (place) {
	var arr = this;
	var str = "";
	arr.each(function (item) {
	str += item + place;
});
return str;
}

Array.prototype.average = function () {
    var arr = this;
    var total = 0;
    arr.each(function (item) {
        if (Number(item)) total += Number(item);
    });
    return total / arr.count();
}

Array.prototype.paginate = function (maxsize) {
    if (!maxsize) maxsize = 10;
    var arr = this;
    var ret = [];
    var i = 0;
    var ret_i = [];
    arr.each(function (item) {
        if (i < maxsize) {
            ret_i.add(item);
            i += 1;
        }
        else {
            ret.add([].create(ret_i));
            ret_i.clear();
            ret_i.add(item);
            i = 1;
        }
    });
    if (!ret_i.isEmpty()) {
        ret.add([].create(ret_i));
    }
    return ret;
}

Array.prototype.min = function () {
    var arr = this;
    var min = arr.first();
    if (arr.count() > 0) {
        arr.each(function (item) {
            min = item < min ? item : min;
        });
        return min;
    }
    return undefined;
}

Array.prototype.max = function () {
    var arr = this;
    var max = arr.first();
    if (arr.count() > 0) {
        arr.each(function (item) {
            max = item > max ? item : max;
        });
        return max;
    }
    return undefined;
}

Array.prototype.random = function (count) {
    var arr = this.valueOf();
    if (count && Number.isSafeInteger(count)) {
        for (var i = 0; i < count; i++) {
            return arr.shuffle().first(count);
        }
    }
    else {
        return arr.shuffle().first();
    }
}