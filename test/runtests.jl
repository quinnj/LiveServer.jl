using LiveServer, Test, Crayons, Sockets
# NOTE: fix this when switching back to official HTTP.jl
using HTTPx; const HTTP = HTTPx
const LS = LiveServer
# depending on the OS, the resolution of stat(f).mtime can be over a second.
const FS_WAIT = 1.1

include("utils.jl")
include("file_watching.jl")
include("server.jl")
