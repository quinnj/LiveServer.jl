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
    "text": "LiveServer is a simple and lightweight development web-server written in Julia, based on HTTP.jl. It has live-reload capability, i.e. when changing files, every browser (tab) currently displaying a corresponding page is automatically refreshed.LiveServer is inspired from Python\'s http.server and Node\'s browsersync."
},

{
    "location": "#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "The package is currently un-registered. In Julia ≥ 1.0, you can add it using the Package Manager writing(v1.2) pkg> add https://github.com/asprionj/LiveServer.jl"
},

{
    "location": "#Usage-1",
    "page": "Home",
    "title": "Usage",
    "category": "section",
    "text": "The main function LiveServer exports is serve which starts listening to the current folder and makes its content available to a browser. The following code creates an example directory and serves it:julia> using LiveServer\njulia> LiveServer.example() # creates an \"example/\" folder with some files\njulia> cd(\"example\")\njulia> serve() # starts the local server & the file watching\n✓ LiveServer listening on http://localhost:8000...\n  (use CTRL+C to shut down)Open a Browser and go to http://localhost:8000 to see the content being rendered; try modifying files (such as index.html) to see the changes being rendered immediately in the browser."
},

{
    "location": "man/server/#",
    "page": "Live server",
    "title": "Live server",
    "category": "page",
    "text": ""
},

{
    "location": "man/server/#Live-server-1",
    "page": "Live server",
    "title": "Live server",
    "category": "section",
    "text": "[coming soon...]"
},

{
    "location": "man/watching/#",
    "page": "File watching",
    "title": "File watching",
    "category": "page",
    "text": ""
},

{
    "location": "man/watching/#File-watching-1",
    "page": "File watching",
    "title": "File watching",
    "category": "section",
    "text": "The file watching is considered an \"internal\" part of LiveServer.jl. Nevertheless, you may use for other tasks than a live server. For this reason, and for the people that want to get to know the structure of LiveServer.jl, the main logic and functions are outlined here. For the details on the internal stuff, have a look at the Internal Interface."
},

{
    "location": "man/watching/#Logic-1",
    "page": "File watching",
    "title": "Logic",
    "category": "section",
    "text": "A single file being watched is represented by an object of type LiveServer.WatchedFile. There are two methods to check whether the file has changed and to set the current state as \"unchanged\".The watcher itself is defined as the abstract type LiveServer.FileWatcher. All API functions are implemented for this abstract type. Every file watcher has to be a sub-type of FileWatcher and thus may only change some of the API functions and use the \"default\" implementation for the others. LiveServer.jl\'s default watcher is LiveServer.SimpleWatcher. It just uses all of the default API-function implementations. That is, none of them are specialised for SimpleWatcher, and thus the ones defined for FileWatcher are dispatched.The watcher is started using LiveServer.start. This command spawns an asynchronous task running in an infinite loop that checks the watched files for changes. Unsurprisingly, LiveServer.stop stops this loop. Now, what\'s left to do is to tell the watcher which files should be observed, and what the reaction to a change should be.Files to be watched can be added using LiveServer.watch_file!. The watcher checks whether the file is already watched and thus will not add it twice to its list. Also, renamed or deleted files are automatically removed from the list of watched files. You can add files while the watcher is running or stopped.Finally, you can pass a callback function to the file watcher, which is fired whenever a file changes. Just pass a function receiving an AbstractString as argument to LiveServer.set_callback!. The string contains the path to the file (including its name and extension). In the context of the live server, this callback function triggers a page reload in the browsers viewing a HTML page."
},

{
    "location": "man/watching/#Example-1",
    "page": "File watching",
    "title": "Example",
    "category": "section",
    "text": "This is an example illustrating the API and all features of the default SimpleWatcher.using LiveServer: SimpleWatcher, start, stop, set_callback!, watch_file!, verbose\nverbose(true) # run in verbose mode to see information about watched files\n\n# create a file, instantiate file watcher, add the file to be watched\nwrite(\"textfile.txt\", \"A text file.\")\nw = SimpleWatcher(f -> println(\"File changed: $f\"))\nwatch_file!(w, \"textfile.txt\")\n\n# start the watcher, change the file\nstart(w)\nwrite(\"textfile.txt\", \"Changed text file.\")\nsleep(0.15) # make sure a file-check runs before changing callback\n\n# change the callback function, change the file again, sstop the watcher\nset_callback!(w, f -> println(\"Changed: $f\"))\nwrite(\"textfile.txt\", \"Second-time changed text file.\")\nsleep(0.15)\nstop(w)\n\n# watcher does not add files that do not exist\nwatch_file!(w, \"this_file_does_not_exist_at.all\")\n\n# let\'s remove the watched file and see if the watcher notices\nrm(\"textfile.txt\")\nstart(w)\nsleep(0.15)\nstop(w)"
},

{
    "location": "man/watching/#Implementing-your-own-file-watcher-1",
    "page": "File watching",
    "title": "Implementing your own file watcher",
    "category": "section",
    "text": "There may be circumstances where you want the page-reloading to be triggered by your own mechanism. As a very simple example, you may want to display your own custom messages every-time a file is updated."
},

{
    "location": "man/watching/#Using-SimpleWatcher-and-a-custom-callback-1",
    "page": "File watching",
    "title": "Using SimpleWatcher and a custom callback",
    "category": "section",
    "text": "If you want something custom to happen every time a file is modified, you will want to write your own callback function (the function that is called upon changes in a specific file). The base file_changed_callback that is used calls the internal function update_and_close_viewers! which sends a message to the client (browser) telling it to refresh the page. Typically you will want to keep that part but you may want to modify what happens before.Once you have defined your own callback function, you can wrap it in a SimpleWatcher which will trigger the function every time one of the watched file gets modified.In the example below, we chain the base function with a custom message that gets printed upon every file change.custom_callback(fp::AbstractString) = (println(\"Hello!\"); file_changed_callback(fp))"
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
    "location": "lib/public/#Public-Interface-1",
    "page": "Public",
    "title": "Public Interface",
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
    "location": "lib/internals/#Internal-Interface-1",
    "page": "Internals",
    "title": "Internal Interface",
    "category": "section",
    "text": "Documentation for LiveServer.jl\'s internal interface"
},

{
    "location": "lib/internals/#Internals-for-file-watching-1",
    "page": "Internals",
    "title": "Internals for file watching",
    "category": "section",
    "text": "There is two types related to file watching, one for a single file being watched (LiveServer.WatchedFile), the other for the watcher itself. The latter is an abstract type LiveServer.FileWatcher. All API functions are implemented for this abstract type, and LiveServer.SimpleWatcher is LiveServer.jl\'s default watcher that is a sub-type of FileWatcher for which no specific API methods are defined."
},

{
    "location": "lib/internals/#LiveServer.WatchedFile",
    "page": "Internals",
    "title": "LiveServer.WatchedFile",
    "category": "type",
    "text": "WatchedFile\n\nStruct for a file being watched containing the path to the file as well as the time of last modification.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.has_changed",
    "page": "Internals",
    "title": "LiveServer.has_changed",
    "category": "function",
    "text": "has_changed(wf::WatchedFile)\n\nCheck if a WatchedFile has changed. Returns -1 if the file does not exist, 0 if it does exist but has not changed, and 1 if it has changed.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.set_unchanged!",
    "page": "Internals",
    "title": "LiveServer.set_unchanged!",
    "category": "function",
    "text": "set_unchanged!(wf::WatchedFile)\n\nSet the current state of a WatchedFile as unchanged\"\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#Watched-file-1",
    "page": "Internals",
    "title": "Watched file",
    "category": "section",
    "text": "LiveServer.WatchedFile\nLiveServer.has_changed\nLiveServer.set_unchanged!"
},

{
    "location": "lib/internals/#LiveServer.FileWatcher",
    "page": "Internals",
    "title": "LiveServer.FileWatcher",
    "category": "type",
    "text": "FileWatcher\n\nAbstract Type for file watching objects such as SimpleWatcher.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.SimpleWatcher",
    "page": "Internals",
    "title": "LiveServer.SimpleWatcher",
    "category": "type",
    "text": "SimpleWatcher([callback]; sleeptime::Float64=0.1) <: FileWatcher\n\nA simple file watcher. You can specify a callback function, receiving the path of each file that has changed as an AbstractString, at construction or later by the API function described below. The sleeptime is the time waited between two runs of the loop looking for changed files, it is constrained to be at least 0.05s.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.start",
    "page": "Internals",
    "title": "LiveServer.start",
    "category": "function",
    "text": "start(w::FileWatcher)\n\nStart the file watcher and wait to make sure the task has started.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.stop",
    "page": "Internals",
    "title": "LiveServer.stop",
    "category": "function",
    "text": "stop(fw::FileWatcher)\n\nStop the file watcher. The list of files being watched is preserved and new files can still be added to the file watcher using watch_file!. It can be restarted with start. Returns a Bool indicating whether the watcher was running before stop was called.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.set_callback!",
    "page": "Internals",
    "title": "LiveServer.set_callback!",
    "category": "function",
    "text": "set_callback!(fw::FileWatcher, callback::Function)\n\nMandatory API function to set or change the callback function being executed upon a file change. Can be \"hot-swapped\", i.e. while the file watcher is running.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.watch_file!",
    "page": "Internals",
    "title": "LiveServer.watch_file!",
    "category": "function",
    "text": "watch_file!(fw::FileWatcher, f_path::AbstractString)\n\nAdd a file to be watched for changes.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.file_watcher_task!",
    "page": "Internals",
    "title": "LiveServer.file_watcher_task!",
    "category": "function",
    "text": "file_watcher_task!(w::FileWatcher)\n\nHelper function that\'s spawned as an asynchronous task and checks for file changes. This task is normally terminated upon an InterruptException and shows a warning in the presence of any other exception.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.isrunning",
    "page": "Internals",
    "title": "LiveServer.isrunning",
    "category": "function",
    "text": "isrunning(fw::FileWatcher)\n\nOptional API function to check whether the file watcher is running.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.is_watched",
    "page": "Internals",
    "title": "LiveServer.is_watched",
    "category": "function",
    "text": "is_watched(fw::FileWatcher, f_path::AbstractString)\n\nCheck whether a file f_path is being watched by file watcher fw.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#File-watcher-1",
    "page": "Internals",
    "title": "File watcher",
    "category": "section",
    "text": "These are the two types and the API functions:LiveServer.FileWatcher\nLiveServer.SimpleWatcher\nLiveServer.start\nLiveServer.stop\nLiveServer.set_callback!\nLiveServer.watch_file!\nLiveServer.file_watcher_task!There are also some helper functions:LiveServer.isrunning\nLiveServer.is_watched"
},

{
    "location": "lib/internals/#LiveServer.serve_file",
    "page": "Internals",
    "title": "LiveServer.serve_file",
    "category": "function",
    "text": "serve_file(fw, req::HTTP.Request)\n\nHandler function for serving files. This takes a file watcher, to which files to be watched can be added, and a request (e.g. a path entered in a tab of the browser), and converts it to the appropriate file system path. If the path corresponds to a HTML file, it will inject the reloading script (see file client.js) at the end of its body, i.e. directly before the </body> tag. All files served are added to the file watcher, which is responsible to check whether they\'re already watched or not. Finally the file is served via a 200 (successful) response. If the file does not exist, a response with status 404 and message \"404 not found\" is sent.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.ws_tracker",
    "page": "Internals",
    "title": "LiveServer.ws_tracker",
    "category": "function",
    "text": "ws_tracker(ws::HTTP.WebSockets.WebSocket, target::AbstractString)\n\nAdds the websocket connection to the viewers in the global dictionary WS_VIEWERS to the entry corresponding to the targeted file.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.file_changed_callback",
    "page": "Internals",
    "title": "LiveServer.file_changed_callback",
    "category": "function",
    "text": "file_changed_callback(f_path::AbstractString)\n\nFunction reacting to the change of a file f_path. Is set as callback for the file watcher.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.get_fs_path",
    "page": "Internals",
    "title": "LiveServer.get_fs_path",
    "category": "function",
    "text": "get_fs_path(req_path::AbstractString)\n\nReturn the filesystem path corresponding to a requested path, or an empty String if the file was not found.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#LiveServer.update_and_close_viewers!",
    "page": "Internals",
    "title": "LiveServer.update_and_close_viewers!",
    "category": "function",
    "text": "update_and_close_viewers!(wss::Vector{HTTP.WebSockets.WebSocket})\n\nTake a list of viewers, i.e. WebSocket connections from a client, send a message with data \"update\" to each of them (to trigger a page reload), then close the connection. Finally, empty the list since all connections are closing anyway and clients will re-connect from the re-loaded page.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#Internals-for-live-serving-1",
    "page": "Internals",
    "title": "Internals for live serving",
    "category": "section",
    "text": "The exported serve and verbose functions are not stated again. The serve method instantiates a listener (HTTP.listen) in an asynchronous task. The callback upon an incoming HTTP stream decides whether it is a standard HTTP request or a request for an upgrade to a websocket connection. The former case is handled by LiveServer.serve_file, the latter by LiveServer.ws_tracker. Finally, LiveServer.file_changed_callback is the function passed to the file watcher to be executed upon file changes.LiveServer.serve_file\nLiveServer.ws_tracker\nLiveServer.file_changed_callbackAlso here, there\'s some helper functions:LiveServer.get_fs_path\nLiveServer.update_and_close_viewers!"
},

]}
