
import Mark_Notifications from "../database/models/mark_notifications";

export const markNotificationsAsRead = async (req, res) => {
  const  notificationId = req.params.id; 
  try {
   const userId=req.user.id
    if (notificationId) {
      const notification = await Mark_Notifications.findOne({ where: {  notificationId,receiverId:userId } });

      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      notification.is_read = true;
      await notification.save();
      return res.status(200).json({ message: 'Notification marked as read' });
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
       const notification = await Mark_Notifications.findAll({ where: { receiverId:userId , is_read: false} });
 
       if (!notification) {
         return res.status(404).json({ error: 'Notification not found' });
       }
       await Mark_Notifications.update({ is_read: true }, { where: { receiverId:userId } });
       return res.status(200).json({ message: 'All notifications marked as read' });
     } 
   } 
   catch (error) {
         return res.status(500).json({ message: 'Server Error' });
       }
 };

