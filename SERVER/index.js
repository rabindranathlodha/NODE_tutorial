const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') {
        res.end();
        return;
    }   
    const log = `${Date.now()}: ${req.method} ${req.url} New Req. recieved\n`;
    const myURL = url.parse(req.url, true);
    console.log(myURL);
    fs.appendFile('log.txt', log, (err, data) => {
        switch(myURL.pathname) {
            case '/': 
                if (req.method === 'GET') res.end('HomePage');
                break;
            case '/about':
                const userName = myURL.query.myName;
                res.end(`Hii, ${userName}`);
                break;
            case '/signup':
                if(req.method === 'GET') res.end('SignUp Page');
                else if(req.method === 'POST') res.end('SignUp Successful');
            default:
                res.end('404 Page Not Found');
        }
        if (err) throw err;
    });
});

myServer.listen(3000, 'localhost', () => console.log('Server is listening on port 3000'));