document.getElementById('downloadButton').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'http://localhost:3000/DirectDownload-doc'; // Your server endpoint to download the file
    link.setAttribute('download', 'sample.mp4');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
