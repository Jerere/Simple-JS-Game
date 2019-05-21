var colorX = [0, 0, 0]

// returns different rbg color value when called
function randomColor() {

    var value = 255; // max value color shifts to
    var shift = 15; // color shift amount

    // 255,0,0 -> 255,255,0
    if (colorX[1] < value && colorX[2] == 0) {
        colorX[0] = value;
        colorX[1] += shift;

        // 255,255,0 -> 0,255,0    
    } else if (colorX[0] > 0 && colorX[1] == value && colorX[2] == 0 ) {
        colorX[0] -= shift;

        // 0,255,0 -> 0,255,255    
    } else if (colorX[0] == 0 && colorX[1] == value && colorX[2] < value) {
        colorX[2] += shift;

        // 0,255,255 -> 0,0,255
    } else if (colorX[0] == 0 && colorX[1] > 0 && colorX[2] == value) {
        colorX[1] -= shift;

        // 0,0,255 -> 255,0,255
    } else if (colorX[0] < value && colorX[1] == 0 && colorX[2] == value) {
        colorX[0] += shift;

        // 255,0,255 -> 255,0,0
    } else if (colorX[0] == value && colorX[1] == 0 && colorX[2] > 0) {
        colorX[2] -= shift;
    }

    var color = "rgb(" + colorX[0] + "," + colorX[1] + "," + colorX[2] +")";
    return color;
}