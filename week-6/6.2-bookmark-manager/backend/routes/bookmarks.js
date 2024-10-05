let bookmarks = [];

function health(req, res) {
    res.status(200).send("I am healthy");
}

async function addBookmark(req, res) {
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({ message: 'Title and URL are required' });
    }

    const newBookmark = {
        id: Date.now(),
        title,
        url,
        favorite: false,
    };

    bookmarks.push(newBookmark);
    res.status(201).json(newBookmark);
}

async function deleteBookmark(req, res) {
    const id = Number(req.params.id);

    bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    res.status(204).send();
}

async function getAllBookmarks(req, res) {
    res.json(bookmarks);
}

async function toggleFavorite(req, res) {
    const id = Number(req.params.id);
    console.log(`Toggling favorite for bookmark with ID: ${id}`); // Debug log
    const bookmark = bookmarks.find(b => b.id === id);

    if (!bookmark) {
        return res.status(404).json({ message: 'Bookmark not found' });
    }

    bookmark.favorite = !bookmark.favorite;
    console.log(`Updated favorite status: ${bookmark.favorite}`); // Debug log
    res.json(bookmark);
}


module.exports = {
    addBookmark,
    deleteBookmark,
    getAllBookmarks,
    health,
    toggleFavorite,
};
