var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#LiveServer.jl-Documentation-1",
    "page": "Home",
    "title": "LiveServer.jl - Documentation",
    "category": "section",
    "text": "LiveServer is a simple and lightweight development server written in Julia, based on HTTP.jl. It has live-reload capability, i.e. when changing files, every browser (tab) currently displaying a corresponding page is automatically refreshed. This updating is triggered via WebSockets and therefore only works with browsers supporting this feature (and also insecure ws:// connections to localhost).This package can be compared to python\'s http.server (but with live reload) or node\'s browsersync (but much simpler)."
},

{
    "location": "#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "The package is currently un-registered. In Julia ≥ 1.0, you can add it using the Package Manager writing(v1.2) pkg> add https://github.com/asprionj/LiveServer.jl"
},

{
    "location": "#Quickstart-1",
    "page": "Home",
    "title": "Quickstart",
    "category": "section",
    "text": "The (only) function LiveServer exports is serve which starts listening to the current folder and makes its content available to a browser. In a Julia session:using LiveServer # exports serve()\ncd(\"path/to/website/folder\") # e.g. the example folder in this repo\nserve()Then open http://localhost:8000 in a browser. Changing a HTML file (e.g. index.html) triggers a reload in all browsers currently displaying this file. Changes on any other files (e.g. .css, .js etc) currently trigger a reload in all connected viewers.So, for instance, if you have two tabs opened looking at index.html and pages/page1.html and a file main.css in the folder is modified, both tabs will be reloaded."
},

{
    "location": "lib/public/#",
    "page": "Public",
    "title": "Public",
    "category": "page",
    "text": ""
},

{
    "location": "lib/public/#LiveServer.serve",
    "page": "Public",
    "title": "LiveServer.serve",
    "category": "function",
    "text": "serve(fw::FileWatcher=SimpleWatcher(); port::Int)\n\nMain function to start a server at http://localhost:port and render what is in the current directory. (See also example for an example folder).\n\nfilewatcher is a file watcher implementing the API described for SimpleWatcher and\n\nmessaging the viewers (web sockets) upon detecting file changes.\n\nport is an integer between 8000 (default) and 9000.\n\nExample\n\nLiveServer.example()\ncd(\"example\")\nserve()\n\nIf you open a browser to http://localhost:8000, you should see the index.html page from the example folder being rendered. If you change the file, the browser will automatically reload the page and show the changes.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#LiveServer.verbose",
    "page": "Public",
    "title": "LiveServer.verbose",
    "category": "function",
    "text": "verbose(b)\n\nSet the verbosity to either true (showing messages) or false (default).\n\n\n\n\n\n"
},

{
    "location": "lib/public/#Internal-Documentation-1",
    "page": "Public",
    "title": "Internal Documentation",
    "category": "section",
    "text": "Documentation for LiveServer.jl\'s exported functionsLiveServer.serve\nLiveServer.verbose"
},

{
    "location": "lib/internals/#",
    "page": "Internals",
    "title": "Internals",
    "category": "page",
    "text": ""
},

{
    "location": "lib/internals/#Internal-Documentation-1",
    "page": "Internals",
    "title": "Internal Documentation",
    "category": "section",
    "text": "Documentation for LiveServer.jl\'s internal interface"
},

{
    "location": "lib/internals/#LiveServer.update_and_close_viewers!",
    "page": "Internals",
    "title": "LiveServer.update_and_close_viewers!",
    "category": "function",
    "text": "update_and_close_viewers!(wss::Vector{HTTP.WebSockets.WebSocket})\n\nTake a list of viewers, i.e. WebSocket connections from a client, send a message with data \"update\" to each of them (to trigger a page reload), then close the connection. Finally, empty the list since all connections are closing anyway and clients will re-connect from the re-loaded page.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#Internals-for-file-watching-1",
    "page": "Internals",
    "title": "Internals for file watching",
    "category": "section",
    "text": "LiveServer.update_and_close_viewers!"
},

{
    "location": "lib/internals/#LiveServer.ws_tracker",
    "page": "Internals",
    "title": "LiveServer.ws_tracker",
    "category": "function",
    "text": "ws_tracker(::HTTP.Stream)\n\nThe websocket tracker. Upgrades the HTTP request in the stream to a websocket and adds this connection to the viewers in the global dictionary WS_VIEWERS.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#Internals-for-live-serving-1",
    "page": "Internals",
    "title": "Internals for live serving",
    "category": "section",
    "text": "LiveServer.ws_tracker"
},

]}
