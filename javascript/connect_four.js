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
      row = y;
      if($(".row" + (y+1) + ".col" + col + " .circle").hasClass("player")) break;
    }
    check_complete(col, row, current_player);
  } else {
    alert("Game is already complete! Refresh page to start a new game.");
  }
}

function check_complete(col, row, player) {
  var x = horizontal(col,row,player);
  var y = vertical(col,row,player);
  var d = angle_45(col,row,player);
  var d2 = angle_135(col,row,player);
  if(x || y || d || d2) {
    game_over = 1;
    alert("Congratulations Player " + current_player + "!");
  } else {
    current_player = (current_player == 1) ? 2 : 1;
    $(".active_player").text(current_player);
  }
}

function horizontal(col, row, player) {
  for(base = col-3; base <= col; base++) {
    if(base < 1) base = 1;
    column_to_check = base;
    if(check_horizontally(column_to_check, row, player)) return true;
  }
  return false;
}

function check_horizontally(col, row, player) {
  flag = true ;
  for(cnt = 0; cnt <= 3; cnt++) {
    start_column = col+cnt;
    to_check = $(".row" + row + ".col" + start_column + " .circle");
    if(!to_check || !to_check.hasClass("player" + current_player)) flag = false;
  }
  return flag;
}

function vertical(col, row, player) {
  for(base = row-3; base <= row; base++) {
    if(base < 1) base = 1;
    row_to_check = base;
    if(check_vertically(col, row_to_check, player)) return true;
  }
  return false;
}

function check_vertically(col, row, player) {
  flag = true ;
  for(cnt = 0; cnt <= 3; cnt++) {
    start_row = row+cnt;
    to_check = $(".row" + start_row + ".col" + col + " .circle");
    if(!to_check || !to_check.hasClass("player" + current_player)) flag = false;
  }
  return flag;
}

function angle_45(col, row, player) {
  for(base = 3; base >= 0; base--) {
    column_to_check = col-base;
    row_to_check = row-base;
    if(check_angle_45(column_to_check, row_to_check, player)) return true;
  }
  return false;
}

function check_angle_45(col, row, player) {
  flag = true ;
  for(cnt = 0; cnt <= 3; cnt++) {
    start_row = row+cnt;
    start_column = col+cnt;
    to_check = $(".row" + start_row + ".col" + start_column + " .circle");
    if(!to_check || !to_check.hasClass("player" + current_player)) flag = false;
  }
  return flag;
}

function angle_135(col, row, player) {
  for(base = 3; base >= 0; base--) {
    column_to_check = col-base;
    row_to_check = row+base;
    if(check_angle_135(column_to_check, row_to_check, player)) return true;
  }
  return false;
}

function check_angle_135(col, row, player) {
  flag = true ;
  for(cnt = 0; cnt <= 3; cnt++) {
    start_row = row-cnt;
    start_column = col+cnt;
    to_check = $(".row" + start_row + ".col" + start_column + " .circle");
    if(!to_check || !to_check.hasClass("player" + current_player)) flag = false;
  }
  return flag;
}
