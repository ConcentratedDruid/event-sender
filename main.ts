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
function start_stabilze () {
    angle_sum = 0
    angle_count = 0
    last_average_angle = 0
    angle_threshhold = 5
}
function servo_limit () {
    if (S1Angle < 1) {
        S1Angle = 1
    } else if (S1Angle > 179) {
        S1Angle = 179
    } else if (S2Angle < 1) {
        S2Angle = 1
    } else if (S2Angle > 179) {
        S2Angle = 179
    } else if (S3Angle < 1) {
        S3Angle = 1
    } else if (S3Angle > 179) {
        S3Angle = 179
    } else {
    	
    }
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
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (S_Sel == 3) {
        S_Sel = 1
    } else {
        S_Sel = S_Sel + 1
    }
    basic.showNumber(S_Sel)
})
let average_angle = 0
let angle_threshhold = 0
let last_average_angle = 0
let angle_count = 0
let angle_sum = 0
let angle_change = 0
let S3Angle = 0
let S2Angle = 0
let S1Angle = 0
let S_Sel = 0
radio.setGroup(1)
S_Sel = 3
S1Angle = 90
S2Angle = 90
S3Angle = 90
angle_change = 20
radio.sendValue("s1", S1Angle)
radio.sendValue("s2", S2Angle)
radio.sendValue("s3", S3Angle)
basic.showIcon(IconNames.Heart)
start_stabilze()
basic.forever(function () {
    S2Angle = Math.map(input.rotation(Rotation.Pitch), 90, -90, 0, 180)
    S1Angle = Math.map(input.rotation(Rotation.Roll), 90, -90, 0, 180)
    angle_sum = S1Angle + angle_sum
    angle_count = angle_count + 1
    servo_limit()
    serial.writeValue("S1", S1Angle)
    serial.writeValue("S2", S2Angle)
    serial.writeValue("S3", S3Angle)
    if (angle_count == 5) {
        average_angle = angle_sum / angle_count
        if (Math.abs(average_angle - last_average_angle) > angle_threshhold) {
            S1Angle = average_angle
            last_average_angle = average_angle
        }
        angle_sum = 0
        angle_count = 0
    }
    radio.sendValue("s1", S1Angle)
    radio.sendValue("s2", S2Angle)
    radio.sendValue("s3", S3Angle)
})
