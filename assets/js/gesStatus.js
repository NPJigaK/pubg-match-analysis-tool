async function getStatus(platform, matchList) {
  try {
    var matchCnt = matchList.length;

    var resJSON = [];
    console.log(matchCnt);
    console.log(matchList);
    for (var i = 0; i < matchCnt; i++) {
      var response = await fetch(
        `https://api.pubg.com/shards/${platform}/matches/${matchList[i]}`,
        { headers: { accept: "application/json" } },
        { mode: "cors" }
      );
      await resJSON.push(await response.json())
    }

    var playerdata_num = {};
    
    console.log(resJSON);
    for (var j = 0; j < matchCnt; j++) {
      var playerdata_temp = resJSON[j].included.filter(function(value, index) {
        if (value.type == "participant") {
          return value.attributes.stats;
        }
      });

      Array.prototype.push.apply(playerdata_num, playerdata_temp);
    }

    var playerdata_num_array = [];
    for (var k = 0; k < Object.keys(playerdata_num).length - 1; k++) {
      playerdata_num_array.push(playerdata_num[k].attributes.stats);
    }

    playerdata_num_array.sort(function(a, b) {
      if (a.kills > b.kills) return -1;
      if (a.kills < b.kills) return 1;
      return 0;
    });

    var nums = [0, 0, 0, 0, 0, 0];

    var sum1 = {};
    var sum2 = {};
    var sum3 = {};
    var sum4 = {};
    var sum5 = {};
    var sum6 = {};
    var sum7 = {};
    var sum8 = {};

    var sum9 = {}; //boostitem use
    var sum10 = {}; //healitem use
    var sum11 = {}; //longestKill
    var sum12 = {}; //hukkatu player
    var sum13 = {}; //rideDistance aruku
    var sum14 = {}; //ridedistance kuruma
    var sum15 = {}; //rideswim oyogu
    var sum16 = {}; //roadkills
    var sum17 = {}; //teamkills

    playerdata_num_array.forEach(o => {
      sum9[o.name] = (sum9[o.name] || 0) + o.boosts;
      sum10[o.name] = (sum10[o.name] || 0) + o.heals;
      sum11[o.name] = sum11[o.name] || 0;
      if (sum11[o.name] < o.longestKill) {
        sum11[o.name] = o.longestKill;
      }
      sum12[o.name] = (sum12[o.name] || 0) + o.revives;
      sum13[o.name] = (sum13[o.name] || 0) + o.walkDistance;
      sum14[o.name] = (sum14[o.name] || 0) + o.rideDistance;
      sum15[o.name] = (sum15[o.name] || 0) + o.swimDistance;
      sum16[o.name] = (sum16[o.name] || 0) + o.roadKills;
      sum17[o.name] = (sum17[o.name] || 0) + o.teamKills;

      //--//
      sum1[o.name] = (sum1[o.name] || 0) + o.kills;
      sum2[o.name] = (sum2[o.name] || 0) + o.DBNOs;
      sum3[o.name] = (sum3[o.name] || 0) + o.assists;
      sum4[o.name] = (sum4[o.name] || 0) + o.damageDealt;
      sum5[o.name] = (sum5[o.name] || 0) + o.timeSurvived;
      sum6[o.name] = (sum6[o.name] || 0) + 1;
      sum7[o.name] = sum7[o.name] || 0;
      sum8[o.name] = sum8[o.name] || [];
      if (sum7[o.name] < o.kills) {
        sum7[o.name] = o.kills;
      }
      sum8[o.name].push({
        kills: o.kills,
        DBNOs: o.DBNOs,
        assists: o.assists,
        damageDealt: o.damageDealt,
        timeSurvived: o.timeSurvived,
        count: sum6[o.name]
      });
    });

    var playerdata_num_array_sum = Object.keys(sum1)
      .sort((a, b) => (a > b ? 1 : -1))
      .map(name => ({
        name,
        kills: sum1[name],
        DBNOs: sum2[name],
        assists: sum3[name],
        damageDealt: sum4[name],
        timeSurvived: sum5[name],
        count: sum6[name],
        maxkills: sum7[name],
        play: sum8[name],
        deviations: [0, 0, 0, 0, 0, 0],
        numdeviation: 0,
        boosts: sum9[name],
        heals: sum10[name],
        longestKill: sum11[name],
        revives: sum12[name],
        walkDistance: sum13[name],
        rideDistance: sum14[name],
        swimDistance: sum15[name],
        roadKills: sum16[name],
        teamKills: sum17[name]
      }));

    for (var i = 0; i < playerdata_num_array_sum.length; i++) {
      playerdata_num_array_sum[i].kills =
        playerdata_num_array_sum[i].kills / playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].DBNOs =
        playerdata_num_array_sum[i].DBNOs / playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].assists =
        playerdata_num_array_sum[i].assists / playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].damageDealt =
        playerdata_num_array_sum[i].damageDealt /
        playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].timeSurvived =
        playerdata_num_array_sum[i].timeSurvived /
        playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].boosts =
        playerdata_num_array_sum[i].boosts / playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].heals =
        playerdata_num_array_sum[i].heals / playerdata_num_array_sum[i].count;
      //playerdata_num_array_sum[i].revives = playerdata_num_array_sum[i].revives / playerdata_num_array_sum[i].count
      playerdata_num_array_sum[i].walkDistance =
        playerdata_num_array_sum[i].walkDistance /
        playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].rideDistance =
        playerdata_num_array_sum[i].rideDistance /
        playerdata_num_array_sum[i].count;
      playerdata_num_array_sum[i].swimDistance =
        playerdata_num_array_sum[i].swimDistance /
        playerdata_num_array_sum[i].count;

      nums[0] += playerdata_num_array_sum[i].kills;
      nums[1] += playerdata_num_array_sum[i].DBNOs;
      nums[2] += playerdata_num_array_sum[i].assists;
      nums[3] += playerdata_num_array_sum[i].damageDealt;
      nums[4] += playerdata_num_array_sum[i].timeSurvived;
      nums[5] += playerdata_num_array_sum[i].maxkills;
    }

    var aves = [0, 0, 0, 0, 0, 0];

    var len = playerdata_num_array_sum.length;

    for (var i = 0; i < 6; i++) {
      aves[i] = nums[i] / len;
      if (nums[i] === 0) {
        aves[i] = 0.000001;
      }
    }
    var deviations = await standardDeviation(
      playerdata_num_array_sum,
      aves
    );
    playerdata_num_array_sum = await standardScore(
      playerdata_num_array_sum,
      aves,
      deviations
    );

    for (var i = 0; i < playerdata_num_array_sum.length; i++) {
      playerdata_num_array_sum[i].numdeviation = await sumproc(
        playerdata_num_array_sum[i].deviations
      );
    }

    await playerdata_num_array_sum.sort(function(a, b) {
      if (a.numdeviation > b.numdeviation) return -1;
      if (a.numdeviation < b.numdeviation) return 1;
      return 0;
    });

    return playerdata_num_array_sum;
  } catch (e) {
    console.log(e);
    alert("入力が間違ってるで～");
  }
}

standardDeviation = async(x, avg) => {
  let n = x.length;
  var deviations = [0, 0, 0, 0, 0, 0];

  for (i = 0; i < n; i++) {
      deviations[0] += Math.pow(x[i].kills - avg[0], 2);
      deviations[1] += Math.pow(x[i].DBNOs - avg[1], 2);
      deviations[2] += Math.pow(x[i].assists - avg[2], 2);
      deviations[3] += Math.pow(x[i].damageDealt - avg[3], 2);
      deviations[4] += Math.pow(x[i].timeSurvived - avg[4], 2);
      deviations[5] += Math.pow(x[i].maxkills - avg[5], 2);
  }
  for (j = 0; j < 6; j++) {
      deviations[j] = Math.sqrt(deviations[j] / n);
  }
  return deviations;
}

standardScore = async(x, avg, sd) => {

  let n = x.length;
  for (i = 0; i < n; i++) {
      x[i].deviations[0] = (10 * (x[i].kills - avg[0]) / sd[0]) + 50;
      x[i].deviations[1] = (10 * (x[i].DBNOs - avg[1]) / sd[1]) + 50;
      x[i].deviations[2] = (10 * (x[i].assists - avg[2]) / sd[2]) + 50;
      x[i].deviations[3] = (10 * (x[i].damageDealt - avg[3]) / sd[3]) + 50;
      x[i].deviations[4] = (10 * (x[i].timeSurvived - avg[4]) / sd[4]) + 50;
      x[i].deviations[5] = (10 * (x[i].maxkills - avg[5]) / sd[5]) + 50;
  }

  return x;
}

sumproc = async(arr) => {
  return arr.reduce(function(prev, current, i, arr) {
      return prev + current;
  });
};