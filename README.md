# File Download Application
This application demonstrates server-side file handling and streaming, allowing clients to download files via an Express server. The server handles file download requests to an external source and streams the content to the client, minimizing memory usage and efficiently handling large files.

## Setup

### Prerequisites
- Node.js installed on your machine
- A `.env` file configured with necessary environment variables (if your application requires authentication for downloading files)

### Installation
1. Clone this repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running:
 
   ```console
   npm install
   ```
5. Ensure your `.env` file is set up in the root of the project directory with the required environment variables.

### Running the Server
1. Start the server with the following command:
   
   ```console
   node server.js
   ```
3. The server should now be running on `http://localhost:3000`.

## Using the Application

### Setup `test.html`
Ensure test.html is implemented and it should reference `download.js` for handling client-side download requests. 
- See Example file - `test.html`

### Setup `download.js`
Ensure download.js is implemented to make an HTTP request to the server's /download-doc endpoint (see `server.js`) when the download button is clicked. 
- See Example file - `download.js`

## Accessing the Test Page
1. Open `test.html` in a web browser.
2. Click the "Download File" button to initiate the file download through the server.
   
### Additional Notes
If your application requires authentication or environment-specific variables, ensure they are correctly set up in your .env file and server configuration.
Adjust the `server.js`, `download.js`, and `test.html` implementations as necessary to fit the specifics of your file download source and application requirements.
