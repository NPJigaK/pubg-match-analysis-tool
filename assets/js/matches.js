/*PUBG
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getRandomApiKey(apiKeyList) {
  return apiKeyList[Math.floor(Math.random() * apiKeyList.length)];
}

async function getMatches(playersJson) {
  return await playersJson.data[0].relationships.matches.data.map(e => e.id);
}

async function selectMatchToJson(createdAt, mapName, matchType, telemetryURL) {
  let telemetryResponse = await fetch(
    telemetryURL,
    { headers: { accept: "application/json" } },
    { mode: "cors" }
  );
  let telemetryJson = await telemetryResponse.json();

  let flightPath = await getFlightPaths(telemetryJson, mapName);

  let gameStates = await getGameStates(telemetryJson);

  let json = {
    "createdAt": createdAt,
    "mapName": mapName,
    "matchType": matchType,
    "flightPath": flightPath,
    "gameStates": gameStates
  }

  // insert textarea
  txt = document.getElementById("selectMatchesJson").value + JSON.stringify(json).replace(/\r?\n/g, '') + "," + String.fromCharCode(13);
  document.getElementById("selectMatchesJson").value = txt;
  textAreaHeightSet(document.getElementById("selectMatchesJson"))
}

async function getGameStates(telemetryJson) {
  let gamecount = 1;
  let gameStateList = await telemetryJson.filter(await function (value, index) {
      if (value.gameState && value.common.isGame == gamecount) {
          gamecount++;
          return value.gameState;
      }
  });

  let gameStates = [];
  for (let i = 0; i < gameStateList.length; i++) {
      await gameStates.push({
          "x": gameStateList[i].gameState.safetyZonePosition.x /100,
          "y": gameStateList[i].gameState.safetyZonePosition.y /100,
          "radius": gameStateList[i].gameState.safetyZoneRadius /100
      })
  }

  return gameStates;
}

async function getFlightPaths(telemetryJson, mapName) {
  let flightPaths = [];

  const mapSize = PUBG_MAPS.getByValue("name", mapName).mapSize
  const flightPathMargin = mapSize / 10;

  await telemetryJson.filter(function(value, index) {
    if (value.vehicle &&value.character &&value.common.isGame >= 0.1 &&value.vehicle.vehicleType == "TransportAircraft") {
      if (calcWithinRange((value.character.location.x / 100), (mapSize - flightPathMargin), flightPathMargin) 
          && calcWithinRange((value.character.location.y / 100), (mapSize - flightPathMargin), flightPathMargin)) {
        flightPaths.push({
          x: value.character.location.x / 100,
          y: value.character.location.y / 100
        });
      }
    }
  });

  return calcfirstAndEndFlightPathJson(
    flightPaths[0],
    flightPaths[flightPaths.length - 1],
    mapSize,
    flightPathMargin
  );
}
/**
 * Make flightPath json
 * 
 * ToDo
 * @param {*} firstLocation 
 * @param {*} lastLocation 
 */
function calcfirstAndEndFlightPathJson(firstLocation, lastLocation, mapSize, flightPathMargin) {
  const ax = firstLocation.x;
  const ay = firstLocation.y;
  const bx = lastLocation.x;
  const by = lastLocation.y;

  const cx = ((bx - ax) / (by - ay)) * (flightPathMargin - ay) + ax;
  const dx = ((bx - ax) / (by - ay)) * ((mapSize - flightPathMargin) - ay) + ax;

  const cy = ((by - ay) / (bx - ax)) * (flightPathMargin - ax) + ay;
  const dy = ((by - ay) / (bx - ax)) * ((mapSize - flightPathMargin) - ax) + ay;

  let flightPathJson = { first: {}, last: {} };

  if(calcWithinRange(cx, (mapSize - flightPathMargin), flightPathMargin)){
    if(Math.abs(cx - ax) < Math.abs(cx - bx)){
      flightPathJson.first.x = cx;
      flightPathJson.first.y = flightPathMargin;
    }else{
      flightPathJson.last.x = cx;
      flightPathJson.last.y = flightPathMargin;
    }
  }
  if(calcWithinRange(cy, (mapSize - flightPathMargin), flightPathMargin)){
    if(Math.abs(cy - ay) < Math.abs(cy - by)){
      flightPathJson.first.y = cy;
      flightPathJson.first.x = flightPathMargin;
    }else{
      flightPathJson.last.y = cy;
      flightPathJson.last.x = flightPathMargin;
    }
  }
  if(calcWithinRange(dx, (mapSize - flightPathMargin), flightPathMargin)){
    if(Math.abs(dx - ax) < Math.abs(dx - bx)){
      flightPathJson.first.x = dx;
      flightPathJson.first.y = mapSize - flightPathMargin;
    }else{
      flightPathJson.last.x = dx;
      flightPathJson.last.y = mapSize - flightPathMargin;
    }
  }
  if(calcWithinRange(dy, (mapSize - flightPathMargin), flightPathMargin)){
    if(Math.abs(dy - ay) < Math.abs(dy - by)){
      flightPathJson.first.y = dy;
      flightPathJson.first.x = mapSize - flightPathMargin;
    }else{
      flightPathJson.last.y = dy;
      flightPathJson.last.x = mapSize - flightPathMargin;
    }
  }

  return flightPathJson;
}

function calcWithinRange(num, upper, lower) {
  if (lower <= num && num <= upper) {
    return true;
  }
  return false;
}

/*table
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function insertRow(table, currentTime, mapName, gameMode, rank, kills, telemetryURL, roster, id) {
  // Insert row at end of line
  let row = table.insertRow(-1);

  // Insert cell
  let cell1 = row.insertCell(-1);
  let cell2 = row.insertCell(-1);
  let cell3 = row.insertCell(-1);
  let cell4 = row.insertCell(-1);
  let cell5 = row.insertCell(-1);
  let cell6 = row.insertCell(-1);
  let cell7 = row.insertCell(-1);
  let cell8 = row.insertCell(-1);
  let cell9 = row.insertCell(-1);
  let cell10 = row.insertCell(-1);

  // Button HTML
  var BUTTON_HTML =
    '<input class="searchButton" type="button" value="MAP分析" onclick="selectMatch(this)" />';
  // Button HTML
  var CHECKBOX_HTML = '<input type="checkbox"/>'

  // Enter cell contents
  cell1.innerHTML = await GetCurrentTime(new Date(currentTime));
  cell2.innerHTML = PUBG_MAPS.getByValue("original", mapName).name;
  cell3.innerHTML = getPubgGameMode(gameMode);
  cell4.innerHTML = getGetOrdinal(rank);
  cell5.innerHTML = kills + "kills";
  cell6.innerHTML = BUTTON_HTML;
  cell7.innerHTML = telemetryURL;
  cell8.innerHTML = roster;
  cell9.innerHTML = id;
  cell10.innerHTML = CHECKBOX_HTML;

  cell7.style.display = "none";
  cell8.style.display = "none";
  cell9.style.display = "none";
}

function selectMatch(obj) {
  // Button Pressed Only Once
  obj.disabled = "true";

  // Get the row where the button was pressed
  tr = obj.parentNode.parentNode;

  // Convert selected matches to JSON for this system;
  var columnJSON = {
    "matchId": tr.cells[8].innerHTML,
    "startAt": tr.cells[0].innerHTML,
    "mapName": tr.cells[1].innerHTML,
    "gameMode": tr.cells[2].innerHTML,
    "assetURL": tr.cells[6].innerHTML,
    "roster": tr.cells[7].innerHTML
  }
  console.log(columnJSON)
  sessionStorage.setItem(`old_map_analyze`, JSON.stringify(columnJSON));

  window.location.href = '../map';
}

/*textArea
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function textAreaHeightSet(argObj) {
  // ==============================================
  //	フォーカス時の背景色リセット
  // ==============================================
  // 一旦テキストエリアを小さくしてスクロールバー（縦の長さを取得）
  argObj.style.height = "10px";
  var wSclollHeight = parseInt(argObj.scrollHeight);
  // 1行の長さを取得する
  var wLineH = parseInt(argObj.style.lineHeight.replace(/px/, ""));
  // 最低2行の表示エリアにする
  if (wSclollHeight < wLineH * 2) {
    wSclollHeight = wLineH * 2;
  }
  // テキストエリアの高さを設定する(ただし、MaxHeight以下の場合)
  if(wSclollHeight > 870){
    wSclollHeight = 870;
  }
  argObj.style.height = wSclollHeight + "px";
}

function copyTextArea(argObj){
  argObj.select();
  document.execCommand("Copy");
  alert("Text copied to clipboard")
}

/*other 
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function GetCurrentTime(date) {
  return (
    `${date.getMonth() + 1}` +
    "/" +
    `${date.getDate()}` +
    " " +
    `${getdoubleDigestNumer(date.getHours())}` +
    ":" +
    `${getdoubleDigestNumer(date.getMinutes())}`
  );
}

function getdoubleDigestNumer(number) {
  return ("0" + number).slice(-2);
}
