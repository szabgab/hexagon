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

    var board;

    window.onhashchange = function() {
        var hash = location.hash;
        console.log(hash);
        //show_page(hash);
        if (hash === '#editor') {
            game_editor(10, 2);
        }
        if (hash === '#example') {
            board = [
                [ ["a"], null  ],
                [ ["b"], ["c"] ]
            ];
        }
        if (hash === '#game1') {
            game_editor(10, 3);
            board[2][1] = ['a'];
            board[7][1] = ['b'];
        }
        draw_board();
    };

    function hex_corner(x, y, size, i) {
        var angle_deg = 60 * i;
        angle_deg += 30; // for pointy topped hexagon
        var angle_rad = Math.PI / 180 * angle_deg;
        return Math.round(x + size * Math.cos(angle_rad)) + ',' + Math.round(y + size * Math.sin(angle_rad));
    }


    function create_hex(x, y, size, color, board_x, board_y, drawing) {
        // coordinates are given as x,y and 0,0 is in the top-left corner
        // '<polygon class="hex" points="300,150 225,280 75,280 0,150 75,20 225,20" fill="#aa5"></polygon>';
        var hex = '<polygon class="hex" points="';
        for (var i=0; i<6; i++) {
            hex += hex_corner(x, y, size, i) + ' ';
        }
        hex += '" ';
        hex += 'style="fill:#' + color+ ';stroke:black;stroke-width:1"'
        hex += ' coord-x=' + board_x;
        hex += ' coord-y=' + board_y;
        hex += '></polygon>';
        //console.log(hex);
        cx = x;
        cy = y;
        if (drawing === "soldier") {
            hex += '<circle cx="' + cx + '" cy="' + cy + '" r="4" stroke="black" stroke-width="3" fill="black" />';
        }
        return hex;
    }

    function clicked() {
        console.log(this.attributes["coord-x"]);
        console.log(this.attributes["coord-y"]);
    }

    function draw_board() {
        if (board === null || board === undefined) {
            return;
        }
        //console.table(board);
        var x = 150;
        var y = 150;
        var size = 15;

        var board_svg = "";

        var angle_deg = 30;
        var angle_rad = Math.PI / 180 * angle_deg;
        var horizontal = 2 * size * Math.cos(angle_rad);
        var vertical   = 3 * size * Math.sin(angle_rad);

        for (var i=0; i < board.length; i++) {
            for (var j=0; j < board[i].length; j++) {
                var b = board[i][j];
                var color = neutral;
                var drawing = null;
                if (b === null) {
                    continue;
                }
                if (b[0] !== 0) {
                    color = players[ b[0] ]["color"];
                     drawing = "soldier";
                }
                board_svg += create_hex(x + i * horizontal - (j % 2) * horizontal / 2, y + j * vertical, size, color, i, j, drawing);
            }
        }
        //console.log(board_svg);

        document.getElementById("board").innerHTML = board_svg;

        var elems = document.getElementsByClassName("hex");
        //console.log(elems);
        for (var i=0; i < elems.length; i++) {
            elems[i].addEventListener('click', clicked);
        }
    }

    function game_editor(width, height) {
        board = [];
        for (var x = 0; x < width; x++) {
            board[x] = []
            for (var y = 0; y < height; y++) {
                board[x][y] = [0];
            }
        }
    }

    function load_file(file) {
        var client = new XMLHttpRequest();
        client.open('GET', file);
        client.onreadystatechange = function() {
            alert(client.responseText);
        }
        client.send();
    }

    location.hash = '';
    //console.table(board);
})();
