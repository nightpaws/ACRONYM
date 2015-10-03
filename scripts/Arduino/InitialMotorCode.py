// if you need PWM, just use the PWM outputs on the Arduino
// and instead of digitalWrite, you should use the analogWrite command

// Motor Pin Locations
int motor_left[] = {2, 3};
int motor_right[] = {7, 8};

// Setup
void setup() {
  // Using default port of 9600
  Serial.begin(9600);

  // Setup motors
  int i;
  for(i = 0; i < 2; i++){
    pinMode(motor_left[i], OUTPUT);
    pinMode(motor_right[i], OUTPUT);
  }
}

// Functioning Loop
void loop() {
// Set delay between commands to be 1 sec. Feel free to amend.
drive_forward();
delay(1000);
motor_stop();
Serial.println("Moving Forward");

drive_backward();
delay(1000);
motor_stop();
Serial.println("Moving Backward");

turn_left();
delay(1000);
motor_stop();
Serial.println("Moving Left");

turn_right();
delay(1000);
motor_stop();
Serial.println("Moving Right");

motor_stop();
delay(1000);
motor_stop();
Serial.println("Stopping Motor");
}

// Drive Functions

void motor_stop(){
digitalWrite(motor_left[0], LOW);
digitalWrite(motor_left[1], LOW);

digitalWrite(motor_right[0], LOW);
digitalWrite(motor_right[1], LOW);
delay(25);
}

void drive_forward(){
digitalWrite(motor_left[0], HIGH);
digitalWrite(motor_left[1], LOW);

digitalWrite(motor_right[0], HIGH);
digitalWrite(motor_right[1], LOW);
}

void drive_backward(){
digitalWrite(motor_left[0], LOW);
digitalWrite(motor_left[1], HIGH);

digitalWrite(motor_right[0], LOW);
digitalWrite(motor_right[1], HIGH);
}

void turn_left(){
digitalWrite(motor_left[0], LOW);
digitalWrite(motor_left[1], HIGH);

digitalWrite(motor_right[0], HIGH);
digitalWrite(motor_right[1], LOW);
}

void turn_right(){
digitalWrite(motor_left[0], HIGH);
digitalWrite(motor_left[1], LOW);

digitalWrite(motor_right[0], LOW);
digitalWrite(motor_right[1], HIGH);
}
