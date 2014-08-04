var d = new Date();
var tt = d.getTime();
var arr = [];
var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
/* main function */
function findDistance(lat2, lon2, time2) {
    var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km, time1, time2, time, hr, tmp, spd1, spd2;
    
    // get values for lat1, lon1, lat2, and lon2 
    tmp = (arr[arr.length - 1]).split("|");
    t1 = tmp[0];
    n1 = tmp[1];
    time1 = tmp[2];
    spd1 = tmp[3];
    //alert(arr[arr.length - 1]);
    t2 = lat2;
    n2 = lon2;
    //time2 = time2;
    time = time2 - time1;
    time = (time>0)?time:1;
    hr = time / 3600;
    // convert coordinates to radians
    lat1 = deg2rad(t1);
    lon1 = deg2rad(n1);
    lat2 = deg2rad(t2);
    lon2 = deg2rad(n2);
    
    // find the differences between the coordinates
    dlat = lat2 - lat1;
    dlon = lon2 - lon1;
    
    // here's the heavy lifting
    a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
    dm = c * Rm; // great circle distance in miles
    dk = c * Rk; // great circle distance in km
    
    // round the results down to the nearest 1/1000
    mi = round(dm);
    km = round(dk);
    hr = round(hr);
    //spd2 = round(mi / hr);
    spd2 = round((mi*1600));///(time*1000)); // meters/sec
    spd2 = spd2 ? spd2 : 0;
    $("#speed").val(spd2);
    arr.push(t2 + '|' + n2 + '|' + time2 + '|' + spd2);
    //if (spd2 <= 1.3 && spd2 >0) {
      //  arr.push(t2 + '|' + n2 + '|' + time2 + '|' + spd2);
   // } else {
     //   arr = ["39.768480|-86.158001|" + time2 + "|0"];
    //}
    $("#log").val(arr[arr.length - 1]);
    //if (arr.length >= 100) {
     //   alert('Alert!');
    //}
}


// convert degrees to radians
function deg2rad(deg) {
    rad = deg * Math.PI / 180; // radians = degrees * pi/180
    return rad;
}


// round to the nearest 1/1000
function round(x) {
    return Math.round(x * 1000) / 1000;
}
