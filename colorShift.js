var colorX = [0, 0, 0]

function randomColor() {
    
    var value = 255;
    var shift = 15;
    
    // 250,0,0 -> 250,250,0
    if (colorX[1] < value && colorX[2] == 0) {
        colorX[0] = value;
        colorX[1] += shift;
        console.log("1st loop:", colorX);
    // 250,250,0 -> 0,250,0    
    } else if (colorX[0] > 0 && colorX[1] == value && colorX[2] == 0 ) {
        colorX[0] -= shift;
        console.log("2nd loop:", colorX);
    // 0,250,0 -> 0,250,250    
    } else if (colorX[0] == 0 && colorX[1] == value && colorX[2] < value) {
        colorX[2] += shift;
        console.log("3th loop:", colorX);
    // 0,250,250 -> 0,0,250
    } else if (colorX[0] == 0 && colorX[1] > 0 && colorX[2] == value) {
        colorX[1] -= shift;
        console.log("4th loop:", colorX);
    // 0,0,250 -> 255,0,250
    } else if (colorX[0] < value && colorX[1] == 0 && colorX[2] == value) {
        colorX[0] += shift;
        console.log("5th loop:", colorX);
    // 250,0,250 -> 255,0,0
    } else if (colorX[0] == value && colorX[1] == 0 && colorX[2] > 0) {
        colorX[2] -= shift;
        console.log("6th loop:", colorX);
    }

    var color = "rgb(" + colorX[0] + "," + colorX[1] + "," + colorX[2] +")";
    return color;
}