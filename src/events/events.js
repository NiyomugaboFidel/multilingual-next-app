import { io } from "./socket/socket";

io.on('response',(message)=>{
    console.log(message)
})
io.on('passwordExpiration',(message)=>{
    console.log(message);
})
io.on('wish-notification', (notificationDetails) => {
    io.emit('notifySeller', notificationDetails)
})
io.on('expired-notification', (notificationDetails) => {
    io.emit('notifySellers', notificationDetails)
})
io.on('order-notification', (notificationDetails) => {
    io.emit('notifyBuyer', notificationDetails)
})
io.on('newOrder-notification', (notificationDetails) => {
    io.emit('newOrderNotification', notificationDetails)
})
export{io} 