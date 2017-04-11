var doc = {
    reg1: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, //Email Regular Expression
    reg2: /^(([0-9]*?)|(0?)(\d{3}))\d{3}\d{4}$/, //Phone Number Regular Expression
    img: "",
    waitTill: function (bool, fn, interval) {
        if (!interval) interval = 500;
        var int = setInterval(function () {
            //console.log(bool);
            if (bool) {
                fn();
                clearInterval(int);
            }
        }, interval);
    },
    GET: function (url, fn) {
        $.ajax({
            url: url,   // Current Page, Method  
            data: "", // parameter map as JSON
            type: "GET", // data has to be POSTed   
            timeout: 30000,    // AJAX timeout  
            success: function (result) {
                fn(result);
            },
            error: function (xhr, status) {
                console.log("Error (" + url + "):" + status + " (submitBtn) - " + xhr.responseText);
            }
        });
    },
    POST: function (url, data, fn) {
        $.ajax({
            url: url,   // Current Page, Method  
            data: JSON.stringify(data), // parameter map as JSON
            type: "POST", // data has to be POSTed  
            contentType: "application/json", // posting JSON content      
            dataType: "JSON",  // type of data is JSON (must be upper case!)  
            timeout: 30000,    // AJAX timeout  
            success: function (result) {
                fn(result);
            },
            error: function (xhr, status) {
                console.log("Error (" + url + "):" + status + " (submitBtn) - " + xhr.responseText);
            }
        });
    },
    show: function (f) {
        document.getElementById(f).style.display = "block";
    }, //Shows the element whose ID is 'f'
    setError: function (elem) {
        elem.style.border = "1px solid red";
    },
    remError: function (elem) {
        elem.style.border = "";
    },
    setErrorById: function (elem) {
        this.setError(this.get(elem));
    },
    remErrorById: function (elem) {
        this.remError(this.get(elem));
    },
    hide: function (f) {
        document.getElementById(f).style.display = "none";
    }, //hides the element whose ID is 'f'
    redirect: function (url) {
        document.location = url;
    },
    supports_html5_storage: function () {
        try
        {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch (e)
        {
            return false;
        }
    },
    getQuery: function (val) {
        var url = document.URL.toString();
        url = url.split("#")[0];
        if (url == undefined) url = document.URL.toString();
        var s = new Array();
        try {

            s = url.split("?");
        } catch (e) {
            return undefined;
        }
        var f = new Array();
        try {

            f = s[1].split("&");
        } catch (e) {
            return undefined;
        }
        for (var i = 0; i < f.length; i++) {
            var d = f[i].split("=");
            if (d[0] == val) {
                return d[1];
            }
        }
    }, //URL Querystring Selector

    toggle: function (f) {
        if (document.getElementById(f).style.display != "none") {
            document.getElementById(f).style.display = "none";
        }
        else {
            document.getElementById(f).style.display = "block";
        }

    }, //toggles the css display property of the element whose ID is 'f'

    get: function (f) {
        var p = document.getElementById(f);
        return p;
    }, //Selects and returns a Document Element

    moveRight: function (e_id, y) {
        var x = window.getComputedStyle(document.getElementById(e_id), null).getPropertyValue("right").replace("px", "");
        var previous_X = Number(x);
        var interval = setInterval(function () {
            if (previous_X < y) {
                x = Number(x) + Number(10);
                document.getElementById(e_id).style.right = x + "px";
                if (x >= y) {
                    clearInterval(interval);
                }
            }
            else if (Number(previous_X) > Number(y)) {
                x = Number(x) - Number(10);
                document.getElementById(e_id).style.right = x + "px";
                if (x <= y) {
                    clearInterval(interval);
                }
            }

        }, 15);

    },

    moveLeft: function (e_id, y) {
        var x = window.getComputedStyle(document.getElementById(e_id), null).getPropertyValue("left").replace("px", "");
        var previous_X = Number(x);
        var interval = setInterval(function () {
            if (Number(previous_X) > Number(y)) {
                x = Number(x) - Number(10);
                document.getElementById(e_id).style.left = x + "px";
                if (x <= y) {
                    clearInterval(interval);
                }
            }
            else if (Number(previous_X) < Number(y)) {
                x = Number(x) + Number(10);
                document.getElementById(e_id).style.left = x + "px";
                if (x >= y) {
                    clearInterval(interval);
                }
            }

        }, 15);

    },

    clearArray: function (fArray) {
        for (var i = 0; i < fArray.length; i++) {
            fArray.pop();
        }
    },

    notify: function (t) {
        get("notifydiv").innerHTML = t;
        bringtoLife("notifydiv");
        return t;
    },

    bringtoLife: function (f) {
        get(f).style.display = "block";
        var interval = setInterval(function () {
            var i = get(f).style.opacity;
            get(f).style.left = "calc(100% - " + get(f).style.width + "px";
            i = i * 100;
            i += 5;
            get(f).style.opacity = (i / 100);
            if (i >= 100) {
                setTimeout(killAgain, 2000, f);
                clearInterval(interval);
            }
        }, 50);
    },

    killAgain: function (f) {
        var interval = setInterval(function () {
            var i = get(f).style.opacity;
            get(f).style.left = "calc(100% - " + get(f).style.width + "px";
            i = i * 100;
            i -= 5;
            get(f).style.opacity = (i / 100);
            if (i <= 5) {
                get(f).style.display = "none";
                clearInterval(interval);
            }
        }, 50);
    },

    getDataURL: function () {
        try {
            return get("Canvas1").toDataURL();
        } catch (e) {
            return "";
        }
    },

    getNoOfChars: function (t) {
        get("post_chars").innerHTML = Number(300 - t.value.length);
        if (t.value.length >= 250) {
            get("post_chars").style.color = "#FF5500";
        }
        else {
            get("post_chars").style.color = "black";
        }
    },

    validateIMG: function (e) {
        if (e == "") {
            //get("post_error").innerHTML = "";
            return "valid";
        }
        else if (e.toString().search(/jpeg/) == -1 && e.toString().search(/png/) == -1 && e.toString().search(/gif/) == -1) {
            //get("post_error").innerHTML = "Invalid Image";
            get("output").innerHTML = "";
            notify("Invalid Image");
            return "invalid";
        }
        else {
            //get("post_error").innerHTML = "";
            return "valid";
        }
    },

    readURL: function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;
                img.style.maxHeight = "300px";
                img.style.maxWidth = "300px";
                validateIMG(e.target.result);
                var canvas = convertImageToCanvas(img);
                output.innerHTML = "";
                output.appendChild(canvas);
            }
            reader.readAsDataURL(input.files[0]);

        }
    },

    convertImageToCanvas: function (f) {
        var canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        canvas.id = "Canvas1";
        //canvas.style.marginLeft = (150 - (get(f).clientWidth / 2)) + "px";
        canvas.getContext("2d").drawImage(f, 0, 0, 300, 300);
        return canvas;
    },

    getStates: function (state) {
        $.ajax({
            url: "image.aspx/getStates",   // Current Page, Method  
            data: JSON.stringify({ state: state }), // parameter map as JSON
            type: "POST", // data has to be POSTed  
            contentType: "application/json", // posting JSON content      
            dataType: "JSON",  // type of data is JSON (must be upper case!)  
            timeout: 10000,    // AJAX timeout  
            success: function (result) {
                if (result.d) {
                    addStates(result.d);
                }

            },
            error: function (xhr, status) {
                //$("#status").text(status + " - " + xhr.responseText);
                alert(status + " - " + xhr.responseText);
            }
        });
    },

    addStates: function (ff) {
        clearSelect(get("LGs"));
        var f1 = ff;
        //alert(f1[0]);
        for (var i = 0; i < f1.length; i++) {
            var p = document.createElement("option");
            p.innerText = f1[i];
            document.getElementById("LGs").add(p);
        }

    }, //Adds States to the LGs Control (Select)

    clearSelect: function (selectbox) {
        var i;
        for (i = selectbox.options.length - 1; i >= 0; i--) {
            selectbox.remove(i);
        }
    }, //Clears all options in a Select Control (DropDownList) except the first one
    range: function (start, end) {
        var items = [];
        for (var i = start; i <= end; i++) {
            items.push(i);
        }
        return items;
    },
    numberWithCommas: function (x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }
}