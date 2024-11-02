import mqtt from 'mqtt';  // Import mqtt library

// Thiết lập tùy chọn cho MQTT
const options = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`, // Thêm clientId ngẫu nhiên
    username: 'nhom1', 
    password: '123456', 
    protocol: 'wss', 
};

// Kết nối tới HiveMQ Cloud qua WebSocket
const client = mqtt.connect('wss://99ae98df26c84e4fad0e757738d87df2.s1.eu.hivemq.cloud:8884/mqtt', options);

// Hàm publish message lên topic
const publishMessage = (topic, message) => {
    if (!client.connected) {
        console.error('Chưa kết nối tới MQTT broker.');
        return;
    }

    client.publish(topic, message, (err) => {
        if (err) {
            console.error(`Lỗi khi gửi message lên topic ${topic}:`, err);
        } else {
            console.log(`Message đã được gửi lên topic '${topic}': ${message}`);
        }
    });
};

// Xuất hàm publishMessage
module.exports = {
    publishMessage
};
