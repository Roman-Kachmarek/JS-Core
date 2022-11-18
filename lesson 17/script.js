$(function () {
  let time = 60;
  let timer;

  // all buttons

  $("#start_button").click(function () {
    console.log("start");
    $(this).attr("disabled", "true");
    $(this).addClass("disable");
    $("#check_button").removeAttr("disabled");
    $("#check_button").removeClass("disable");
    $("#new_button").attr("disabled", "true");
    $("#new_button").addClass("disable");
    timer = setInterval(timerStart, 1000);
  });

  $("#check_button").click(function () {
    $("body").css({
      backgroundColor: "#9e9e9d",
    });
    $(".message").fadeIn(100);
    $(".message").animate({
      marginTop: "70px",
    });
  });

  $("#new_button").click(function () {
    pictureField();
    time = 60;
    $(".timing").text("01:00");
    $("#start_button").removeAttr("disabled");
    $("#start_button").removeClass("disable");
  });

  $(".none_button").click(function () {
    $(".message").animate({
      marginTop: "0px",
    });

    $(".message").fadeOut(100);
    $("body").css({
      backgroundColor: "white",
    });
  });

  $(".checker_button").click(function () {
    $(".message").hide();
    if (puzzleChecker() == 16) {
      $(".good").fadeIn(100);
      $(".good").animate({
        marginTop: "70px",
      });
      $("body").css({
        backgroundColor: "#9e9e9d",
      });
      $(".none_button2").click(function () {
        clearTimeout(timer);
        $("body").css({
          backgroundColor: "white",
        });
        $(".good").animate({
          marginTop: "0px",
        });
        $(".good").fadeOut(100);
        $("#check_button").attr("disabled", "true");
        $("#check_button").addClass("disable");
        $("#new_button").removeAttr("disabled", "true");
        $("#new_button").removeClass("disable");
      });
    } else {
      $(".wrong").fadeIn(100);
      $(".wrong").animate({
        marginTop: "70px",
      });
      $("body").css({
        backgroundColor: "#9e9e9d",
      });
      $(".none_button2").click(function () {
        clearTimeout(timer);
        $("body").css({
          backgroundColor: "white",
        });
        $(".wrong").animate({
          marginTop: "0px",
        });
        $(".wrong").fadeOut(100);
        $("#check_button").attr("disabled", "true");
        $("#check_button").addClass("disable");
        $("#new_button").removeAttr("disabled", "true");
        $("#new_button").removeClass("disable");
      });
    }
  });

  // functions
  function pictureField() {
    let check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let position;
    for (let i = 0; i < 16; i++) {
      $(".left-box>.puzzle_col").attr("value");
      $(".right-box>.puzzle_col").removeAttr("value");
      do {
        position = Math.round(Math.random() * 15);
      } while (check[position]);
      $(`.puzz:eq(${i})`).attr("value", `${position + 1}`);
      $(`.left-box>.puzzle_col:eq(${i})`).append($(`.puzz:eq(${i})`));
      check[position] = 1;
    }
  }
  function timerStart() {
    $(".timing").text(--time > 9 ? `00:${time}` : `00:0${time}`);
    if (!time) {
      clearInterval(timer);
      $(".wrong").fadeIn(100);
      $(".wrong").animate({
        marginTop: "70px",
      });
      $(".none_button2").click(function () {
        $(".wrong").animate({
          marginTop: "0px",
        });
        $(".wrong").fadeOut(100);
        $("#new_button").removeAttr("disabled", "true");
        $("#new_button").removeClass("disable");
        $("#check_button").attr("disabled", "true");
        $("#check_button").addClass("disable");
      });
    }
  }

  $(".puzz").css({
    "background-image": "url(./pics/mashine.png)",
  });
  $(".puzzle_col").sortable({
    connectWith: ".puzzle_col",
    delay: 500,
    containment: ".puzzle-box",
  });
  pictureField();

  function puzzleChecker() {
    let result = 0;
    for (let i = 0; i < 16; i++) {
      if ($(`.right-box>.puzzle_col:eq(${i})>.puzz`).attr("value") == i + 1) {
        result++;
      }
    }
    return result;
  }
});
