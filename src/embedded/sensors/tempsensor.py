import os
import glob
import time

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

BASE_DIR = '/sys/bus/w1/devices/'
DEVICE_FOLDER = glob.glob(BASE_DIR + '28*')[0]
DEVICE_FILE = DEVICE_FOLDER + '/w1_slave'

def readTempRaw():
    f = open(DEVICE_FILE, 'r')
    lines = f.readlines()
    f.close()
    return lines

def readTemp():
    lines = readTempRaw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = readTempRaw()
    equalsPos = lines[1].find('t=') # Omitting device Id from return array
    if equalsPos != -1:
        tempString = lines[1][equalsPos+2:]
        tempC = float(tempString) / 1000.0 # Temp is given as raw. Divide by 1000 to get correct form (20.567C for example)
        return tempC

while True:
    tempC = readTemp()
    print str(tempF) + " C"
    time.sleep(.5)
