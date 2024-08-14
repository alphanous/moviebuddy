const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/moviebuddy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connection successful');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define User model
const User = mongoose.model('User', userSchema);

// Routes
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello from Thala');
});

// Register endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: '!email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

app.post('/login',async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({message:'!user not found'})
        }
        const passwordmatch = await bcrypt.compare(req.body.password,user.password);
        if(!passwordmatch){
            return res.status(400).json({message:'!password does not match'})
        }
        res.status(201).json({
            message:'login successful',
            user:{
                name:user.name,
                email:user.email
            }
        });
        console.log('login sucessful', user);
    }
    catch{
        res.status(500).json({error:'server error'})
    }
})


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
