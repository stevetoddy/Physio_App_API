import app from "./app.js"

const port = process.env.PORT || 4001

// Tell express to listen for connections (default is localhost)
// Can add a callback function, in this case a console log showing the URL
app.listen(port, () => console.log(`App running at http://localhost:${port}/`))

