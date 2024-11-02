import userService from '../services/userService';
import {publishMessage} from './pub';
import mqtt from 'mqtt';

const options = {
  clientId: `mqtt_${Math.random().toString(16).slice(3)}`, // Thêm clientId ngẫu nhiên
  username: 'nhom1', 
  password: '123456',
  protocol: 'wss', // Kết nối qua giao thức wss (WebSocket Secure)
};

// Kết nối tới HiveMQ Cloud qua WebSocket
const client = mqtt.connect('wss://99ae98df26c84e4fad0e757738d87df2.s1.eu.hivemq.cloud:8884/mqtt', options);

client.on('connect', () => {
  console.log('Đã kết nối tới HiveMQ Cloud!');

  // Subscribe vào topic "topic/rfid"
  client.subscribe('topic/rfid', (err) => {
    if (err) {
      console.error('Lỗi khi subscribe vào topic:', err);
    }
  });
});

// Lắng nghe và xử lý dữ liệu từ MQTT broker
client.on('message', async (topic, message) => {
  const receivedMessage = message.toString(); // Chuyển buffer thành chuỗi

  console.log(`Nhận được từ topic ${topic}: ${receivedMessage}`);

  if (topic === 'topic/rfid') {
    try {
      // Gọi hàm getUserByRfid và đợi kết quả
      let resUser = await userService.getUserByRfid(receivedMessage);
      // Kiểm tra nếu tìm thấy user với rfid
      if (resUser && resUser.errCode===0) {
        let userData = resUser.data; // Lấy user từ danh sách trả về
        // Thêm vào bảng timekeeping và history với thông tin từ user
        let dataInput = {
          id: userData.id, // Giả sử user có trường id
          timestamp: new Date().getTime() ,// Thời gian hiện tại,
          note:""
        };

        // Gọi hàm để thêm thông tin vào bảng timekeeping và history
        let res = await userService.createTimeKeepingAndHistory(dataInput);
        if (res && res.errCode === 0) {
          publishMessage('topic/lcd', res.errMessage);
        } else if (res && res.errCode === 2) {
          publishMessage('topic/lcd', res.errMessage,client);
        }
      } else {
        console.log('Không tìm thấy user với RFID này.');
      }
    } catch (error) {
      console.error('Lỗi khi xử lý message:', error);
    }
  }
});