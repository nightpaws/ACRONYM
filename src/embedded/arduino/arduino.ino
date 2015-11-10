#include "OneWire.h"
#include "DallasTemperature.h"

#define ONE_WIRE_BUS 8

#define DOOR_SENSOR 2

#define DOOR_OPEN 0 //low current
#define DOOR_CLOSED 1 //high current

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup(void) {
  
  Serial.begin(9600);

  pinMode(DOOR_SENSOR, INPUT);
  
  sensors.begin();

}

void loop(void) {

  //Get Temperature
  sensors.requestTemperatures();
  int temperature = sensors.getTempCByIndex(0);
  
  Serial.print("Temperature is: ");
  Serial.println(temperature);

  //Get State of Door
  int doorStatus = DOOR_CLOSED;
  
  if(digitalRead(DOOR_SENSOR) == HIGH) {
    //door is closed
    doorStatus = DOOR_OPEN;
    Serial.println("Door is open");
  } else if(digitalRead(DOOR_SENSOR) == LOW){
    //door is open
    doorStatus = DOOR_CLOSED;
    Serial.println("Door is closed");
  } else {
    //something has gone wrong
    Serial.println("Door is knackered");
  }

  //Write Temperature && Door State
  Serial.write(temperature);
  Serial.write(doorStatus);

  delay(500);

}

