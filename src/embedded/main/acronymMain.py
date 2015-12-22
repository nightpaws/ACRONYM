#!/usr/bin/env python

import collections
import time
import bluetooth
import sys
import subprocess
from ISStreamer.Streamer import Streamer
import os
import glob
import thread
import serial
import struct

# --------- User Settings ---------
WEIGHT_SAMPLES = 15
WEIGHT_BASE = 00.00 # Need to weigh the fridge
WEIGHT_CONTENTS = 0.000 # Need to weigh the contents
FRIDGE_GETTING_LOW = 32
FRIDGE_EMPTY = 22
TEMPERATURE_DELAY = 60
TEMPERATURE_HOT_LIMIT = 20
TEMPERATURE_COLD_LIMIT = 0
BUCKET_NAME = "ACRONYM"
BUCKET_KEY = "INSERT_BUCKET_KEY_HERE"
ACCESS_KEY = "INSERT_ACCESS_KEY_HERE" #x_access_token
# ---------------------------------

# Door Switch Parameters
# io.setmode(io.BCM) # set GPIO mode to BCM
# DOOR_PIN = 17 # enter the number of whatever GPIO pin your're using
# io.setup(DOOR_PIN, io.IN) # Specify that button_io_pin will be an input

# Temperature Sensor Parameters
# os.system('modprobe w1-gpio')
# os.system('modprobe w1-therm')
# BASE_DIR = '/sys/bus/w1/devices/'
# DEVICE_FOLDER = glob.glob(BASE_DIR + '28*')[0]
# DEVICE_FILE = DEVICE_FOLDER + '/w1_slave'
ser = serial.Serial('/dev/ttyACM0', 9600)

# Wiiboard Parameters
CONTINUOUS_REPORTING = "04"  # Easier as string with leading zero
COMMAND_LIGHT = 11
COMMAND_REPORTING = 12
COMMAND_REQUEST_STATUS = 15
COMMAND_REGISTER = 16
COMMAND_READ_REGISTER = 17
INPUT_STATUS = 20
INPUT_READ_DATA = 21
EXTENSION_8BYTES = 32
BUTTON_DOWN_MASK = 8
TOP_RIGHT = 0
BOTTOM_RIGHT = 1
TOP_LEFT = 2
BOTTOM_LEFT = 3
BLUETOOTH_NAME = "Nintendo RVL-WBC-01"

# GLOBAL VARIABLES
LASTBARCODE = None

def readTemp():
    data = ser.read(size = 4)
    temperature = struct.unpack('B', data[0])[0]
    return temperature

def readDoorState():
    data = ser.read(size = 4)
    doorOpen = struct.unpack('B', data[2])[0]
    if (doorOpen == 0):
        doorOpen = True
    else:
        doorOpen = False

    return doorOpen

def streamData():
    streamer = Streamer(bucket_name=BUCKET_NAME,bucket_key=BUCKET_KEY,access_key=ACCESS_KEY)

    while True:

        tempC = readTemp()
        doorOpen = readDoorState()

        if tempC > TEMPERATURE_HOT_LIMIT:
            streamer.log("Status", ":fire: :exclamation:")
        if tempC < TEMPERATURE_COLD_LIMIT:
            streamer.log("Status", ":snowflake: :exclamation:")

        streamer.log("Temperature(C)", tempC)
        streamer.flush()

        #can use this for building the basis of the JSON
        print "Temperature: " + str(tempC) + " C"
        print "Door Open: " + str(doorOpen)
        print "Latest Barcode: " + str(LASTBARCODE)
        print "Weight: " #need to get weight
        print "" #empty line

        time.sleep(TEMPERATURE_DELAY)

class EventProcessor:
    def __init__(self):
        self._measured = False
        self.done = False
        self._measureCnt = 0
        self._events = range(WEIGHT_SAMPLES)
        self.contents = 0
        self._contentsPrev = -1
        self._doorStatus = False
        self._takeMeasurement = False
        self.streamer = Streamer(bucket_name=BUCKET_NAME,bucket_key=BUCKET_KEY,access_key=ACCESS_KEY)

    def mass(self, event):
        # Take measurement only when the door closes
        #if (self._doorStatus == True and event.doorStatus == False):

        scannerInput = None

        #Loops until there is input from the barcode scanner.
        #When input is detected, the program can progress to obtain the reading from the board   
        while(True):
            print "Start of loop"
            scannerInput = input()
            if(scannerInput != None):
                break

        global LASTBARCODE
        LASTBARCODE = str(scannerInput) #should assign scannerInput to the global variable... silly python...
        scannerInput = None

        print "The barcode that has just been scanned is: " + LASTBARCODE

        self._takeMeasurement = True
        self._measureCnt = 0
        self.streamer.log(":door: Door", "Closed")
        self.streamer.flush()
        # print "Door Closed"
        print "Scanned"
        print "Starting measurement ..."
        time.sleep(2)
        # Door is opened, ensure no measurement is being taken
        # if (self._doorStatus == False and event.doorStatus == True):
        #     self._takeMeasurement = False
        #     self.streamer.log(":door: Door", "Open")
        #     self.streamer.flush()
        #     print "Door Opened"
        if (self._takeMeasurement == True and event.totalWeight > 2):
            self._events[self._measureCnt] = event.totalWeight*2.20462
            self._measureCnt += 1
            if self._measureCnt == WEIGHT_SAMPLES:
                self._sum = 0
                for x in range(0, WEIGHT_SAMPLES-1):
                    self._sum += event.totalWeight*2.20462
                self._weight = self._sum/WEIGHT_SAMPLES
                self._weightcontents = self._weight - WEIGHT_BASE
                self.contents = int(round(self._weightcontents / WEIGHT_CONTENTS))
                self._measureCnt = 0
                print str(self._weight) + " lbs total, " + str(self._weightcontents) + " lbs in contents"
                if self.contents < FRIDGE_EMPTY:
                    self.streamer.log("Status", ":scream: :exclamation:")
                elif self.contents < FRIDGE_GETTING_LOW:
                    self.streamer.log("Status", ":worried: :exclamation:")
                else:
                    self.streamer.log("Status", ":beers: :thumbsup:")
                self.streamer.flush()
                if (self.contents != self._contentsPrev) and (self.contents >= 0):
                    self.streamer.log(":beer: Contents Present", self.contents)
                    self.streamer.flush()
                    if (self._contentsPrev != -1) and (self._contentsPrev > self.contents):
                        for x in range(0, self._contentsPrev-self.contents):
                            print "Item removed"
                            self.streamer.log(":beers: Item Removed", ":beers:")
                            self.streamer.flush()
                    self._contentsPrev = self.contents
                print str(self.contents) + " items"
                print "Measurement complete!"
                self._takeMeasurement = False
            if not self._measured:
                self._measured = True

    @property
    def weight(self):
        if not self._events:
            return 0
        histogram = collections.Counter(round(num, 1) for num in self._events)
        return histogram.most_common(1)[0][0]


class BoardEvent:
    def __init__(self, topLeft, topRight, bottomLeft, bottomRight, buttonPressed, buttonReleased):

        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
        self.buttonPressed = buttonPressed
        self.buttonReleased = buttonReleased
        #convenience value
        self.totalWeight = topLeft + topRight + bottomLeft + bottomRight
        self.doorStatus = readDoorState()

class Wiiboard:
    def __init__(self, processor):
        # Sockets and status
        self.receivesocket = None
        self.controlsocket = None

        self.processor = processor
        self.calibration = []
        self.calibrationRequested = False
        self.LED = False
        self.address = None
        self.buttonDown = False
        for i in xrange(3):
            self.calibration.append([])
            for j in xrange(4):
                self.calibration[i].append(10000)  # high dummy value so events with it don't register

        self.status = "Disconnected"
        self.lastEvent = BoardEvent(0, 0, 0, 0, False, False)

        try:
            self.receivesocket = bluetooth.BluetoothSocket(bluetooth.L2CAP)
            self.controlsocket = bluetooth.BluetoothSocket(bluetooth.L2CAP)
        except ValueError:
            raise Exception("Error: Bluetooth not found")

    def isConnected(self):
        return self.status == "Connected"

    # Connect to the Wiiboard at bluetooth address <address>
    def connect(self, address):
        if address is None:
            print "Non existant address"
            return
        self.receivesocket.connect((address, 0x13))
        self.controlsocket.connect((address, 0x11))
        if self.receivesocket and self.controlsocket:
            print "Connected to Wiiboard at address " + address
            self.status = "Connected"
            self.address = address
            self.calibrate()
            useExt = ["00", COMMAND_REGISTER, "04", "A4", "00", "40", "00"]
            self.send(useExt)
            self.setReportingType()
            print "Wiiboard connected"
        else:
            print "Could not connect to Wiiboard at address " + address

    def receive(self):
        while self.status == "Connected" and not self.processor.done:
            data = self.receivesocket.recv(25)
            intype = int(data.encode("hex")[2:4])
            if intype == INPUT_STATUS:
                # TODO: Status input received. It just tells us battery life really
                self.setReportingType()
            elif intype == INPUT_READ_DATA:
                if self.calibrationRequested:
                    packetLength = (int(str(data[4]).encode("hex"), 16) / 16 + 1)
                    self.parseCalibrationResponse(data[7:(7 + packetLength)])

                    if packetLength < 16:
                        self.calibrationRequested = False
            elif intype == EXTENSION_8BYTES:
                self.processor.mass(self.createBoardEvent(data[2:12]))
            else:
                print "ACK to data write received"

    def disconnect(self):
        if self.status == "Connected":
            self.status = "Disconnecting"
            while self.status == "Disconnecting":
                self.wait(100)
        try:
            self.receivesocket.close()
        except:
            pass
        try:
            self.controlsocket.close()
        except:
            pass
        print "WiiBoard disconnected"

    # Try to discover a Wiiboard
    def discover(self):
        print "Press the red sync button on the board now"
        address = None
        bluetoothdevices = bluetooth.discover_devices(duration=6, lookup_names=True)
        for bluetoothdevice in bluetoothdevices:
            if bluetoothdevice[1] == BLUETOOTH_NAME:
                address = bluetoothdevice[0]
                print "Found Wiiboard at address " + address
        if address is None:
            print "No Wiiboards discovered."
        return address

    def createBoardEvent(self, bytes):
        buttonBytes = bytes[0:2]
        bytes = bytes[2:12]
        buttonPressed = False
        buttonReleased = False

        state = (int(buttonBytes[0].encode("hex"), 16) << 8) | int(buttonBytes[1].encode("hex"), 16)
        if state == BUTTON_DOWN_MASK:
            buttonPressed = True
            if not self.buttonDown:
                print "Button pressed"
                self.buttonDown = True

        if not buttonPressed:
            if self.lastEvent.buttonPressed:
                buttonReleased = True
                self.buttonDown = False
                print "Button released"

        rawTR = (int(bytes[0].encode("hex"), 16) << 8) + int(bytes[1].encode("hex"), 16)
        rawBR = (int(bytes[2].encode("hex"), 16) << 8) + int(bytes[3].encode("hex"), 16)
        rawTL = (int(bytes[4].encode("hex"), 16) << 8) + int(bytes[5].encode("hex"), 16)
        rawBL = (int(bytes[6].encode("hex"), 16) << 8) + int(bytes[7].encode("hex"), 16)

        topLeft = self.calcMass(rawTL, TOP_LEFT)
        topRight = self.calcMass(rawTR, TOP_RIGHT)
        bottomLeft = self.calcMass(rawBL, BOTTOM_LEFT)
        bottomRight = self.calcMass(rawBR, BOTTOM_RIGHT)
        boardEvent = BoardEvent(topLeft, topRight, bottomLeft, bottomRight, buttonPressed, buttonReleased)
        return boardEvent

    def calcMass(self, raw, pos):
        val = 0.0
        #calibration[0] is calibration values for 0kg
        #calibration[1] is calibration values for 17kg
        #calibration[2] is calibration values for 34kg
        if raw < self.calibration[0][pos]:
            return val
        elif raw < self.calibration[1][pos]:
            val = 17 * ((raw - self.calibration[0][pos]) / float((self.calibration[1][pos] - self.calibration[0][pos])))
        elif raw > self.calibration[1][pos]:
            val = 17 + 17 * ((raw - self.calibration[1][pos]) / float((self.calibration[2][pos] - self.calibration[1][pos])))

        return val

    def getEvent(self):
        return self.lastEvent

    def getLED(self):
        return self.LED

    def parseCalibrationResponse(self, bytes):
        index = 0
        if len(bytes) == 16:
            for i in xrange(2):
                for j in xrange(4):
                    self.calibration[i][j] = (int(bytes[index].encode("hex"), 16) << 8) + int(bytes[index + 1].encode("hex"), 16)
                    index += 2
        elif len(bytes) < 16:
            for i in xrange(4):
                self.calibration[2][i] = (int(bytes[index].encode("hex"), 16) << 8) + int(bytes[index + 1].encode("hex"), 16)
                index += 2

    # Send <data> to the Wiiboard
    # <data> should be an array of strings, each string representing a single hex byte
    def send(self, data):
        if self.status != "Connected":
            return
        data[0] = "52"

        senddata = ""
        for byte in data:
            byte = str(byte)
            senddata += byte.decode("hex")

        self.controlsocket.send(senddata)

    #Turns the power button LED on if light is True, off if False
    #The board must be connected in order to set the light
    def setLight(self, light):
        if light:
            val = "10"
        else:
            val = "00"

        message = ["00", COMMAND_LIGHT, val]
        self.send(message)
        self.LED = light

    def calibrate(self):
        message = ["00", COMMAND_READ_REGISTER, "04", "A4", "00", "24", "00", "18"]
        self.send(message)
        self.calibrationRequested = True

    def setReportingType(self):
        bytearr = ["00", COMMAND_REPORTING, CONTINUOUS_REPORTING, EXTENSION_8BYTES]
        self.send(bytearr)

    def wait(self, millis):
        time.sleep(millis / 1000.0)


def main():
    processor = EventProcessor()

    board = Wiiboard(processor)
    if len(sys.argv) == 1:
        print "Discovering board..."
        address = board.discover()
    else:
        address = sys.argv[1]

    try:
        # Disconnect already-connected devices.
        # This is basically Linux black magic just to get the thing to work.
        subprocess.check_output(["bluez-test-input", "disconnect", address], stderr=subprocess.STDOUT)
        subprocess.check_output(["bluez-test-input", "disconnect", address], stderr=subprocess.STDOUT)
    except:
        pass

    print "Trying to connect..."
    board.connect(address)  # The wii board must be in sync mode at this time
    board.wait(200)
    # Flash the LED so we know we can step on.
    board.setLight(False)
    board.wait(500)
    board.setLight(True)
    try:
       thread.start_new_thread(streamData, ())
    except:
       print "Error: unable to start temperature streamer thread"
    board.receive()

if __name__ == "__main__":
    main()
