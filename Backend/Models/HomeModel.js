const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the homepage or the section
  description: { type: String, required: true }, // A brief introduction or description for the homepage
  image: { type: String }, // URL for a background image or relevant homepage image
  introText: { type: String }, // Text for an introductory paragraph or message
  features: [
    {
      title: { type: String, required: true }, // Title for a feature/section on the homepage
      description: { type: String, required: true }, // Description of that feature
    }
  ],
  testimonials: [
    {
      userName: { type: String, required: true }, // Name of the user/testimonial giver
      feedback: { type: String, required: true }, // Their feedback for your site or service
    }
  ],
  contactInfo: {
    email: { type: String, required: true }, // Contact email address
    phone: { type: String }, // Contact phone number (optional)
    socialLinks: [
      { type: String } // Array of social media links (could be URLs)
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);
