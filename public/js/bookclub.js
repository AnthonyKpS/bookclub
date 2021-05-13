function postFormDataAsJson({ url, formData }) {

    return new Promise(async (resolve, reject) => {

        // Construct an Object from the Form data fields
        const plainFormData = Object.fromEntries(formData.entries());

        // Change price's type from "string" to "float"
        plainFormData.price = parseFloat(plainFormData.price)

        // Obj to JSON
        const formDataJsonString = JSON.stringify(plainFormData);

        // Request options
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: formDataJsonString,
        };

        try {
            const response = await fetch(url, fetchOptions)
            resolve(response.json())
        } catch (error) {
            reject(error)
        }
    })
}

async function bookInsertionHandler(e) {

    // Prevent refreshing
    e.preventDefault()

    // Grab the form
    const form = e.currentTarget

    // Prepare the request URL
    const url = new URL("http://localhost:3000/books") // Comes from the Bookclub API specificatio

    try {
        const formData = new FormData(form)
        const responseData = await postFormDataAsJson({ url, formData })

        if (responseData.book_insertion) {
            form.reset()
            showToast(responseData.message)
        }
    } catch (error) {
        console.error(error)
    }
}

async function bookSearchHandler(e) {

    // Prevent refreshing
    e.preventDefault()

    // Grab the form and the table's title and body
    const form = e.currentTarget
    const table = document.getElementById("book-search-results-table")
    const tableBody = document.getElementById("book-search-results-table-body")
    const tableTitle = document.getElementById("book-search-results-table-title")

    // Grab the required field from the form
    const keywordFieldValue = new FormData(form).get('keyword')

    // Build the query url
    const url = new URL("http://localhost:3000/books?") // Comes from the Bookclub API specificatio
    const searchParams = new URLSearchParams({
        keyword: keywordFieldValue
    }).toString()

    // Do the request
    try {
        resetBooksTableBody(tableBody)
        fetch(url + searchParams)
            .then(response => response.json())
            .then(data => {
                const numberOfBooks = data.books.length
                if (numberOfBooks > 0) {
                    tableTitle.innerHTML = "Found " + numberOfBooks + " books"
                    populateBooksTableBody(tableBody, data.books)
                    if (table.classList.contains("d-none")) {
                        table.classList.remove("d-none")
                    }
                } else {
                    if (!table.classList.contains("d-none")) {
                        table.classList.add("d-none")
                    }
                    tableTitle.innerHTML = "Found 0 books"
                }
            })
        form.reset()
    } catch (error) {
        console.log(error)
    }
}

async function showAllBooksHandler(e) {
    // Grab the table, table's title and table's body
    const table = document.getElementById("show-all-books-table")
    const tableTitle = document.getElementById("show-all-books-table-title")
    const tableBody = document.getElementById("show-all-books-table-body")

    // Do the request
    const url = new URL("http://localhost:3000/books") // Comes from the Bookclub API specificatio
    try {
        resetBooksTableBody(tableBody)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                
                // Number of books found
                const numberOfBooks = data.books.length
                if (numberOfBooks > 0) {
                    tableTitle.innerHTML = "Found " + numberOfBooks + " books"
                    populateBooksTableBody(tableBody, data.books)
                    if (table.classList.contains("d-none")) {
                        table.classList.remove("d-none")
                    }
                } else {
                    if (!table.classList.contains("d-none")) {
                        table.classList.add("d-none")
                    }
                    tableTitle.innerHTML = "Found 0 books"
                }
            })
    } catch (error) {
        console.log(error)
    }
}

function populateBooksTableBody(table, books) {
    books.forEach(book => {

        let row = table.insertRow()

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
}

function resetBooksTableBody(table) {
    table.innerHTML = ""
}

function showToast(message) {

    var option = {
        animation: true,
        delay: 5000
    }

    var toastHTMLElement = document.getElementById("liveToast")
    document.getElementById("toastBody").innerHTML = message

    var toastElement = new bootstrap.Toast(toastHTMLElement, option)
    toastElement.show()
}

// Book insertion functionality
const bookInsertionForm = document.getElementById("bookAdd")
bookInsertionForm.addEventListener('submit', bookInsertionHandler)

// Book search functionality
const bookSearchForm = document.getElementById("bookSearch")
bookSearchForm.addEventListener('submit', bookSearchHandler)

// Show all books functionality
const showAllBooksTabButton = document.getElementById("contact-tab")
showAllBooksTabButton.addEventListener('click', showAllBooksHandler)

