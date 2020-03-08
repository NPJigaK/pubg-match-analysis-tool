function record_img_download() {
    html2canvas(document.getElementById("reslutTable")).then(function(canvas) {
        downloadImage(canvas.toDataURL()) // base64形式で描画内容を出力する
    });
}

function downloadImage(data) {
    var today = new Date();
    var fname = `${name+"_"+today.getMonth()+"_"+today.getDate()+"_"+today.getMonth()+"_"+today.getHours()+"_"+today.getMinutes()+"_"+today.getSeconds()}.png`;
    var encdata = atob(data.replace(/^.*,/, ''));
    var outdata = new Uint8Array(encdata.length);
    for (var i = 0; i < encdata.length; i++) {
        outdata[i] = encdata.charCodeAt(i);
    }
    var blob = new Blob([outdata], ["image/png"]);

    if (window.navigator.msSaveBlob) {
        //IE用
        window.navigator.msSaveOrOpenBlob(blob, fname);
    } else {
        //それ以外？
        document.getElementById("getImage").href = data; //base64そのまま設定
        document.getElementById("getImage").download = fname; //ダウンロードファイル名設定
        document.getElementById("getImage").click(); //自動クリック
    }
}

/*=====================================*/

function orgRound(value, base) {
    return (Math.round(value * base) / base).toFixed(2);
}
async function getplayertabls(playerrecords, name) {
    var myplaydata = await playerrecords.filter(function(item, index) { if (item.name.indexOf(name) >= 0) return true; });
    var html = `<p><h2>${name}</h2><strong>試合数 : ${myplaydata[0].count}</strong><span>　※ヒット比率は複雑なアルゴリズムで解析しているため少し時間が掛かりますが、確実に表示されます。</span></p>`;

    html += `
    <table>
    <thead>
      <tr>
        <th scope="col">キル-Ave</th>
        <th scope="col">ノックアウト-Ave</th>
        <th scope="col">アシスト-Ave</th>
        <th scope="col">ダメージ-Ave</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="キル-Ave">${orgRound(myplaydata[0].kills, 100)}</td>
        <td data-label="ノックアウト-Ave">${orgRound(myplaydata[0].DBNOs, 100)}</td>
        <td data-label="アシスト-Ave">${orgRound(myplaydata[0].assists, 100)}</td>
        <td data-label="ダメージ-Ave">${orgRound(myplaydata[0].damageDealt, 100)}</td>
      </tr>
    </tbody>
  </table>
  <table>
    <thead>
      <tr>
        <th scope="col">キル-Max</th>
        <th scope="col">キル-LongShot</th>
        <th scope="col">生存時間-Ave</th>
        <th scope="col">リバイブ-Sum</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="キル-Max">${myplaydata[0].maxkills}</td>
        <td data-label="キル-LongShot">${orgRound(myplaydata[0].longestKill, 100)}m</td>
        <td data-label="生存時間-Ave">${secondToMinutesAndSeconds(myplaydata[0].timeSurvived)}</td>
        <td data-label="リバイブ-Sum">${orgRound(myplaydata[0].revives, 100)}回</td>
      </tr>
    </tbody>
  </table>
  <table>
    <thead>
      <tr>
        <th scope="col">偏差値</th>
        <th scope="col">徒歩移動距離-Ave</th>
        <th scope="col">車両移動距離-Ave</th>
        <th scope="col">水泳移動距離-Ave</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="偏差値">${orgRound(myplaydata[0].numdeviation, 100)}pt</td>
        <td data-label="徒歩移動距離-Ave">${orgRound(myplaydata[0].walkDistance, 100)}m</td>
        <td data-label="車両移動距離-Ave">${orgRound(myplaydata[0].rideDistance, 100)}m</td>
        <td data-label="水泳移動距離-Ave">${orgRound(myplaydata[0].swimDistance, 100)}m</td>
      </tr>
    </tbody>
  </table>
  <table>
    <thead>
      <tr>
        <th scope="col">回復利用-Ave</th>
        <th scope="col">ブースト利用-Ave</th>
        <th scope="col">車両キル-Sum</th>
        <th scope="col">チームキル-Sum</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="回復利用-Ave">${orgRound(myplaydata[0].heals, 100)}回</td>
        <td data-label="ブースト利用-Ave">${orgRound(myplaydata[0].boosts, 100)}回</td>
        <td data-label="車両キル-Sum">${myplaydata[0].roadKills}</td>
        <td data-label="チームキル-Sum">${myplaydata[0].teamKills}</td>
      </tr>
    </tbody>
  </table>`

    return html;
}
async function getresluttabls(recordData) {
    //var myplaydata = await playerrecords.filter(function (item, index) { if (item.name.indexOf(name) >= 0) return true; });
    //var myrecorddata = await recordData.ssetDaata.filter(function (item, index) { if (item.name.indexOf(name) >= 0) return true; });
    var myrecorddata = recordData.assetData;
    var damageReasonNum = 0;


    var damageReasonNum = 0;
    for (var i = 0; i < myrecorddata.damageReason.length; i++) {
        damageReasonNum += myrecorddata.damageReason[i];
    }
    var html =
        `<table>
    <thead>
      <tr>
        <th scope="col">投擲-スモーク-Sum</th>
        <th scope="col">投擲-グレネード-Sum</th>
        <th scope="col">投擲-火炎瓶-Sum</th>
        <th scope="col">投擲-フラッシュバン-Sum</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="投擲-スモーク-Sum">${myrecorddata.throwItem[0]/*orgRound(myrecorddata.throwItem[0] / myrecorddata.count, 100)*/}回</td>
        <td data-label="投擲-グレネード-Sum">${myrecorddata.throwItem[1]/*orgRound(myrecorddata.throwItem[1] / myrecorddata.count, 100)*/}回</td>
        <td data-label="投擲-火炎瓶-Sum">${myrecorddata.throwItem[2]/*orgRound(myrecorddata.throwItem[2] / myrecorddata.count, 100)*/}回</td>
        <td data-label="投擲-フラッシュバン-Sum">${myrecorddata.throwItem[3]/*orgRound(myrecorddata.throwItem[3] / myrecorddata.count, 100)*/}回</td>
      </tr>
    </tbody>
  </table>
  <table>
    <thead>
      <tr>
      　<th scope="col">総ヒット数</th>
        <th scope="col">ヒット比率-頭</th>
        <th scope="col">ヒット比率-胴体</th>
        <th scope="col">ヒット比率-腰</th>
        <th scope="col">ヒット比率-腕</th>
        <th scope="col">ヒット比率-足</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="総ヒット数">${damageReasonNum}発</td>
        <td data-label="ヒット比率-頭">${orgRound(myrecorddata.damageReason[0] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-胴体">${orgRound(myrecorddata.damageReason[1] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-腰">${orgRound(myrecorddata.damageReason[2] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-腕">${orgRound(myrecorddata.damageReason[3] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-足">${orgRound(myrecorddata.damageReason[4] / damageReasonNum * 100, 100)}%</td>
      </tr>
    </tbody>
  </table>`
    return html;
}

async function getweaptabls(recordData) {
    var weapJSON = [{ "weapName": "dammy" }];
    var weaponReason = recordData.assetData.weaponReason;
    console.log(recordData)
    for (var v = 0; v < weaponReason.length; v++) {
        var weapFlag = true;
        for (var i = 0; i < weapJSON.length; i++) {
            if (weapJSON[i].weapName === weaponReason[v].weapName) {
                weapJSON[i].reason[weaponReason[v].reason]++
                    weapFlag = false;
                break;
            }
        }
        if (weapFlag) {
            await weapJSON.push({
                "weapName": weaponReason[v].weapName,
                "reason": [0, 0, 0, 0, 0]
            });
            weapJSON[i].reason[weaponReason[v].reason]++
        }
    }
    //console.log(weapJSON)
    var html = "";
    for (var k = 0; k < weapJSON.length; k++) {
        var weapFullName = await getWeap(weapJSON[k].weapName)
            console.log(weapJSON[k].weapName);
            console.log(weapFullName);

        if (weapFullName !== 0) {
            var damageReasonNum = 0;
            for (var i = 0; i < 5; i++) {
                damageReasonNum += weapJSON[k].reason[i];
            }
            html += `<table>
    <thead>
      <tr>
      　<th scope="col">ヒット数<p>${weapFullName}</p></th>
        <th scope="col">ヒット比率-頭<p>${weapFullName}</p></th>
        <th scope="col">ヒット比率-胴体<p>${weapFullName}</p></th>
        <th scope="col">ヒット比率-腰<p>${weapFullName}</p></th>
        <th scope="col">ヒット比率-腕<p>${weapFullName}</p></th>
        <th scope="col">ヒット比率-足<p>${weapFullName}</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="ヒット数(${weapFullName})">${damageReasonNum}発</td>
        <td data-label="ヒット比率-頭(${weapFullName})">${orgRound(weapJSON[k].reason[0] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-胴体(${weapFullName})">${orgRound(weapJSON[k].reason[1] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-腰(${weapFullName})">${orgRound(weapJSON[k].reason[2] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-腕(${weapFullName})">${orgRound(weapJSON[k].reason[3] / damageReasonNum * 100, 100)}%</td>
        <td data-label="ヒット比率-足(${weapFullName})">${orgRound(weapJSON[k].reason[4] / damageReasonNum * 100, 100)}%</td>
      </tr>
    </tbody>
  </table>`
        }
    }
    return html;
}

var getReason = (reason) => {
    switch (reason) {
        case "HeadShot":
            return 0;
        case "TorsoShot":
            return 1;
        case "PelvisShot":
            return 2;
        case "ArmShot":
            return 3;
        case "LegShot":
            return 4;
        default:
            return 5;
    }
}
var getThorw = (thorw) => {
    switch (true) {
        case (thorw.indexOf("Smoke") !== -1):
            return 0;
        case (thorw.indexOf("Grenade") !== -1):
            return 1;
        case (thorw.indexOf("Molotov") !== -1):
            return 2;
        case (thorw.indexOf("FlashBang") !== -1):
            return 3;
        default:
            return 4;
    }
}

var getWeap = (weap) => {
    switch (weap) {
        case "WeapG18_C":
            return "P18C";
        case "WeapM1911_C":
            return "P1911";
        case "WeapM9_C":
            return "P92";
        case "WeapNagantM1895_C":
            return "R1895";
        case "WeapRhino_C":
            return "R45";
        case "WeapSawnoff_C":
            return "SawedOff";
        case "Weapvz61Skorpion_C":
            return "Skorpion";
        case "WeapAK47_C":
            return "AKM";
        case "WeapAUG_C":
            return "AUG";
        case "WeapAWM_C":
            return "AWM";
        case "WeapBerreta686_C":
            return "S686";
        case "WeapBerylM762_C":
            return "Beryl M762";
        case "WeapBizonPP19_C":
            return "PP-19 Bizon";
        case "WeapCrossbow_C":
            return "Crossbow";
        case "WeapDP28_C":
            return "DP-28";
        case "WeapFNFal_C":
            return "SLR";
        case "WeapG36C_C":
            return "G36C";
        case "WeapGroza_C":
            return "Groza";
        case "WeapHK416_C":
            return "M416";
        case "WeapKar98k_C":
            return "Kar98k";
        case "WeapM16A4_C":
            return "M16A4";
        case "WeapM249_C":
            return "M249";
        case "WeapM24_C":
            return "M24";
        case "WeapMini14_C":
            return "Mini14";
        case "WeapMk14_C":
            return "Mk14 EBR";
        case "WeapMk47Mutant_C":
            return "Mk47 Mutant";
        case "WeapQBU88_C":
            return "QBU";
        case "WeapQBZ95_C":
            return "QBZ";
        case "WeapSCAR-L_C":
            return "SCAR-L";
        case "WeapSKS_C":
            return "SKS";
        case "WeapSaiga12_C":
            return "S12K";
        case "WeapThompson_C":
            return "TommyGun";
        case "WeapUMP_C":
            return "UMP9";
        case "WeapVSS_C":
            return "VSS";
        case "WeapVector_C":
            return "Vector";
        case "WeapWin1894_C":
            return "Win94";
        case "WeapWinchester_C":
            return "S1897";

        default:
            return 0;
    }
}

var getAssetdata = async(mapJSON, playerName) => {
    var playersData;

    playersData = await mapJSON.filter(function(value, index) {
        if (value.attacker && (value.attacker.name == playerName && (value.damageTypeCategory && value.damageTypeCategory !== "Damage_Groggy") && value.damage && value.damage !== 0)) {
            return value;
        }
    });
    return playersData;
}

var getthorwdata = async(mapJSON, playerName) => {
    var playersData;

    playersData = await mapJSON.filter(function(value, index) {
        if (value.weapon && (value.attacker.name == playerName && (value.weapon.subCategory === "Throwable"))) {
            return value;
        }
    });
    //console.log(playersData);
    return playersData;
}

async function initrecord(checkList, name) {
    var arry2 = [];
    var assetNames = [];
    await checkList.sort(function(a, b) {
        if (a.startAt < b.startAt) return -1;
        if (a.startAt > b.startAt) return 1;
        return 0;
    });
    //console.log(checkList)
    for (var count = 0; count < checkList.length; count++) {

        let telemetryResponse = await fetch(
            checkList[count].assetURL,
            { headers: { accept: "application/json" } },
            { mode: "cors" }
          );
        var json = await telemetryResponse.json();
        console.log(json)
        console.log(name)
        playerData = await getAssetdata(json, name);
        console.log(playerData)
        throwData = await getthorwdata(json, name);
        console.log(throwData)

        var arry = [];


        var temp2 = {
            "name": name,
            "damageReason": [0, 0, 0, 0, 0],
            "throwItem": [0, 0, 0, 0],
            "weaponReason": []
        };
        for (var k = 0; k < playerData.length; k++) {
            //console.log(playerData[k]);
            var reason = getReason(playerData[k].damageReason);
            if (reason < 5) {
                temp2.damageReason[reason]++
            }
            temp2.weaponReason.push({
                "weapName": playerData[k].damageCauserName,
                "reason": reason
            });
        }
        for (var l = 0; l < throwData.length; l++) {
            var thorw = getThorw(throwData[l].weapon.itemId);
            if (thorw < 4) {
                temp2.throwItem[thorw]++
            }
        }

        arry.push(temp2)

        arry2 = arry2.concat(arry);
    }

    console.log(arry2)


    var playerdata_num_array_sum = {
        "count": arry2.length,
        "name": arry2[0].name,
        "damageReason": [0, 0, 0, 0, 0],
        "throwItem": [0, 0, 0, 0],
        "weaponReason": []
    };
    arry2.forEach(o => {
        for (var i = 0; i < 5; i++) {
            playerdata_num_array_sum.damageReason[i] += o.damageReason[i];
        }
        for (var i = 0; i < 4; i++) {
            playerdata_num_array_sum.throwItem[i] += o.throwItem[i];
        }
        playerdata_num_array_sum.weaponReason = playerdata_num_array_sum.weaponReason.concat(o.weaponReason);
    });



    var resJSON = {
            "assetData": playerdata_num_array_sum,
            "assetNames": assetNames
        }
    console.log(resJSON)
    return resJSON;
}

function secondToMinutesAndSeconds(second) {
    if (second >= 3600) {
        return "0:00"
    }

    var seconds = parseInt((second) % 60, 10)
    var minutes = parseInt((second / 60) % 60, 10)

    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + ":" + seconds;
}