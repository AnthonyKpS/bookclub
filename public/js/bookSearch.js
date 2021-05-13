async function bookSearchHandler(e) {

    // Prevent default behaviour (e.g. refreshing)
    e.preventDefault()

    /**
     * Grab the form,
     *          table,
     *          table's body,
     *          table's title
     */
    const form = e.currentTarget
    const table = document.getElementById("book-search-results-table")
    const tableBody = document.getElementById("book-search-results-table-body")
    const tableTitle = document.getElementById("book-search-results-table-title")

    // Grab the keyword field's value
    const keywordFieldValue = new FormData(form).get('keyword')

    // Build the search query url
    const url = new URL("http://localhost:3000/books?") // Comes from the Bookclub API specification
    const searchParams = new URLSearchParams({
        keyword: keywordFieldValue
    }).toString()

    // Make the request
    fetch(url + searchParams)
        .then(response => response.json())
        .then(data => {

            // Reset the books' table body
            resetBooksTableBody(tableBody) 

            // Update the books' table
            updateBooksTable(table, tableTitle, tableBody, data.books)

            // Reset the form
            form.reset()
        })
        .catch(error => {
            showToastNotification(false, error.message)
        })
}