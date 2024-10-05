const apiUrl = "http://localhost:3001";

async function loadBookmarks(query = '') {
    try {
        const response = await fetch(`${apiUrl}/bookmarks`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const bookmarks = await response.json();
        const bookmarksList = document.getElementById('bookmarks');
        const favoritesList = document.getElementById('favorites');
        bookmarksList.innerHTML = '';
        favoritesList.innerHTML = '';

        const filteredBookmarks = bookmarks.filter(bookmark => {
            return bookmark.title.toLowerCase().includes(query.toLowerCase()) || 
                   bookmark.url.toLowerCase().includes(query.toLowerCase());
        });

        filteredBookmarks.forEach(bookmark => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
                <button onclick="toggleFavorite(${bookmark.id})">${bookmark.favorite ? 'Unfavorite' : 'Favorite'}</button>
                <button onclick="deleteBookmark(${bookmark.id})">Delete</button>
            `;
            if (bookmark.favorite) {
                favoritesList.appendChild(li);
            } else {
                bookmarksList.appendChild(li);
            }
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function addBookmark() {
    const titleInput = document.getElementById('title');
    const urlInput = document.getElementById('url');
    let title = titleInput.value.trim();
    let url = urlInput.value.trim();

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }

    if (!title || !url) {
        alert('Please enter both a title and a URL.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/bookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, url })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        titleInput.value = '';
        urlInput.value = '';

        loadBookmarks();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function deleteBookmark(id) {
    try {
        const response = await fetch(`${apiUrl}/bookmarks/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        loadBookmarks();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function toggleFavorite(id) {
    try {
        console.log(`Sending request to toggle favorite for ID: ${id}`); // Debug log
        const response = await fetch(`${apiUrl}/bookmarks/favorite/${id}`, {
            method: 'PATCH'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        loadBookmarks(); // Refresh the bookmarks list
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


document.getElementById('addBookmark').addEventListener('click', addBookmark);

document.getElementById('searchInput').addEventListener('input', (event) => {
    loadBookmarks(event.target.value);
});

window.onload = () => loadBookmarks();
