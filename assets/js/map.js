/*=========================================*/
function buttonInit() {
    $("#circle").button();
    $("#route").button();
}

function setnumIcons() {
    var numIcons = [, , , , ];
    for (var i = 0; i < 100; i++) {
        numIcons[i] = new Image();
        numIcons[i].crossOrigin = 'anonymous';
        numIcons[i].src = `../assets/img/map/table/number/${i + 1}.png`;
    }
    return numIcons;
}

function setnumIcons_map() {
    var numIcons_map = [, , , , ];
    for (var i = 0; i < 100; i++) {
        numIcons_map[i] = new Image();
        numIcons_map[i].crossOrigin = 'anonymous';
        numIcons_map[i].src = `../assets/img/map/canvas/number/${i + 1}_map.png`;
    }
    return numIcons_map;
}

function setmaskIcons() {
    var numIcons = [, , , , ];
    for (var i = 0; i < 100; i++) {
        numIcons[i] = new Image();
        numIcons[i].crossOrigin = 'anonymous';
        numIcons[i].src = `../assets/img/map/table/mask/${i + 1}.png`;
    }
    return numIcons;
}

function setmaskIcons_map() {
    var numIcons_map = [, , , , ];
    for (var i = 0; i < 100; i++) {
        numIcons_map[i] = new Image();
        numIcons_map[i].crossOrigin = 'anonymous';
        numIcons_map[i].src = `../assets/img/map/canvas/mask/${i + 1}_map.png`;
    }
    return numIcons_map;
}

function setyajirusi() {
    var yajirusi;
    yajirusi = new Image();
    yajirusi.crossOrigin = 'anonymous';
    yajirusi.src = `../assets/img/map/canvas/other/yajirusi.png`;
    return yajirusi;
}

function setkillIcon() {
    var killIcon = new Image();
    killIcon.src = `../assets/img/map/canvas/other/Death.png`;
    return killIcon;
}

function setendIcon_map() {
    var endIcon_map = new Image();
    endIcon_map.src = `../assets/img/map/canvas/other/end_map.png`;
    return endIcon_map;
}


/*=========================================*/
//fablicjs
fabric.Canvas.prototype.getItemByName = function(name) {
    var object = null,
        objects = this.getObjects();
    for (var i = 0, len = this.size(); i < len; i++) {
        if (objects[i].name && objects[i].name === name) {
            object = objects[i];
            break;
        }
    }
    return object;
};

fabric.Canvas.prototype.getItemsByGroup = function(group) {
    var objectList = [],
        objects = this.getObjects();
    for (var i = 0, len = this.size(); i < len; i++) {
        if (objects[i].map_group && objects[i].map_group === group) {
            objectList.push(objects[i]);
        }
    }
    return objectList;
};

fabric.Canvas.prototype.ALLremove = function() {
    objects = this.getObjects();
    var isNotarr = ["Route", "MAP", "GameState"]
    for (var i = 0, len = this.size(); i < len; i++) {
        if ((objects[i].name && isNotarr.includes(objects[i].name)) ||
            (objects[i].map_group && isNotarr.includes(objects[i].map_group))) {} else {
            canvas.remove(objects[i]);
        }
    }
    console.log("ALL remove")
};

fabric.Object.prototype.hide = function() {
    this.set({
        opacity: 0
    });
};

fabric.Object.prototype.show = function() {
    this.set({
        opacity: 1
    });
};

/*=========================================*/
function setMapImgsrc_zoomscale(map_Name) {
    switch (map_Name) {
        case "Erangel":
            mapImg.src = '../assets/img/map/maps/Erangel.jpg';
            map_magnification = 1;
            map_zoom_scale = 0.14;
            break;
        case "Erangel(classic)":
            mapImg.src = '../assets/img/map/maps/Erangel.jpg';
            map_magnification = 1;
            map_zoom_scale = 0.14;
            break;
        case "Miramar":
            mapImg.src = "../assets/img/map/maps/Miramar.jpg";
            map_magnification = 1;
            map_zoom_scale = 0.14;
            break;
        case "Sanhok":
            mapImg.src = "../assets/img/map/maps/Sanhok.jpg";
            map_magnification = 0.5;
            map_zoom_scale = 0.27;
            break;
        case "Vikendi":
            mapImg.src = "../assets/img/map/maps/Vikendi.jpg";
            map_magnification = 0.75;
            map_zoom_scale = 0.27;
            break;
        case "Karakin":
            mapImg.src = "../assets/img/map/maps/Karakin.jpg";
            map_magnification = 0.25;
            map_zoom_scale = 0.44;
            break;
    }
}

async function getMapJson(url) {
    let response = await fetch(url, {
        headers: {
            'accept': 'application/json'
        }
    }, { mode: 'cors' });
    return await response.json();
}

async function getCharacters(mapJSON) {
    let characters = await mapJSON.filter(function(value, index) {
        if (value.characters) {
            return value.characters;
        }
    });

    return characters
}

async function getPlayerTeams(characters, roster) {
    ranking = 1;
    for (var i = 0; i < characters[1].characters.length; i++) {
        if (ranking < characters[1].characters[i].ranking) {
            ranking = characters[1].characters[i].ranking
        }
    }

    roster.sort(function(a, b) {
        if (a.teamId < b.teamId) return -1;
        if (a.teamId > b.teamId) return 1;
        return 0;
    });
    resultRanking = [ranking];
    for (var i = 0; i < ranking; i++) {
        resultRanking[i] = await characters[1].characters.filter(await
            function(value, index) {
                if (value.teamId == roster[i].teamId) {
                    return value;
                }
            });
    }

    for (var i = 0; i < resultRanking.length; i++) {
        for (var j = 0; j < resultRanking[i].length; j++) {
            resultRanking[i][j] = resultRanking[i][j].name;
        }
    }
    return resultRanking;
}

//各プレイヤーのムーヴデータ
async function getPlayersData(mapJSON, playerNames) {
    var playersData = []
    for (var i = 0; i < playerNames.length; i++) {
        playersData[i] = [playerNames[i].length];
        for (var j = 0; j < playerNames[i].length; j++) {
            playersData[i][j] = await mapJSON.filter(function(value, index) {
                if ((value.character && value.character.name == playerNames[i][j] && value.common.isGame >= 0.5) ||
                    (value.killer && (value.killer.name == playerNames[i][j] || value.victim.name == playerNames[i][j]))) {
                    if (value.vehicle && (value.vehicle.vehicleType == "Parachute" || value.vehicle.vehicleType == "TransportAircraft")) {} else {
                        return value; //0番目を消す
                    }
                }
            });

        }
    }
    for (var i = 0; i < playersData.length; i++) {
        for (var j = 0; j < playersData[i].length; j++) {
            var no_Para = 0;
            for (var k = 0; k < playersData[i][j].length; k++) {
                if (playersData[i][j][k]._T == "LogParachuteLanding") {
                    no_Para = k
                    break;
                }
            }
            if (no_Para != 0) {
                playersData[i][j].splice(0, no_Para + 1);
            }
        }
    }
    return playersData;
}

async function getLocation(inLocationData, inLocationName) {
    //console.log(inLocationData)
    //console.log(inLocationName)
    var resLocationJson;
    try {
        if (inLocationData.character.location) {
            resLocationJson = {
                "location": inLocationData.character.location,
                "playerState": "character",
                "phase": inLocationData.common.isGame
            }
        }
    } catch (error) {
        try {
            if (inLocationData.killer.name == inLocationName) {
                if (inLocationData.victim.name == inLocationName) {
                    resLocationJson = {
                        "location": inLocationData.victim.location,
                        "playerState": "victim",
                        "phase": inLocationData.common.isGame
                    }
                } else {
                    resLocationJson = {
                        "location": inLocationData.killer.location,
                        "playerState": "killer",
                        "victimlocation": inLocationData.victim.location,
                        "phase": inLocationData.common.isGame
                    }
                }
            } else {
                throw new Error("飛んでけ！");
            }
        } catch (error) {
            if (inLocationData.victim.name == inLocationName) {
                resLocationJson = {
                    "location": inLocationData.victim.location,
                    "playerState": "victim",
                    "phase": inLocationData.common.isGame
                }
            }
        }
    }
    return resLocationJson;
}

function getMaxTeam(playerNames) {
    var max = 0;
    for (var i = 0; i < playerNames.length; i++) {
        if (max < playerNames[i].length) {
            max = playerNames[i].length
        }
    }
    return max;
}


/*=========draw系==============*/

async function drawInitialPoint(pd, pn) {
    var playercount = 0;
    for (var i = 0; i < pd.length; i++) {
        for (var j = 0; j < pd[i].length; j++) {
            var initLocation = await getLocation(pd[i][j][0], pn[i][j]);
            canvas.add(new fabric.Image(maskIcons_map[i], {
                objectCaching: false,
                left: initLocation.location.x / 100,
                top: initLocation.location.y / 100,
                originX: "center",
                originY: "center",
                selectable: false,
                name: `mask${i}_${j}`,
                map_group: `InitPosition${i}`,
                scaleX: map_magnification,
                scaleY: map_magnification
            }));
            canvas.add(new fabric.Image(numIcons_map[playercount++], {
                objectCaching: false,
                left: initLocation.location.x / 100,
                top: initLocation.location.y / 100,
                originX: "center",
                originY: "center",
                selectable: false,
                name: `num${i}_${j}`,
                map_group: `InitPosition${i}`,
                scaleX: map_magnification,
                scaleY: map_magnification
            }));
            //await ctx.drawImage(maskIcons_map[i], (initLocation.location.x / 100) - 40, (initLocation.location.y / 100) - 40);
            //await ctx.drawImage(numIcons_map[playercount++], (initLocation.location.x / 100) - 40, (initLocation.location.y / 100) - 40);
        }
    }
}

/*=========GameStates==============*/
async function getGameStates(mapJSON) {
    var gamecount = 1;
    gameState = await mapJSON.filter(function(value, index) {
        if (value.gameState && value.common.isGame == gamecount) {
            gamecount++;
            return value.gameState;
        }
    });
    console.log(gameState);
    return gameState;
}

async function drawGameState(gameState) {
    for (var i = 0; i < gameState.length; i++) {
        canvas.add(new fabric.Circle({
            objectCaching: false,
            radius: gameState[i].gameState.safetyZoneRadius / 100,
            fill: '',
            stroke: colors[gameState[i].common.isGame - 1],
            strokeWidth: (20 / (i + 1)) * map_magnification,
            left: gameState[i].gameState.safetyZonePosition.x / 100,
            top: gameState[i].gameState.safetyZonePosition.y / 100,
            originX: "center",
            originY: "center",
            selectable: false,
            map_group: "GameState"
        }));
        canvas.renderAll();
    }
}

/*=========route==============*/
async function getRoute(mapJSON) {
    console.log(mapJSON)
    var route = [];
    await mapJSON.filter(function(value, index) {
        if (value.vehicle && value.character && value.common.isGame >= 0.1 && value.elapsedTime < 150 && value.vehicle.vehicleType == "TransportAircraft") {
            route.push(value.character.location); //.character.location
        }
    });
    //console.log(route);
    return route;
}
async function drawRoute(route) {
    console.log(route)
    var xv = (route[route.length - 1].x / 100) - (route[1].x / 100);
    var yv = (route[route.length - 1].y / 100) - (route[1].y / 100);
    var sqrtxy = xv ^ 2 + yv ^ 2;
    var r = math.sqrt(sqrtxy);
    if (sqrtxy < 0) {
        r = r.im;
    }
    var x = (route[route.length - 1].x / 100) + xv / r * 50
    var y = (route[route.length - 1].y / 100) + yv / r * 50
        //console.log(xv + ":" + yv + ":" + r + ":" + x + ":" + y)
    canvas.add(new fabric.Line([route[1].x / 100, route[1].y / 100, x, y], {
        objectCaching: false,
        originX: "center",
        originY: "center",
        selectable: false,
        name: "Route",
        strokeWidth: 30 * map_magnification,
        stroke: 'red',
        strokeDashArray: [200, 50, 120, 50, 60, 30]
    }));
    canvas.renderAll();
}

function getPlayersCount(rank, players) {
    var playersNumber = 0;
    for (var i = 0; i < rank - 1; i++) {
        //console.log(i + "の人数" + players[i].length)
        playersNumber += players[i].length;
    }
    return playersNumber;
}

async function drawTrackingLine(playersData, rank, players) {
    var count = 1;
    var playersNumberFirst = getPlayersCount(rank, players);
    for (var i = 0; i < playersData.length; i++) {
        for (var j = 0; j < playersData[i].length - 1; j++) {

            var nowLocation = await getLocation(playersData[i][j], players[rank - 1][i]);
            var nextLocation = await getLocation(playersData[i][j + 1], players[rank - 1][i]);
            //-------------------------------


            //最初の降下地点をスタートアイコン
            if (j === 0) {
                canvas.add(new fabric.Image(maskIcons_map[rank - 1], {
                    objectCaching: false,
                    left: nowLocation.location.x / 100,
                    top: nowLocation.location.y / 100,
                    originX: "center",
                    originY: "center",
                    selectable: false,
                    map_group: `TrackPosition${rank}`,
                    scaleX: map_magnification * 1.5,
                    scaleY: map_magnification * 1.5
                }));
                canvas.add(new fabric.Image(numIcons_map[playersNumberFirst + i], {
                    objectCaching: false,
                    left: nowLocation.location.x / 100,
                    top: nowLocation.location.y / 100,
                    originX: "center",
                    originY: "center",
                    selectable: false,
                    map_group: `TrackPosition${rank}`,
                    scaleX: map_magnification * 1.5,
                    scaleY: map_magnification * 1.5
                }));
                //console.log(i + "人目初期ポイント")
            }
            /*======Main========*/
            //objectCaching:false　これ神
            canvas.add(new fabric.Line([
                nowLocation.location.x / 100,
                nowLocation.location.y / 100,
                nextLocation.location.x / 100,
                nextLocation.location.y / 100
            ], {
                objectCaching: false,
                originX: "center",
                originY: "center",
                selectable: false,
                map_group: `TrackPosition${rank}`,
                strokeWidth: map_magnification * 8, //3.5 * 
                stroke: colors[Math.floor(playersData[i][j].common.isGame)]
            }));
            /*=================*/
            if (nowLocation.playerState == "killer") {
                //canvas.add(new fabric.Line([nowLocation.location.x / 100, nowLocation.location.y / 100, nowLocation.victimlocation.x / 100, nowLocation.victimlocation.y / 100], {
                //    originX: "center",
                //    originY: "center",
                //    selectable: false,
                //    map_group: `TrackPosition${rank}`,
                //    strokeWidth: 2 * map_magnification,
                //    strokeDashArray: [5, 5],
                //    stroke: colors[Math.floor(playersData[i][j].common.isGame)]
                //}));
                //canvas.add(new fabric.Image(killIcon, {
                //    left: nowLocation.victimlocation.x / 100,
                //    top: nowLocation.victimlocation.y / 100,
                //    originX: "center",
                //    originY: "center",
                //    selectable: false,
                //    map_group: `TrackPosition${rank}`,
                //    scaleX: map_magnification,
                //    scaleY: map_magnification
                //}));

            }

            if (nowLocation.playerState == "victim") {
                canvas.add(new fabric.Image(endIcon_map, {
                    objectCaching: false,
                    left: nowLocation.location.x / 100,
                    top: nowLocation.location.y / 100,
                    originX: "center",
                    originY: "center",
                    selectable: false,
                    map_group: `TrackPosition${rank}`,
                    scaleX: map_magnification,
                    scaleY: map_magnification
                }));
                //console.log("deas")
                break;
            }

            if (nextLocation.playerState == "victim") {
                canvas.add(new fabric.Image(endIcon_map, {
                    objectCaching: false,
                    left: nextLocation.location.x / 100,
                    top: nextLocation.location.y / 100,
                    originX: "center",
                    originY: "center",
                    selectable: false,
                    map_group: `TrackPosition${rank}`,
                    scaleX: map_magnification,
                    scaleY: map_magnification
                }));
                //console.log("deas")
                break;
            } //console.log(canvas.getObjects())
        }
    }
    canvas.renderAll();
}
/*=========position==============*/
async function setPosition(addTime) {
    var thisTime = moment(START_TIME).add(addTime, "seconds").format("YYYY/MM/DD/hh:mm:ss");
    //console.log(thisTime);
    for (var i = 0; i < positionTable_Selected_Flags.length; i++) {
        if (positionTable_Selected_Flags[i]) {
            for (var j = 0; j < playersData[i].length; j++) {
                for (var k = 0; k < playersData[i][j].length; k++) {
                    var tempTime = moment(playersData[i][j][k]._D).format("YYYY/MM/DD/hh:mm:ss");
                    var ENDtempTime = moment(playersData[i][j][playersData[i][j].length - 1]._D).format("YYYY/MM/DD/hh:mm:ss");
                    var nowLocation = await getLocation(playersData[i][j][k], team_players[i][j]);
                    if (thisTime === tempTime) {
                        drawPosition(nowLocation, i, j);
                        break;
                    } else if (thisTime < tempTime) {
                        var NextTempTime = moment(moment(playersData[i][j][k + 1]._D).format("YYYY/MM/DD/hh:mm:ss"));
                        var diff = NextTempTime.utc().seconds() - moment(thisTime).utc().seconds();

                        if (diff == 0) {
                            //console.log("同じ？");
                            break;
                        } else if (diff > 0) {
                            //console.log("Over");
                            //console.log(playersData[i][j][k]);
                            //console.log(diff);
                            var NextLocation = await getLocation(playersData[i][j][k + 1], team_players[i][j]);
                            var calcLocation = {
                                "location": {
                                    "x": nowLocation.location.x + ((NextLocation.location.x - nowLocation.location.x) / diff),
                                    "y": nowLocation.location.y + ((NextLocation.location.y - nowLocation.location.y) / diff)
                                }
                            }
                            drawPosition(calcLocation, i, j);
                            break;
                        } else if (diff < 0) {
                            break;
                        }
                    }
                    if (ENDtempTime <= thisTime) {
                        canvas.getItemsByGroup(`Position${i}_${j}`).forEach(element => {
                            canvas.remove(element);
                        });
                    }
                }
            }
        }
    }
    canvas.renderAll();
};

function drawPosition(drawLocation, i, j) {
    var playersNumberFirst = getPlayersCount(i + 1, team_players);
    canvas.getItemsByGroup(`Position${i}_${j}`).forEach(element => {
        canvas.remove(element);
    });
    canvas.add(new fabric.Image(maskIcons_map[i], {
        left: drawLocation.location.x / 100,
        top: drawLocation.location.y / 100,
        originX: "center",
        originY: "center",
        selectable: false,
        map_group: `Position${i}_${j}`,
        scaleX: map_magnification,
        scaleY: map_magnification
    }));
    canvas.add(new fabric.Image(numIcons_map[playersNumberFirst + j], {
        left: drawLocation.location.x / 100,
        top: drawLocation.location.y / 100,
        originX: "center",
        originY: "center",
        selectable: false,
        map_group: `Position${i}_${j}`,
        scaleX: map_magnification,
        scaleY: map_magnification
    }));
}

/*=========HTML生成系==============*/
function resultClickTableInnsert(playerNames, maxTeam, tableClassName) {
    var html = ``;
    var cnt = 1;

    for (var i = 1; i < playerNames.length + 1; i++) {

        html += `<table class="${tableClassName}" id="${tableClassName}${i}">`

        for (var j = 0; j < maxTeam; j++) {
            if (j < playerNames[i - 1].length) {
                if (j == 0) {
                    html += `<tr> <th rowspan="${maxTeam}">#${i}</th>`
                    html += `<td><span class = "relative"><img src="../assets/img/map/table/mask/${i}.png" /><span class = "absolute"><img src="../assets/img/map/table/number/${cnt++}.png"/></span></span>${playerNames[i - 1][j]}</td></tr>`
                } else {
                    html += `<tr><td><span class = "relative"><img src="../assets/img/map/table/mask/${i}.png" /><span class = "absolute"><img src="../assets/img/map/table/number/${cnt++}.png"/></span></span>${playerNames[i - 1][j]}</td></tr>`
                }
            } else {
                html += `<tr><td>　--　</td></tr>`
            }
        }
        html += `</table>`
    }
    //console.log(html)
    return html

}

/*=========その他==============*/
var saveMAXTeamImage = async function() {
    console.log("sleep")
    for (var i = 0; i < team_players.length; i++) {
        await drawTrackingLine(playersData[i], i + 1, team_players /*[rank - 1]*/ );
        await sleep(1000);
        await saveImage()
        await sleep(1000);
        canvas.getItemsByGroup(`TrackPosition${i + 1}`).forEach(element => {
            canvas.remove(element);
        });
        await sleep(1000);
    }
}

var saveImage = function() {


    fileName = `${moment(new Date()).format("YYYY/MM/DD/hh:mm:ss")}.jpeg`;

    var base64 = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.5
    });
    // base64データをblobに変換
    var blob = Base64toBlob(base64);
    // blobデータをa要素を使ってダウンロード
    saveBlob(blob, fileName);
}

// Base64データをBlobデータに変換
function Base64toBlob(base64) {
    // カンマで分割して以下のようにデータを分ける
    // tmp[0] : データ形式（data:image/png;base64）
    // tmp[1] : base64データ（iVBORw0k～）
    var tmp = base64.split(',');
    // base64データの文字列をデコード
    var data = atob(tmp[1]);
    // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
    var mime = tmp[0].split(':')[1].split(';')[0];
    //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i);
    }
    // blobデータを作成
    var blob = new Blob([buf], { type: mime });
    return blob;
}

// 画像のダウンロード
function saveBlob(blob, fileName) {
    var url = (window.URL || window.webkitURL);
    // ダウンロード用のURL作成
    var dataUrl = url.createObjectURL(blob);
    // イベント作成
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // a要素を作成
    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    // ダウンロード用のURLセット
    a.href = dataUrl;
    // ファイル名セット
    a.download = fileName;
    // イベントの発火
    a.dispatchEvent(event);
}

/*
 * 画面操作を無効にする
 */
function lockScreen(id) {

    /*
     * 現在画面を覆い隠すためのDIVタグを作成する
     */
    var divTag = $('<div />').attr("id", id);

    /*
     * スタイルを設定
     */
    divTag.css("z-index", "999")
        .css("position", "absolute")
        .css("top", "0px")
        .css("left", "0px")
        .css("right", "0px")
        .css("bottom", "0px")
        .css("background-color", "gray")
        .css("opacity", "0.8");

    /*
     * BODYタグに作成したDIVタグを追加
     */
    $('body').append(divTag);
}

/*
 * 画面操作無効を解除する
 */
function unlockScreen(id) {

    /*
     * 画面を覆っているタグを削除する
     */
    $("#" + id).remove();
}