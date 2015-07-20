/**
 * Posture
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

var tempx = 0;
var tempy = 0;
var tempz = 0;
var x = 0;
var y = 0;
var z = 0;
var sensitivity = 200;

var running = false;

var main = new UI.Window({
  fullscreen: true,
});

var set = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(134, 30),
  font: 'gothic-24-bold',
  text: 'Start/Stop >',
  textAlign: 'right'
});
main.add(set);

var instructions = new UI.Text({
  position: new Vector2(0, 115),
  size: new Vector2(134, 30),
  font: 'gothic-24-bold',
  text: 'Instructions >',
  textAlign: 'right'
});
main.add(instructions);
main.show();

main.on('click', 'up', function(e) {
  // TODO: add a control for sensitivity 100,200,400,800
});

main.on('click', 'down', function(e) {
  var card = new UI.Card({
    scrollable: true
  });
  card.title('Instructions');
  card.body('1. Hook your watch on the front of your collar.\n2. Sit up straight.\n3. Press the Start/Stop button.\n4. The watch will now vibrate when you slouch.');
  card.show();
});

main.on('click', 'select', function(e) {
  UI.Vibe.vibrate('short');
  if (running) {
    running = false;
  } else {
    // TODO: add a visual indicator to show running status
    running = true;
    x = tempx;
    y = tempy;
    z = tempz;
  }
});

function checkForSlouchOnAxis(value, stored){
  
  // TODO: add a timeout so that we don't detect slouches every second, save battery.
  
  if (value > stored+sensitivity){
    return true;
  }
  if (value < stored-sensitivity) {
    return true;
  }
  return false;
}

Accel.init();
Accel.config({
  rate:10,
  samples:20,
  subscribe:true
});
Accel.on('data', function(e) {
  
  // TODO: wait till first accel before enabling start button.
  
  tempx = e.accel.x;
  tempy = e.accel.y;
  tempz = e.accel.z;
  
  if (running) {
    if (checkForSlouchOnAxis(tempx, x)) {
      UI.Vibe.vibrate('double');
      return;
    }
    if (checkForSlouchOnAxis(tempy, y)) {
      UI.Vibe.vibrate('double');
      return;
    }
    if (checkForSlouchOnAxis(tempz, z)) {
      UI.Vibe.vibrate('double');
      return;
    }
  }
});
