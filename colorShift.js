var colorX = [0, 0, 0]

function randomColor() {

    var value = 255;
    var shift = 15;

    // 250,0,0 -> 250,250,0
    if (colorX[1] < value && colorX[2] == 0) {
        colorX[0] = value;
        colorX[1] += shift;

        // 250,250,0 -> 0,250,0    
    } else if (colorX[0] > 0 && colorX[1] == value && colorX[2] == 0 ) {
        colorX[0] -= shift;

        // 0,250,0 -> 0,250,250    
    } else if (colorX[0] == 0 && colorX[1] == value && colorX[2] < value) {
        colorX[2] += shift;

        // 0,250,250 -> 0,0,250
    } else if (colorX[0] == 0 && colorX[1] > 0 && colorX[2] == value) {
        colorX[1] -= shift;

        // 0,0,250 -> 255,0,250
    } else if (colorX[0] < value && colorX[1] == 0 && colorX[2] == value) {
        colorX[0] += shift;

        // 250,0,250 -> 255,0,0
    } else if (colorX[0] == value && colorX[1] == 0 && colorX[2] > 0) {
        colorX[2] -= shift;
    }

    var color = "rgb(" + colorX[0] + "," + colorX[1] + "," + colorX[2] +")";
    return color;
}