function updateBooksTable(table, tableTitle, tableBody, books) {

    // Reset the table's body
    resetBooksTableBody(tableBody)

    const numberOfBooksFound = books.length

    // Update the title
    tableTitle.innerHTML = "Found " + numberOfBooksFound + " books"

    if (numberOfBooksFound > 0) {

        // Populate the table's body
        books.forEach(book => {

            let row = tableBody.insertRow()

            // id
            let id = row.insertCell(0)
            id.innerHTML = book.id

            // Author
            let author = row.insertCell(1)
            author.innerHTML = book.author

            // Title
            let title = row.insertCell(2)
            title.innerHTML = book.title

            // Genre
            let genre = row.insertCell(3)
            genre.innerHTML = book.genre

            // Price
            let price = row.insertCell(4)
            price.innerHTML = book.price
        });

        // If the table is hidden, show it to the user
        if (table.classList.contains("d-none")) {
            table.classList.remove("d-none")
        }
    } else {

        // If the table is being shown to the user, hide it
        if (!table.classList.contains("d-none")) {
            table.classList.add("d-none")
        }
        tableTitle.innerHTML = "Found 0 books"
    }
}

function resetBooksTableBody(tableBody) {
    tableBody.innerHTML = ""
}

function showToastNotification(success, message) {

    // Prepare the toast's options
    var option = {
        animation: true,
        delay: 5000
    }

    /**
     * Grab the toast,
     *          toast's header,
     *          toast's body
     */
    const toast = document.getElementById("liveToast")
    const toastHeader = document.getElementById("toast-header")
    const toastBody = document.getElementById("toast-body")

    // Update the toast's header according to the success variable
    if (success) {
        if (toastHeader.classList.contains("bg-danger")) {
            toastHeader.classList.remove("bg-danger")
        }
        toastHeader.classList.add("bg-success")
    } else {
        if (toastHeader.classList.contains("bg-success")) {
            toastHeader.classList.remove("bg-success")
        }
        toastHeader.classList.add("bg-danger")
    }

    // Update the toast's body
    document.getElementById("toast-body").innerHTML = message

    // Show the toast
    const toastElement = new bootstrap.Toast(toast, option)
    toastElement.show()
}

// Book insertion functionality
const bookInsertionForm = document.getElementById("book-insertion-form")
bookInsertionForm.addEventListener('submit', bookInsertionHandler)

// Book search functionality
const bookSearchForm = document.getElementById("book-search-form")
bookSearchForm.addEventListener('submit', bookSearchHandler)

// Show all books functionality
const showAllBooksTabButton = document.getElementById("show-all-books-tab")
showAllBooksTabButton.addEventListener('click', showAllBooksHandler)