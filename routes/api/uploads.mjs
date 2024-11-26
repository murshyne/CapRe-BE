import express from 'express';
import { upload } from '../../middleware/upload.mjs'; 
import auth from '../../middleware/auth.mjs'; 
import cloudinary from '../../config/cloudinary.mjs';
import fs from 'fs';
import User from '../../models/User.mjs'; 


const router = express.Router();

// @route    POST api/users/upload/:id
// @desc     Upload profile picture
// @access   Private
router.post('/', [auth, upload], async (req, res) => {
    try {
      const userId = req.user.id;
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ errors: [{ msg: 'No file uploaded' }] });
      }
        // Upload the image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path);
  
      // Get the image URL from Cloudinary response
      const profilePictureUrl = result.secure_url;
  
      // Generate an optimized image URL (auto format and quality)
      const optimizedUrl = cloudinary.url(result.public_id, { fetch_format: 'auto', quality: 'auto' });
  
      // Update the user's profile picture URL in the database
      const user = await User.findByIdAndUpdate(req.params.id, { profilePicture: optimizedUrl }, { new: true });
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Delete the temporary file from the local server
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting temporary file:', err);
        } else {
          console.log('Temporary file deleted');
        }
      });
  
      // Respond with the updated user profile including the new profile picture
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

  export default router;
