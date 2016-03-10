var max_columns = 7;
var max_rows = 6;
var current_player = 1;
var game_over = 0;

$(document).ready(function() {
  initialize_headers();
  initialize_tables();

  $(".header").on("click",function() {
    col = $(this).text();
    insert(col);
  });
});

function initialize_headers() {
  for(x = 1; x <= max_columns; x++) {
    $("#connect-four-container").append("<div class=\"header\">" + x + "<input class=\"column\" type=\"hidden\" value=\"" + x + "\"></div>");
  }
    $("#connect-four-container").append("<div style=\"clear:both;\"></div>");
}

function initialize_tables() {
  for(y = 1; y <= max_rows; y++) {
    for(x = 1; x <= max_columns; x++) {
        $("#connect-four-container").append("<div class=\"box col" + x + " row" + y + "\"></div>");
        $(".col" + x + ".row" + y).append("<input class=\"row\" type=\"hidden\" value=\"" + y + "\">");
        $(".col" + x + ".row" + y).append("<input class=\"player\" type=\"hidden\" value=\"" + 0 + "\">");
        $(".col" + x + ".row" + y).append("<div class=\"circle\"></div>");
    }
    $("#connect-four-container").append("<div style=\"clear:both;\"></div>");
  }
}

function insert(col) {
  if(!game_over) {
    for(y = 1; y <= max_rows; y++) {
      if(y != 1) {
        $(".row" + (y-1) + ".col" + col + " .circle").removeClass("player player" + current_player);
      }
      $(".row" + y + ".col" + col + " .circle" ).addClass("player player" + current_player);
      if($(".row" + (y+1) + ".col" + col + " .circle").hasClass("player")) break;
    }
    check_complete(col, y, current_player);
  } else {
    alert("Game is already complete! Refresh page to start a new game.");
  }
}

function check_complete(col, row, player) {
  var left = check_left(col,row,player);
  if(left) {
    game_over = 1;
    alert("Congratulations Player " + current_player + "!");
  } else {
    current_player = (current_player == 1) ? 2 : 1;
    $(".active_player").text(current_player);
  }
}

function check_left(col, row, player) {
  flag = true;
  for(cnt = 3; cnt > 0; cnt--) {
    to_check = $(".row" + row + ".col" + (col-cnt) + " .circle");
    if(!to_check || !to_check.hasClass("player" + current_player)) flag = false;
  }
  return flag;
}
