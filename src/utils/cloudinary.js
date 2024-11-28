const { uploader } = require("cloudinary").v2;
import cloudinary from'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  });

  const cloudinaryUploadImg = async(fileToUploads)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(fileToUploads, (result)=>{
          resolve(
            {
                url:result.secure_url,
            },
            {
                resource_type:"auto",
            }
          );
        });
    });
  };
  export const cloudinaryDeleteImg = async (url) => {
    try {
      // Extract public_id from the URL
      const publicId = url.split("/").slice(-1)[0].split(".")[0];
      const result = await uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error("Cloudinary Delete Error:", error);
      throw error;
    }
  };
  
  export default cloudinaryUploadImg;