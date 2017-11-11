(function() {
    var players = {
       "a" : {
           "color" : "aa5"
       },
       "b" : {
          "color" : "0a5"
       },
       "c" : {
          "color" : "a05"
       }
    };
    var neutral = "aaa";

    var board_data = [];

    window.onhashchange = function() {
        var hash = location.hash;
        console.log(hash);
        //show_page(hash);
        if (hash === '#editor') {
            game_editor();
        }
        if (hash === '#example') {
            board_data = [
               [0, 0, "a"],
               [1, 0, "b"],
               [1, 1, "c"]
            ];
        }
        draw_board();
    };

    function hex_corner(x, y, size, i) {
        var angle_deg = 60 * i;
        angle_deg += 30; // for pointy topped hexagon
        var angle_rad = Math.PI / 180 * angle_deg;
        return Math.round(x + size * Math.cos(angle_rad)) + ',' + Math.round(y + size * Math.sin(angle_rad));
    }


    function create_hex(x, y, size, color) {
        // coordinates are given as x,y and 0,0 is in the top-left corner
        // '<polygon class="hex" points="300,150 225,280 75,280 0,150 75,20 225,20" fill="#aa5"></polygon>';
        var hex = '<polygon class="hex" points="';
        for (var i=0; i<6; i++) {
            hex += hex_corner(x, y, size, i) + ' ';
        }
        hex += '" ';
        hex += 'style="fill:#' + color+ ';stroke:black;stroke-width:1"'
        hex += '></polygon>';
        //console.log(hex);
        return hex;
    }

    function clicked() {
        console.log(this);
    }

    function draw_board() {
        var x = 150;
        var y = 150;
        var size = 15;

        var board = "";

        var angle_deg = 30;
        var angle_rad = Math.PI / 180 * angle_deg;
        var horizontal = 2 * size * Math.cos(angle_rad);
        var vertical   = 3 * size * Math.sin(angle_rad);

        for (var i=0; i < board_data.length; i++) {
            var b = board_data[i];
            var color = neutral;
            if (b[2] !== 0) {
                color = players[ b[2] ]["color"];
            }
            board += create_hex(x + b[0] * horizontal - (b[1] % 2) * horizontal / 2, y + b[1] * vertical, size, color);
        }

        document.getElementById("board").innerHTML = board;

        var elems = document.getElementsByClassName("hex");
        //console.log(elems);
        for (var i=0; i < elems.length; i++) {
            elems[i].addEventListener('click', clicked);
        }
    }

    function game_editor() {
        var max_width = 10;
        var max_height = 2;
        board_data = [];
        for (var x = 0; x < max_width; x++) {
            for (var y = 0; y < max_height; y++) {
                 board_data.push([x, y, 0])
            }
        }
    }

    location.hash = '';
    //console.table(board_data);
})();
