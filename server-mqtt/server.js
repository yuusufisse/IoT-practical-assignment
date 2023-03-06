const mqtt = require('mqtt')
const express = require('express')

const port = 3000
const app = express()

var client  = mqtt.connect("mqtt://192.168.106.129:1883")

var temperature;
var humidity;

client.subscribe('esp32/dht/temperature');
client.subscribe('esp32/dht/humidity');

client.on('message', function(topic, message, packet) {
  if (topic === 'esp32/dht/temperature') {
    temperature = message;
  }

  if (topic === 'esp32/dht/humidity') {
    humidity = message;
  }

  if (temperature && humidity) {
     console.log("----");
     console.log("Temperature: %s", temperature);
     console.log("----");
     console.log("Humidity: %s", humidity);

     temperature;
     humidity;
  }
});

app.get('/main', function(req, res) {
    const mess = '<h2 style="color:black;text-align:center;">Sensor Readings</h2> <p style="text-align:center;font-size: 20px;">Temperature: ' + temperature  + ' °C' + '</p> <p style="color:black;text-align:center;font-size: 20px;">Humidity: ' + humidity + ' %' + '</p>';
    res.send(mess);
});

app.get("/", (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});