input.onButtonPressed(Button.A, function () {
    if (S_Sel == 1) {
        S1Angle += angle_change
    } else if (S_Sel == 2) {
        S2Angle += angle_change
    } else if (S_Sel == 3) {
        S3Angle += angle_change
    } else {
    	
    }
})
function doSomething () {
    angle_sum = 0
    angle_count = 0
    last_average_angle = 0
    angle_threshhold = 5
}
input.onButtonPressed(Button.B, function () {
    if (S_Sel == 1) {
        S1Angle += angle_change * -1
    } else if (S_Sel == 2) {
        S2Angle += angle_change * -1
    } else if (S_Sel == 3) {
        S3Angle += angle_change * -1
    } else {
    	
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (S_Sel == 3) {
        S_Sel = 1
    } else {
        S_Sel = S_Sel + 1
    }
    basic.showNumber(S_Sel)
})
let angle_threshhold = 0
let last_average_angle = 0
let angle_count = 0
let angle_sum = 0
let angle_change = 0
let S_Sel = 0
radio.setGroup(1)
S_Sel = 3
let S1Angle = 90
let S2Angle = 90
let S3Angle = 90
angle_change = 20
radio.sendValue("s1", S1Angle)
radio.sendValue("s2", S2Angle)
radio.sendValue("s3", S3Angle)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (S1Angle < 0) {
        S1Angle = 0
    } else if (S1Angle > 180) {
        S1Angle = 180
    } else if (S2Angle < 0) {
        S2Angle = 0
    } else if (S2Angle > 179) {
        S2Angle = 179
    } else if (S3Angle < 0) {
        S3Angle = 0
    } else if (S3Angle > 179) {
        S3Angle = 179
    } else {
        S2Angle = Math.map(input.rotation(Rotation.Pitch), 90, -90, 0, 180)
        S1Angle = Math.map(input.rotation(Rotation.Roll), 90, -90, 0, 180)
    }
    radio.sendValue("s1", S1Angle)
    radio.sendValue("s2", S2Angle)
    radio.sendValue("s3", S3Angle)
})
