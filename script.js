document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');
    const searchInput = document.getElementById('search');
    const historyList = document.getElementById('history-list');

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let history = JSON.parse(localStorage.getItem('history')) || [];

    function renderBooks() {
        bookList.innerHTML = '';
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            book.author.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        filteredBooks.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${book.title}</strong> by ${book.author} <button onclick="borrowBook('${book.title}')">Borrow</button>`;
            bookList.appendChild(li);
        });
    }

    function renderHistory() {
        historyList.innerHTML = '';
        history.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `Borrowed: ${record.title} on ${record.date}`;
            historyList.appendChild(li);
        });
    }

    window.borrowBook = function(title) {
        const now = new Date();
        history.push({ title, date: now.toLocaleDateString() });
        localStorage.setItem('history', JSON.stringify(history));
        renderHistory();
    };

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const category = document.getElementById('category').value;
        
        books.push({ title, author, category });
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
        
        bookForm.reset();
    });

    searchInput.addEventListener('input', renderBooks);

    renderBooks();
    renderHistory();
});
