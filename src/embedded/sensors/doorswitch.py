import RPi.GPIO as io

io.setmode(io.BCM)
doorPin = 10 # Feel free to change
io.setup(doorPin, io.IN)

currentDoorStatus = -1

## Event loop
while True:
    doorState = io.input(doorPin)
    if doorState != currentDoorStatus:
        if doorState:
            print "Door Open"
        else:
            print "Door Closed"
    currentDoorStatus = doorState
