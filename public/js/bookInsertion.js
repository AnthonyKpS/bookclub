function postFormDataAsJson({ url, formData }) {

    return new Promise(async (resolve, reject) => {

        // Construct an Object from the Form data fields
        const plainFormData = Object.fromEntries(formData.entries());

        // Change price's type from "string" to "float"
        plainFormData.price = parseFloat(plainFormData.price)

        // Obj to JSON
        const formDataJsonString = JSON.stringify(plainFormData);

        // Setup the request's options
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: formDataJsonString,
        };

        // Make the request
        try {
            fetch(url, requestOptions)
            .then( response => resolve(response.json())) // returns the response as json 
        } catch (error) {
            reject(error) // or the error
        }
    })
}

async function bookInsertionHandler(e) {

    // Prevent default behaviour (e.g. refreshing)
    e.preventDefault()

    // Grab the form
    const form = e.currentTarget

    // Build the book-insertion query url
    const url = new URL("http://localhost:3000/books") // Comes from the Bookclub API specification

    // Construct a FormData obj from the grabbed form
    const formData = new FormData(form)
 
    // Post the form data
    try {
        const response = await postFormDataAsJson({ url, formData })

        if (response.book_insertion) {
            form.reset()
            showToastNotification(response.book_insertion, response.message)
        }
    } catch (error) {
        showToastNotification(false, error.message)
    }
}