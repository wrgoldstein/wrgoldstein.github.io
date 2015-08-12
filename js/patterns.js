poly_path = function(hashed) {
    start = "M " + hashed[5] + " " + hashed[4] + " "
    p1 = hashed.slice(1, 3)
    p2 = hashed.slice(3, 5)

    function moveto(s) {
        return "L " + s[0] + " " + s[1]
    }

    var d = start + moveto(p1) + " " + moveto(p2)

    if (hashed[6] / 2 < .5) {
        d = d + " L 5 5" // back to the center
    }
    d = d + " z"
    return d
}

function hue(hashed) {
    t = hashed.slice(3, 6)
    return Number(t) % 360
}

lightness = function(hashed) {
    if (hashed[5] % 2 == 0) {
        return "30%"
    } else {
        return "80%"
    }
}

add_poly_pattern = function(hashed) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", poly_path(hashed))
    hsl = "hsl(" + hue(hashed) + "," + "80%," + lightness(hashed) + ")"
    path.setAttribute("fill", hsl)
    pats.appendChild(path)
    return path
}

update = function(s) {
    hashed = hashf(s)

    while (pats.firstChild){
        pats.removeChild(pats.firstChild)
    } // kill current patterns

    add_poly_pattern(hashed)
    hashed = hashf(hashed)
    add_poly_pattern(hashed)
    hashed = hashf(hashed)
    add_poly_pattern(hashed)
    hashed = hashf(hashed)
    add_poly_pattern(hashed)
    hashed = hashf(hashed)
    add_poly_pattern(hashed)
    hashed = hashf(hashed)
    add_poly_pattern(hashed)
    hashed = hashf(hashed)
    add_poly_pattern(hashed)
    hashed = hashf(hashed)
    add_poly_pattern(hashed)
    hashed = hashf(hashed)

    draw()
};

draw = function(){
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("fill", "url(#pats)")
    rect.setAttribute("width", 600)
    rect.setAttribute("height", 300)


    svg = document.getElementById("svg")
    old_rect = svg.getElementsByTagName("rect")[0]
    svg.removeChild(old_rect)
    svg.appendChild(rect)
}

hashf = function(s) {
    sha = CryptoJS.SHA1(s).toString()
    sha = sha.replace(/[a-n]/g, "0")
    sha = sha.replace(/[n-z]/g, "9") // priviledge corners
    return sha
}
