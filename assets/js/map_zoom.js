var Direction = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};

var zoomLevel = 0;
var zoomLevelMin = 0;
var zoomLevelMax = 1;

var shiftKeyDown = false;
var mouseDownPoint = null;



canvas.on('mouse:down', function (options) {
    var pointer = canvas.getPointer(options.e, true);
    mouseDownPoint = new fabric.Point(pointer.x, pointer.y);
});
canvas.on('mouse:up', function (options) {
    mouseDownPoint = null;
});
canvas.on('mouse:move', function (options) {
    if (shiftKeyDown && mouseDownPoint) {
        var pointer = canvas.getPointer(options.e, true);
        var mouseMovePoint = new fabric.Point(pointer.x, pointer.y);
        canvas.relativePan(mouseMovePoint.subtract(mouseDownPoint));
        mouseDownPoint = mouseMovePoint;
        keepPositionInBounds(canvas);
    }
});
fabric.util.addListener(document.body, 'keydown', function (options) {
    if (options.repeat) {
        return;
    }
    var key = options.which || options.keyCode; // key detection
    if (key == 16) { // handle Shift key
        canvas.defaultCursor = 'move';
        canvas.selection = false;
        shiftKeyDown = true;
    } else if (key === 37) { // handle Left key
        move(Direction.LEFT);
    } else if (key === 38) { // handle Up key
        move(Direction.UP);
    } else if (key === 39) { // handle Right key
        move(Direction.RIGHT);
    } else if (key === 40) { // handle Down key
        move(Direction.DOWN);
    }
});
fabric.util.addListener(document.body, 'keyup', function (options) {
    var key = options.which || options.keyCode; // key detection
    if (key == 16) { // handle Shift key
        canvas.defaultCursor = 'default';
        canvas.selection = true;
        shiftKeyDown = false;
    }
});
jQuery('.canvas-container').on('mousewheel', function (options) {
    var delta = options.originalEvent.wheelDelta;
    if (delta != 0) {
        var pointer = canvas.getPointer(options.e, true);
        var point = new fabric.Point(pointer.x, pointer.y);
        if (delta > 0) {
            zoomIn(point);
        } else if (delta < 0) {
            zoomOut(point);
        }
    }
});

$('.canvas-container').hover(function () {
    no_scroll()
}, function () {
    return_scroll()
});

function move(direction) {
    switch (direction) {
        case Direction.LEFT:
            canvas.relativePan(new fabric.Point(-10 * canvas.getZoom(), 0));
            break;
        case Direction.UP:
            canvas.relativePan(new fabric.Point(0, -10 * canvas.getZoom()));
            break;
        case Direction.RIGHT:
            canvas.relativePan(new fabric.Point(10 * canvas.getZoom(), 0));
            break;
        case Direction.DOWN:
            canvas.relativePan(new fabric.Point(0, 10 * canvas.getZoom()));
            break;
    }
    keepPositionInBounds(canvas);
}


function zoomIn(point) {
    if (zoomLevel < zoomLevelMax) {
        zoomLevel++;
        canvas.zoomToPoint(point, Math.pow(2, zoomLevel));
        keepPositionInBounds(canvas);
    }
}

function zoomOut(point) {
    if (zoomLevel > zoomLevelMin) {
        zoomLevel--;
        canvas.zoomToPoint(point, Math.pow(2, zoomLevel));
        keepPositionInBounds(canvas);
    }
}

function keepPositionInBounds() {
    var zoom = canvas.getZoom();
    var xMin = (2 - zoom) * canvas.getWidth() / 2;
    var xMax = zoom * canvas.getWidth() / 2;
    var yMin = (2 - zoom) * canvas.getHeight() / 2;
    var yMax = zoom * canvas.getHeight() / 2;

    var point = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    var center = fabric.util.transformPoint(point, canvas.viewportTransform);

    var clampedCenterX = clamp(center.x, xMin, xMax);
    var clampedCenterY = clamp(center.y, yMin, yMax);

    var diffX = clampedCenterX - center.x;
    var diffY = clampedCenterY - center.y;

    if (diffX != 0 || diffY != 0) {
        canvas.relativePan(new fabric.Point(diffX, diffY));
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}

function scroll_control(event) {
    event.preventDefault();
}
function no_scroll(){
    document.addEventListener("mousewheel", scroll_control, {passive: false});
    document.addEventListener("touchmove", scroll_control, {passive: false});
}
function return_scroll(){
    document.removeEventListener("mousewheel", scroll_control, {passive: false});
    document.removeEventListener('touchmove', scroll_control, {passive: false});
}

//////////////////////////////////////////////////////////////////////////////////////
$('.down_size').on('click', function () {
    console.log("DOWN");
    map_zoom_scale -= 0.01;
    $('.map_canvas').css('transform-origin', '0% 0%');
    $('.map_canvas').css('transform', `scale(${map_zoom_scale},${map_zoom_scale})`);
    $('.map_canvas').css('height', `${canvas_height * map_zoom_scale}px`);
    $('.map_canvas').css('width', `${canvas_height * map_zoom_scale}px`);
});
$('.up_size').on('click', function () {
    console.log("UP")
    map_zoom_scale += 0.01;
    $('.map_canvas').css('transform-origin', '0% 0%');
    $('.map_canvas').css('transform', `scale(${map_zoom_scale},${map_zoom_scale})`);
    $('.map_canvas').css('height', `${canvas_height * map_zoom_scale}px`);
    $('.map_canvas').css('width', `${canvas_height * map_zoom_scale}px`);
});
function init_map_zoom_scale() {
    console.log("Init MAP Zoom")
    $('.map_canvas').css('transform-origin', '0% 0%');
    $('.map_canvas').css('transform', `scale(${map_zoom_scale},${map_zoom_scale})`);
    $('.map_canvas').css('height', `${canvas_height * map_zoom_scale}px`);
    $('.map_canvas').css('width', `${canvas_height * map_zoom_scale}px`);
};

//トグルボタンの状態を取得する
$("#circle").on('click', function () {
    var circle_toggle = $("#circle").prop("checked");
    //console.log("#circle : " + circle_toggle)
    if (circle_toggle) {
        canvas.getItemsByGroup("GameState").forEach(element => {
            element.show();
        });
        canvas.renderAll();
    } else {
        canvas.getItemsByGroup("GameState").forEach(element => {
            element.hide();
        });
        canvas.renderAll();
    }
});

$("#route").on('click', function () {
    var circle_toggle = $("#route").prop("checked");
    //console.log("#route : " + circle_toggle)
    if (circle_toggle) {
        canvas.getItemByName("Route").show();
        canvas.renderAll();
    } else {
        canvas.getItemByName("Route").hide();
        canvas.renderAll();
    }
});

$('input[name="tab_item"]').click(function () {
    canvas.ALLremove();//関係ない奴を削除
    positionTable_Selected_Flags.fill(false);
    var nowTab = $('input[name="tab_item"]:checked').val();
    //console.log(nowTab)
    switch (nowTab) {
        case "0":
            proc_Init();
            break;
        case "1":
            proc_Track();
            break;
        case "2":
            proc_Position();
            break;
    }
});

$(document).on('click', '.InitTable th', function () {
    var selectedTh = $(this)[0].textContent.replace("#", "");
    if ($(`#InitTable${selectedTh}`).hasClass('selectedTable')) {
        $(`#InitTable${selectedTh}`).removeClass('selectedTable');
        canvas.getItemsByGroup(`InitPosition_yajirusi${selectedTh}`).forEach(element => {
            canvas.remove(element);
        });

    } else {
        $(`#InitTable${selectedTh}`).addClass('selectedTable');
        canvas.getItemsByGroup(`InitPosition${selectedTh - 1}`).forEach(element => {
            canvas.add(new fabric.Image(yajirusi_Img, {
                left: element.left,
                top: element.top - 60,
                originX: "center",
                originY: "center",
                selectable: false,
                map_group: `InitPosition_yajirusi${selectedTh}`,
                scaleX: map_magnification,
                scaleY: map_magnification
            }));
        });
    }
});

$(document).on('click', '.TrackTable th', function () {
    var selectedTh = $(this)[0].textContent.replace("#", "");
    if ($(`#TrackTable${selectedTh}`).hasClass('selectedTable')) {
        $(`#TrackTable${selectedTh}`).removeClass('selectedTable');
        canvas.getItemsByGroup(`TrackPosition${selectedTh}`).forEach(element => {
            canvas.remove(element);
        });
    } else {
        $(`#TrackTable${selectedTh}`).addClass('selectedTable');
        drawTrackingLine(playersData[selectedTh - 1], selectedTh, team_players/*[rank - 1]*/);
    }
});

$(document).on('click', '.PositionTable th', function () {
    var selectedTh = $(this)[0].textContent.replace("#", "");
    if ($(`#PositionTable${selectedTh}`).hasClass('selectedTable')) {
        $(`#PositionTable${selectedTh}`).removeClass('selectedTable');
        positionTable_Selected_Flags[selectedTh - 1] = false;
        for (var i = 0; i < team_players[selectedTh - 1].length; i++) {
            canvas.getItemsByGroup(`Position${selectedTh - 1}_${i}`).forEach(element => {
                canvas.remove(element);
            });
        }
    } else {
        $(`#PositionTable${selectedTh}`).addClass('selectedTable');
        positionTable_Selected_Flags[selectedTh - 1] = true;
    }
    //console.log(positionTable_Selected_Flags)
});



function getMatchTime(startTime, endTime) {
    var now = new Date(endTime);
    var targetDate = new Date(startTime);
    //console.log(targetDate.toUTCString())
    //console.log(now.toUTCString())
    var diff = (now.getTime() - targetDate.getTime());
    return diff;
}

function millisToMinutesAndSeconds(milliseconds) {
    if (milliseconds >= 3600000) {
        return "0:00"
    }
    var seconds = parseInt((milliseconds / 1000) % 60, 10)
    var minutes = parseInt((milliseconds / (1000 * 60)) % 60, 10)

    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + ":" + seconds;
}