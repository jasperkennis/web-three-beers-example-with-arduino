# Three.js Beers with Arduino over Serial

This demo extends upon Kevins' work with Threejs to expose the experience beyond the browser, into the real world using Arduino. It uses the [experimental SerialPort browser API](https://developer.mozilla.org/en-US/docs/Web/API/SerialPort), currently available in Chrome.

## Capabilities

- The potentiometer lets you change the background color. This demonstrates how the Arduino can communicate to the web app.
- There is one LED for each type of beer. When you click on one of the cans, the corresponding LED will light up. This demonstrated communication from the web app towards the Arduino.

## Requirements

Arduino kit including:

- 3 x LED (red, yellow and blue for the most fun effect)
- 3 Ω220 resistors
- 1 potentiometer
- a usb connection to connect the Arduino to your computer

All the above is included in the Arduino Starter Kit or can be ordered online.

You will also need some method to upload software to your Arduino board (the Arduino IDE will do).

## Using it

**1. Create the board:**

Implement this schema:

![schema](https://raw.githubusercontent.com/jasperkennis/web-three-beers-example-with-arduino/add-integration-with-arduino/docs/electrical-schematics.png)

**2. Load the program onto the board:**

Using your preferred IDE, load the [software](arduino/board-with-light-and-potentiometer.ino) onto the board.

**3. Run the app:**

In terms of running the code, this is a fairly standard project; install the required version of Node if desired, then run `yarn` to install dependencies and `yarn dev` to start a local dev server.

**4. Prepare to connect the app:**

Connect the board to your computer through USB. Only one program can connect on the serial port at a time, so make sure you have nothing connecting to the serial port that the Arduino is on, or the webapp will not be able to connect.

⚠️ The Arduino IDE has a Serial Monitor build in. Make sure this is off.

⚠️ Whenever you want to load new software onto the Arduino board, you might be blocked because the web app is still connected. The easiest way to close that connection is just to refresh the browser.

**5. Connecting the app to the Arduino:**

Once everything is running, click on the ugly link at the top of the screen. A prompt will open to ask what port you wish to connect to. You can trail and error, but it will be the same port as Arduino IDE is using to upload software.

Now have fun!
