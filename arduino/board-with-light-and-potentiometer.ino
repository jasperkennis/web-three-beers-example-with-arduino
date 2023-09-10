const int potentiometerPin = A1;
const int redLEDPin = 7;
const int yellowLEDPin = 2;
const int blueLEDPin = 3;

void setup()
{
  pinMode(redLEDPin, OUTPUT);
  pinMode(yellowLEDPin, OUTPUT);
  pinMode(blueLEDPin, OUTPUT);

  Serial.begin(9600);
}

void toggleLights(int mode)
{
  digitalWrite(redLEDPin, LOW);
  digitalWrite(yellowLEDPin, LOW);
  digitalWrite(blueLEDPin, LOW);

  switch (mode)
  {
  case 1:
    digitalWrite(redLEDPin, HIGH);
    break;
  case 2:
    digitalWrite(yellowLEDPin, HIGH);
    break;
  case 3:
    digitalWrite(blueLEDPin, HIGH);
    break;
  }
}

void readFromStream()
{
  if (!Serial.available())
  {
    return;
  }

  String incomingString = Serial.readStringUntil('\n');
  int stringAsInt = incomingString.toInt();

  toggleLights(stringAsInt);
}

void loop()
{
  // Always write the current state of the potentiometer to the serial port.
  // Device by 4 since it reads 1024 but this is an uncommonly high resolution.
  Serial.write(analogRead(potentiometerPin) / 4);

  readFromStream();

  delay(100);
}
