// SETUP2

var http = require('http'),
    fs = require('fs');

var https = require('https');

var server = http.createServer(function (req, res) {
    console.log("Request for: ", req.url);
    switch (req.url) {
        case '/':
            fs.readFile('./index.html', function(error, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data, 'utf-8');
            });
            break;
        case '/css/index.css':
            fs.readFile('./index.css', function(error, data) {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data, 'utf-8');
            });
            break;
    }

}).listen(8080);

console.log('Server running at http://54.68.151.77:8080/');

// The above lines of code basically set up a local server for us to access.

var io = require('socket.io').listen(server);


var chat_history = '';
var users_connected = {};

// HERE'S THE RELEVANT STUFF...

// SECOND, we set a listener to see when someone connects to our web page...
io.sockets.on('connection', function(socket) {

    console.log('New connection made...');

    socket.emit('server_connected');

    socket.emit('history_found', chat_history);

    socket.on('new_message_sent', function(new_message) {

        console.log(new_message);
        chat_history += new_message + "<br>";

        io.sockets.emit('message_update', new_message);

    });
    socket.on("username_set", function(user_val) {
        // console.log(user_val);
        // console.log(socket.id);
        users_connected[socket.id] = user_val;
        // console.log(users_connected);

        var allUsers = '';

        for (var key in users_connected) {
            console.log(users_connected[key]);
            allUsers += users_connected[key] + "<br>";
        }
        
        io.sockets.emit('usernames', allUsers);

    });
});