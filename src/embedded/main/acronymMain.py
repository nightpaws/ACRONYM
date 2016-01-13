#!/usr/bin/env python

import collections
import time
import bluetooth
import sys
import subprocess
import os
import glob
import thread
import serial
import struct
import requests
import json
import cPickle as pickle
# from ISStreamer.Streamer import Streamer
from evdev import InputDevice, KeyEvent, categorize
from serial import SerialException

# --------- User Settings ---------
WEIGHT_SAMPLES = 50
WEIGHT_BASE = 77.00  # Need to weigh the fridge
WEIGHT_CONTENTS = 20.000  # Need to weigh the contents
FRIDGE_GETTING_LOW = 32
FRIDGE_EMPTY = 22
TEMPERATURE_DELAY = 60  # time between calls to streamData
TEMPERATURE_HOT_LIMIT = 20
TEMPERATURE_COLD_LIMIT = 0

UNIQUE_FRIDGE_NUMBER = "19"
# ---------------------------------

# --------- Server Settings ---------
SERVER_URL = "https://178.62.119.234/dashboard/api/fridges/"
HEADERS = None
ACCESS_KEY = None
# -----------------------------------

ser = serial.Serial('/dev/ttyACM0', 9600)

# --------- Wiiboard Settings ---------
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
# -------------------------------------

# GLOBAL VARIABLES
LASTBARCODE = None
FRIDGEWEIGHT = 5150
LASTDOORSTATUS = False
LASTTEMPERATURE = 0
FIRSTWEIGHTREADING = True


def scan():
    while True:
        scannerInput = None
        barcodeScanner = InputDevice('/dev/input/event0')
        for scannerEvent in barcodeScanner.read_loop():
            if scannerEvent.value == 1:  # identifies a keydown event
                newValue = str(getBarcode(KeyEvent(scannerEvent).keycode))
                if scannerInput != None and newValue != "None":
                    scannerInput = scannerInput + newValue
                elif scannerInput == None and newValue != "None":
                    scannerInput = newValue
                else:
                    break

        global LASTBARCODE  # need to declare global here because python is silly...
        LASTBARCODE = str(scannerInput)  # assigns scannerInput to the global variable... silly python..

        scannerInput = None  # reset scannerinput

        print
        "The barcode that has just been scanned is: " + LASTBARCODE


def getBarcode(keyCode):  # keycode is the identifier of the 'key' that has been pressed

    if str(keyCode) == "KEY_0":
        return "0"
    elif str(keyCode) == "KEY_1":
        return "1"
    elif str(keyCode) == "KEY_2":
        return "2"
    elif str(keyCode) == "KEY_3":
        return "3"
    elif str(keyCode) == "KEY_4":
        return "4"
    elif str(keyCode) == "KEY_5":
        return "5"
    elif str(keyCode) == "KEY_6":
        return "6"
    elif str(keyCode) == "KEY_7":
        return "7"
    elif str(keyCode) == "KEY_8":
        return "8"
    elif str(keyCode) == "KEY_9":
        return "9"


def readTemp():
    try:
        data = ser.read(size=4)
        temperature = struct.unpack('B', data[0])[0]
        global LASTTEMPERATURE
        LASTTEMPERATURE = temperature
    return temperature

except SerialException:
print
"Serial Exception"
return LASTTEMPERATURE


def readDoorState():
    try:
        data = ser.read(size=4)
        doorOpen = struct.unpack('B', data[2])[0]
        if (doorOpen == 0):
            doorOpen = True
        else:
            doorOpen = False
        global LASTDOORSTATE
        LASTDOORSTATE = doorOpen
    return doorOpen

except SerialException:
print
"Serial Exception"
return LASTDOORSTATE


def register_fridge():
    theResponse = requests.post(SERVER_URL + 'register', json={"fridge_no": UNIQUE_FRIDGE_NUMBER}, verify=False)
    print "Register Fridge"
    print theResponse.content
    responseJson = theResponse.json()
    if theResponse.status_code == 200:
        if responseJson["successful"]:
            global ACCESS_KEY
            ACCESS_KEY = responseJson["result"]["token"]["token"]
            print "Fridge registration success."
            global HEADERS
            HEADERS = {"x-access-token": ACCESS_KEY}
            pickle.dump(HEADERS, open("config.p", "wb"))
            print "Fridge's Access Key"
            print ACCESS_KEY
    else:
        print "Failed fridge registration."


def update_state(tempC, doorOpen):
    updateStateURL = SERVER_URL + UNIQUE_FRIDGE_NUMBER + "/state"
    updateStateJSON = {"temperature": tempC, "door": doorOpen, "weight": FRIDGEWEIGHT}
    print "JSON being sent: "
    print updateStateJSON
    updateStateResponse = requests.post(updateStateURL, json=updateStateJSON, verify=False,
                                        headers=HEADERS)  # just need to handle response
    print "Update State"
    print updateStateResponse.content
    updateResponseJSON = updateStateResponse.json()
    if updateStateResponse.status_code == 200:
        return updateResponseJSON["successful"]
    else:
        return "Update state failed."


def add_contents(newWeight):
    addContentsURL = SERVER_URL + UNIQUE_FRIDGE_NUMBER + "/contents"
    addContentsData = {"product": {"code": LASTBARCODE, "_id": LASTBARCODE}, "current_weight": newWeight}
    addContentsResponse = requests.put(addContentsURL, json=addContentsData, verify=False, headers=HEADERS)
    print "Add Contents Message Content"
    print addContentsResponse.content
    if addContentsResponse.status_code == 200:
        response_content = addContentsResponse.json()
        print "Add Contents"
        return response_content["successful"]
    else:
        return "Add contents failed."


def delete_contents():
    deleteContentsURL = SERVER_URL + UNIQUE_FRIDGE_NUMBER + "/contents/" + LASTBARCODE
    deleteContentsResponse = requests.delete(deleteContentsURL, verify=False, headers=HEADERS)
    print "Delete Contents Message Content"
    print deleteContentsResponse.content
    if deleteContentsResponse.status_code == 200:
        response_content = deleteContentsResponse.json()
        print "Delete Contents"
        return response_content["successful"]
    else:
        return "Delete contents failed."


def streamData():
    if (ACCESS_KEY == None):
        import os.path
        if os.path.exists("config.p") and os.path.getsize("config.p") > 0:
            read_dictionary = pickle.load(open("config.p", "rb"))
            if "x-access-token" in read_dictionary:
                global HEADERS
                HEADERS = read_dictionary
        else:
            register_fridge()
    while True:
        time.sleep(TEMPERATURE_DELAY)

        tempC = readTemp()
        if tempC is None:
            tempC = 0
        doorOpen = readDoorState()

        # can use this for building the basis of the JSON
        print ""  # empty line
        print "Temperature: " + str(tempC) + " C"
        print "Door Open: " + str(doorOpen)
        print "Latest Barcode: " + str(LASTBARCODE)
        print "Weight: " + str(round(FRIDGEWEIGHT))
        print ""  # empty line

        # send update to server
        update_state(tempC, doorOpen)


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
        self._newWeight = 0
        self._fuckoffpaul = True

    def mass(self, event):

        # print "Total Weight: " + str(event.totalWeight * 1000)

        # return
        if FIRSTWEIGHTREADING:
            print "First Weight Reading"
            self._events[self._measureCnt] = event.totalWeight
            self._measureCnt += 1
            if self._measureCnt == WEIGHT_SAMPLES:
                self._sum = 0
                for x in range(0, WEIGHT_SAMPLES - 1):
                    # self._sum += event.totalWeight
                    self._sum += self._events[x]
                self._weight = (self._sum / WEIGHT_SAMPLES) * 1000
                self._weightcontents = self._weight - WEIGHT_BASE
                self.contents = int(round(self._weightcontents / WEIGHT_CONTENTS))
                self._measureCnt = 0
                global FIRSTWEIGHTREADING
                FIRSTWEIGHTREADING = False
                global FRIDGEWEIGHT
                FRIDGEWEIGHT = self._weight
                print "The initial weight" + str(self._weight)
        # Take measurement only when the door closes
        if self._doorStatus == True and event.doorStatus == False:
            self._measureCnt = 0
            self._takeMeasurement = True
            print "Door Closed"
            print "Starting measurement ..."
            self._fuckoffpaul = True
        # Door is opened, ensure no measurement is being taken
        if self._doorStatus == False and event.doorStatus == True:
            self._takeMeasurement = False
            print
            "Door Opened"
        if self._takeMeasurement:
            print
            "in that other fucking if statement"
            if self._fuckoffpaul:
                time.sleep(90)
                self._fuckoffpaul = False
            self._events[self._measureCnt] = event.totalWeight
            self._measureCnt += 1
            add = False
            if self._measureCnt == WEIGHT_SAMPLES:
                self._fuckoffpaul = True
                self._sum = 0
                for x in range(0, WEIGHT_SAMPLES - 1):
                    self._sum += self._events[x]
                self._weight = (self._sum / WEIGHT_SAMPLES) * 1000
                self._weightcontents = self._weight - WEIGHT_BASE
                self.contents = int(round(self._weightcontents / WEIGHT_CONTENTS))
                self._measureCnt = 0
                print str(self._weight) + " grams total, " + str(self._weightcontents) + " grams in contents"
                # print "FRIDGEWEIGHT Before: " + str(FRIDGEWEIGHT)
                global FRIDGEWEIGHT
                print "FRIDGEWEIGHT After: " + str(FRIDGEWEIGHT)
                self._newWeight = self._weight - FRIDGEWEIGHT
                if (self._newWeight > FRIDGEWEIGHT):
                    print "in that fucking if statement"
                    add = True
                FRIDGEWEIGHT = self._weight
                print "newWeight: " + str(self._newWeight) + ", FRIDGEWEIGHT: " + str(FRIDGEWEIGHT) + ", selfWeight: " + str(self._weight)
                if (self.contents != self._contentsPrev) and (self.contents >= 0):
                    if (self._contentsPrev != -1) and (self._contentsPrev > self.contents):
                        for x in range(0, self._contentsPrev - self.contents):
                            print
                            "Item removed"
                    self._contentsPrev = self.contents
                print "Measurement complete!"
                self._takeMeasurement = False
                if add:
                    add_contents(self._newWeight)
                else:
                    delete_contents()
            if not self._measured:
                self._measured = True
        self._doorStatus = event.doorStatus

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
        # convenience value
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
        self.theData = None
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
            print
            "Non existant address"
            return
        self.receivesocket.connect((address, 0x13))
        self.controlsocket.connect((address, 0x11))
        if self.receivesocket and self.controlsocket:
            print
            "Connected to Wiiboard at address " + address
            self.status = "Connected"
            self.address = address
            self.calibrate()
            useExt = ["00", COMMAND_REGISTER, "04", "A4", "00", "40", "00"]
            self.send(useExt)
            self.setReportingType()
            print
            "Wiiboard connected"
        else:
            print
            "Could not connect to Wiiboard at address " + address

    def receive(self):
        # print "recieving"
        while self.status == "Connected" and not self.processor.done:
            # print "in loop"
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

                if (self.theData != None):
                    # self.processor.mass(self.createBoardEvent(data[2:12]))
                    self.processor.mass(self.createBoardEvent(self.theData))
                    self.theData = data[2:12]
                else:
                    self.theData = data[2:12]

            else:
                print "ACK to data write received"

        print "Board Disconnected"

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
        # calibration[0] is calibration values for 0kg
        # calibration[1] is calibration values for 17kg
        # calibration[2] is calibration values for 34kg
        if raw < self.calibration[0][pos]:
            return val
        elif raw < self.calibration[1][pos]:
            val = 17 * ((raw - self.calibration[0][pos]) / float((self.calibration[1][pos] - self.calibration[0][pos])))
        elif raw > self.calibration[1][pos]:
            val = 17 + 17 * (
            (raw - self.calibration[1][pos]) / float((self.calibration[2][pos] - self.calibration[1][pos])))

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
                    self.calibration[i][j] = (int(bytes[index].encode("hex"), 16) << 8) + int(
                        bytes[index + 1].encode("hex"), 16)
                    index += 2
        elif len(bytes) < 16:
            for i in xrange(4):
                self.calibration[2][i] = (int(bytes[index].encode("hex"), 16) << 8) + int(
                    bytes[index + 1].encode("hex"), 16)
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

    # Turns the power button LED on if light is True, off if False
    # The board must be connected in order to set the light
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

    try:
        thread.start_new_thread(scan, ())
    except:
        print "Error: unable to start barcode scanner thread"

    board.receive()


if __name__ == "__main__":
    main()
