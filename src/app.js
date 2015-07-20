/**
 * Posture
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

var x = 0;
var y = 0;
var z = 0;
var sensitivity = 200;

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
});

Accel.init();
Accel.config({
  rate:10,
  samples:8,
  subscribe:true
});
Accel.on('data', function(e) {
  console.log('x: '+e.accel.x+' y: '+e.accel.y+' z: '+e.accel.z);
});
