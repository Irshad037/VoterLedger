import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import bcrypt from "bcryptjs";
import cookieParser from 'cookie-parser';


import connectMongoDB from './src/config/mongodb.js';
import authRoutes from './src/routes/auth.route.js';
import electionRoutes from './src/routes/election.routes.js';
import candidateRoutes from './src/routes/candidate.route.js';
import manifestoRoutes from './src/routes/manifesto.route.js';
import applicationRoutes from './src/routes/electionApplication.route.js';

const app = express();

//CORS allow frontend to talk to backend
app.use(cors({
    origin: "http://localhost:5173", // ✅ allow frontend
    credentials: true,               // ✅ allow cookies
}));


// Parse incoming JSON requests (with large payload support)
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("api is working")

})

app.use('/api/auth', authRoutes);
app.use('/api/election', electionRoutes);
app.use('/api/candidate', candidateRoutes);
app.use("/api/manifesto", manifestoRoutes);
app.use("/api/application", applicationRoutes);


const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectMongoDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();