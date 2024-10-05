const express = require('express');
const cors = require('cors');
const { addBookmark, deleteBookmark, getAllBookmarks, health, toggleFavorite } = require('./routes/bookmarks');
const app = express();
const PORT = 3001;

const corsOptions = {
    origin: 'http://127.0.0.1:3001',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', health);
app.get('/bookmarks', getAllBookmarks);
app.post('/bookmarks', addBookmark);
app.delete('/bookmarks/:id', deleteBookmark);
app.patch('/bookmarks/favorite/:id', toggleFavorite);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
