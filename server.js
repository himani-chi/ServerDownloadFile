import express from 'express';
import axios from 'axios';
import https from 'https';
import 'dotenv/config';


const app = express();
const PORT = 3000;

// Function to retrieve access token
async function getAccessToken() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const tenantId = process.env.TENANT_ID;
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    try {
        const response = await axios.post(tokenEndpoint, new URLSearchParams({
            'client_id': clientId,
            'scope': 'https://graph.microsoft.com/.default',
            'client_secret': clientSecret,
            'grant_type': 'client_credentials'
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error retrieving access token:', error);
        throw new Error('Failed to retrieve access token');
    }
}

function getFileDetails(inputfileName) {

    if (inputfileName.includes('.docx')) {
        return {
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        };
    }
    else if (inputfileName.includes('.mp4')) {
        return {
            contentType: 'video/mp4'
        };
    }
    else if (inputfileName.includes('.pdf')) {
        return {
            contentType: 'application/pdf'
        };
    }
    else if (inputfileName.includes('.xlsx')) {
        return {
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
    }
    //Default or error if
    return {
        contentType: 'text/plain'
    };


}

app.get('/GraphDownload-doc', async (req, res) => {

    const endpointUrl = `https://graph.microsoft.com/v1.0/drives/${process.env.DRIVE_ID}/items/${process.env.ITEM_ID}?select=name,@microsoft.graph.downloadUrl`

    try {

        const accessToken = await getAccessToken();
        //console.log('Retrieved Access Token:', accessToken);

        // Make the first GET request to obtain the downloadURL
        const response = await axios.get(endpointUrl, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        // Extract @microsoft.graph.downloadUrl from the response
        const downloadUrl = response.data['@microsoft.graph.downloadUrl']; // Use bracket notation to access the property

        if (!downloadUrl) {
            throw new Error('Download URL not found in response');
        }

        const fileName = response.data['name'];
        const contentType = getFileDetails(fileName).contentType;


        // Make the second request to download the file using the obtained downloadUrl
        const downloadResponse = await axios.get(downloadUrl, { responseType: 'stream' });

        // Optional: Set filename and content type in the response header
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`); // Example filename
        res.setHeader('Content-Type', `${contentType}`);

        // Stream the download directly to the client
        downloadResponse.data.pipe(res);
    } catch (error) {
        console.error('Error processing download:', error);
        res.status(500).send('Failed to process download.');
    }
});

app.get('/DirectDownload-doc', async (req, res) => {

    const endpointUrl = `https://${process.env.TENANT_NAME}.sharepoint.com/sites/ModernTeam/_layouts/15/download.aspx?UniqueId=524d40f3-6d52-4376-abe4-130f678d05b1`
    
    try {

        // const accessToken = await getAccessToken();
        const accessToken = process.env.ACESSS_TOKEN;
        const fileName = 'sample.mp4';
        const contentType = 'video/mp4';

        const downloadResponse = await axios.get(endpointUrl, {
            responseType: 'stream',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });


        // Optional: Set filename and content type in the response header
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`); // Example filename
        res.setHeader('Content-Type', `${contentType}`);

        // Stream the download directly to the client
        downloadResponse.data.pipe(res);
    } catch (error) {
        console.error('Error processing download:', error);
        res.status(500).send('Failed to process download.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
