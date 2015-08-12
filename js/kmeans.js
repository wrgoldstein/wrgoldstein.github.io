var k = 3,
    width = 600,
    height = 300;
var cross = d3.svg.symbol().type("cross");
var color = d3.scale.category10();
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)



var circle_data = [];

function generator() {
    var mu_x = Math.random() * width * .8 + .1 * width,
        mu_y = Math.random() * height * .8 + .1 * height,
        s = height / 20,
        g_x = d3.random.normal(mu_x, s)
    g_y = d3.random.normal(mu_y, s)
    return function() {
        circle_data.push([g_x(), g_y(), k + 1])
    }
}

d3.range(k).map(function() {
    d3.range(40).map(generator())
})

centroid_data = d3.range(k).map(function() {
    return [
        50 + Math.random() * .8 * width,
        50 + Math.random() * .8 * height
    ]
})

var circles = svg.selectAll("circle")
    .data(circle_data)
    .enter()
    .append("circle")
    .attr("r", 7)
    .attr("cx", function(d) {
        return d[0];
    })
    .attr("cy", function(d) {
        return d[1];
    })
    .style("fill", "darkgrey")
    .style("stroke", "gainsboro")

var centroids = svg.append("g")
    .selectAll("path")
    .data(centroid_data);

centroids
    .enter()
    .append("path")
    .attr("transform", function(d) {
        return "translate(" + d[0] + "," + d[1] + ")";
    })
    .attr("d", cross)
    .attr("width", 100)
    .style("stroke", "black")
    .style("fill", function(d, i) {
        return color(i)
    })

Array.prototype.equals = function(array) {
    x = Math.abs(this[0] - array[0]) < .01
    y = Math.abs(this[1] - array[1]) < .01
    if (x && y) {
        return true
    }
    return false
}

function euclidean_distance(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
}

function change_centroids() {
    var steady = true;

    function centroid_from_data(data) {
        var x = y = i = 0;
        data.forEach(function(e) {
            x += e[0]
            y += e[1]
            i++
        })
        return [x / i, y / i]
    }

    centroid_data.forEach(function(e, i, a) {
        d = circle_data.filter(function(d) {
            return d[2] == i
        })
        if (d.length > 1) {
            var new_centroid = centroid_from_data(d)
            if (!a[i].equals(new_centroid)) {
                steady = false
            }
            a[i] = new_centroid
        } else {
            a[i] = [
                50 + Math.random() * .8 * width,
                50 + Math.random() * .8 * height
            ]
            steady = false
        }
    })

    centroids.data(centroid_data);
    centroids
        .transition()
        .duration(500)
        .attr("transform", function(d) {
            return "translate(" + d[0] + "," + d[1] + ")";
        })

    membership_lines()

    return steady
}


function update_membership() {
    circle_data.forEach(function(e, i, a) {
        var distances = centroid_data.map(function(c, i) {
            res = euclidean_distance(e, c)
            return res
        })
        var new_group = distances.indexOf(Math.min.apply(Math, distances));
        if (e[2] != new_group) {
            a[i] = [e[0], e[1], new_group]
        }
    })
}


function membership_lines() {
    var lines = svg.selectAll("line").data(circle_data)

    lines.enter()
        .append("line")
        .attr("x1", function(d) {
            return d[0]
        })
        .attr("y1", function(d) {
            return d[1]
        })
        .attr("x2", function(d) {
            return d[0]
        })
        .attr("y2", function(d) {
            return d[1]
        })

    lines.transition().duration(500)
        .attr("x2", function(d) {
            if (d[2] <= k) {
                return centroid_data[d[2]][0]
            }
            return d[0]
        })
        .attr("y2", function(d) {
            if (d[2] <= k) {
                return centroid_data[d[2]][1]
            }
            return d[1]
        })
        .attr("stroke", function(d) {
            return color(d[2])
        })
}

function step() {
    update_membership();
    membership_lines();
    setTimeout(function() {
        done = change_centroids()
        if (done) {
            clearInterval(loop)
        }
    }, 500)
}

loop = setInterval(step, 1000)
