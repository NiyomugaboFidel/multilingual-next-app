
import Mark_Notifications from "../database/models/mark_notifications";
import Notifications from "../database/models/notification";

export const markNotificationsAsRead = async (req, res) => {
  const  notificationId = req.params.id; 
  try {
   const userId=req.user.id
    if (notificationId) {
      const notification = await Notifications.findOne({ where: { id:notificationId,receiverId:userId } });

      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      notification.is_read = true;
      await notification.save();
      return res.status(200).json({ message: 'Notification marked as read',notification });
    } 
  } 
  catch (error) {
      return res.status(500).json({ message: 'Server Error' });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
   try {
    const userId=req.user.id
     {
       const notifications = await Notifications.findAll({ where: { receiverId:userId , is_read: false} });
        //  console.log(notifications);
       if (!notifications) {
         return res.status(404).json({ error: 'Notification not found' });
       }
        await Promise.all([
            notifications.map(async (notification)=>{
                notification.is_read = true
             await notification.save();
            })
        ])
       return res.status(200).json({ message: 'All notifications marked as read', notifications });
     } 
   } 
   catch (error) {
         return res.status(500).json({ message: 'Server Error' });
       }
 };

export const getAllnotifications = async (req, res) => {
   try {
    const userId=req.user.id
     {
       const notifications = await Notifications.findAll({ where: { receiver:userId}  },{
        order:[
            ['createdAt','DESC']
        ]
     });
 
       if (!notifications) {
         return res.status(404).json({ error: 'Notification not found' });
       }
       await Promise.all([
        notifications.map(async (notification)=>{
            notification.is_read = true
         await notification.save();
        })
    ])
       return res.status(200).json({ message: 'All notifications marked as read',notifications ,});
     } 
   } 
   catch (error) {
         return res.status(500).json({ message: 'Server Error' });
       }
 };

