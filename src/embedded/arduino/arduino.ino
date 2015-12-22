#include "OneWire.h"
#include "DallasTemperature.h"

#define ONE_WIRE_BUS 8

#define DOOR_SENSOR 2
#define LED 13

#define DOOR_OPEN 0 //low current
#define DOOR_CLOSED 1 //high current

long lastTime = 0;
long debounce = 200;

int doorReading;
int doorState;

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup(void) {
  
  Serial.begin(9600);

  pinMode(DOOR_SENSOR, INPUT);
  pinMode(LED, OUTPUT);
  
  sensors.begin();

}

void loop(void) {

  //Get Temperature
  sensors.requestTemperatures();
  int temperature = sensors.getTempCByIndex(0);
  
//  Serial.print("Temperature: ");
//  Serial.println(temperature);

  //Get State of Door
  doorReading = digitalRead(DOOR_SENSOR);

  if(doorReading == LOW && millis() - lastTime > debounce) {

    digitalWrite(LED, LOW);
    doorState = DOOR_CLOSED;
    
//    Serial.println("Door is closed");

    lastTime = millis();
     
  } else {
    
    digitalWrite(LED, HIGH);
    doorState = DOOR_OPEN;
    
//    Serial.println("Door is open");

  }

  //Write Temperature && Door State
//  Serial.write(temperature);
//  Serial.write(doorState);

  int data[2] = {temperature, doorState};
  
  Serial.write((uint8_t*)data, sizeof(data));
}

