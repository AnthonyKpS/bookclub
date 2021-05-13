async function showAllBooksHandler(e) {

    /**
     * Grab the table,
     *          table's body,
     *          table's title
     */
    const table = document.getElementById("show-all-books-table")
    const tableTitle = document.getElementById("show-all-books-table-title")
    const tableBody = document.getElementById("show-all-books-table-body")

    // Build the show-all query url
    const url = new URL("http://localhost:3000/books") // Comes from the Bookclub API specification
    
    // Make the request
    try {
        fetch(url)
            .then(response => response.json())
            .then(data => {

                // Update the books' table
                updateBooksTable(table, tableTitle, tableBody, data.books)
            })
    } catch (error) {
        showToastNotification(false, error.message)
    }
}