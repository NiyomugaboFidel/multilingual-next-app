import User from "../database/models/user"; // Adjust the import according to your project structure
import { sendEmail } from "../services/sendEmail.service";


export const updateUserStatus = async (req, res) => {
  console.log('ID:', req.params.id); // Log the ID to debug
  const adminData = req.user; // User is set by Passport after successful authentication
  if (adminData.role !== 'admin') {
    return res.status(403).json({ error: 'Only admin users can update user status' });
  }

  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedIsActive = !user.isActive;
    await User.update({ isActive: updatedIsActive }, { where: { id: req.params.id } });
    // console.log(user);
    const {email, firstName} = user
    // console.log('user email ',email,firstName);
    const subject = `Acount ${updatedIsActive ? 'Active' : 'Unactive'} -VIRUNGA ONLINE SHOP.`
    const content = `According to your account information Our team Deside to ${updatedIsActive ? 'UnBlock': 'Block'} your account`
    const sms = `Your Account is ${updatedIsActive ? 'UnBlocked': 'Blocked'}`

    await sendEmail(email,firstName,subject,content,sms);

    return res.status(200).json({ user: { ...user.toJSON(), isActive: updatedIsActive } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const assignUserRole = async (req, res) => {
  console.log('ID:', req.params.id); // Log the ID to debug
  const adminData = req.user; // User is set by Passport after successful authentication
  if (adminData.role !== 'admin') {
    return res.status(403).json({ error: 'Only admin users can update user roles' });
  }

  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { newRole } = req.body;
    if (!['admin', 'seller', 'buyer'].includes(newRole)) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    await User.update({ role: newRole }, { where: { id: req.params.id } });
    console.log(user);
    const {email, firstName} = user
    console.log('user email ',email,firstName);
    const subject = `Role Changed to Team Member -VIRUNGA ONLINE SHOP.`
    const content = `According to your account information Our team Deside to  change your role  from ${user.role} to ${newRole}`
    const sms = `Your Account role Changed to ${newRole}`

    await sendEmail(email,firstName,subject,content,sms);
    return res.status(200).json({ message: 'New role assigned successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
