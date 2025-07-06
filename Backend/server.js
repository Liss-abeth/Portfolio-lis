const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const projectRoutes = require('./Routes/ProjectRoutes');
const homeRoutes = require('./Routes/homeRouter'); 
const contactRoutes = require('./Routes/contactRouter'); 
const adminRoutes = require('./Routes/adminRoutes'); 

// ✅ Load env first!
dotenv.config();

const dbConnect = require('./Config/db');
dbConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/home', homeRoutes); 
app.use('/contact', contactRoutes); 
app.use('/admin', adminRoutes); 

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

