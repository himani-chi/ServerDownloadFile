document.getElementById('downloadButton').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'http://localhost:3000/download-doc2'; // Your server endpoint to download the file
    link.setAttribute('download', 'downloadedDocument.docx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
