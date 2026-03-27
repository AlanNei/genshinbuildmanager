import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get("/api/player/:uid", async (req, res)=>{
    const {uid} = req.params;

    try {
        const response = await fetch(`https://enka.network/api/uid/${uid}`, {
            headers: {
                "User-agent": "genshin-build-manager"
            }
        });

        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({error: "Error fetching player"});
    }
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
