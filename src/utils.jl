"""
    check_newfiles(counter, fw, inputdir)

Function that can be used as a `coreloopfun` (see in [`servedocs`](@ref)): check every 30 cycles
whether a new file has been added in `inputdir` or if files that were previously watched have
been deleted.
"""
function check_newfiles(cycle_counter::Int, fw::FileWatcher, inputdir::AbstractString)
    if mod(cycle_counter, 30) == 0
        # 1) check if some files have been deleted and remove them from fw.watchedfiles
        df = Int[]
        for (i, wf) ∈ enumerate(fw.watchedfiles)
            isfile(wf.path) || push!(df, i)
        end
        deleteat!(fw.watchedfiles, df)
        # 2) check if any new file has been added and if so start watching it
        watchedfiles = (wf.path for wf ∈ fw.watchedfiles)
        for (root, _, files) ∈ walkdir(inputdir)
            for file ∈ files
                path = joinpath(root, file)
                path ∈ watchedfiles || watch_file!(fw, path)
            end
        end
    end
    return nothing
end

"""
    servedocs()

Can be used when developping a package to run the `docs/make.jl` file from Documenter.jl and
then serve the `docs/build` folder with LiveServer.jl. This function assumes you are in the
directory `[MyPackage].jl` with a subfolder `docs`.
If `make.jl` is modified, a pass of Documenter will also be triggered.
If you add new files in the `docs/src` folder, these files will also be watched for changes.

Note: to avoid errors, you should wait until the Documenter pass has ended before saving
new changes (and consequently re-triggering a pass) as triggering rapid changes is prone to
producing errors with tasks getting out of sync. Unfortunately this is due to Julia's current
limitations with task management which hopefully will improve in the future.
"""
function servedocs()
    makejl = joinpath("docs", "make.jl")

    status = :ok

    make_and_callback(fp) = begin
        if status == :ok
            status = :busy
            if fp == makejl || splitext(fp)[2] == ".md"
                include(makejl)
            end
            file_changed_callback(fp)
            status = :ok
        end
    end

    docwatcher = SimpleWatcher(make_and_callback)
    push!(docwatcher.watchedfiles, WatchedFile(makejl))

    inputdir = joinpath("docs", "src")
    if isdir("docs") && isfile(makejl)
        # add all *md files in `docs/src` to watched files
        for (root, _, files) ∈ walkdir(inputdir)
            for file ∈ files
                if splitext(file)[2] == ".md"
                    push!(docwatcher.watchedfiles, WatchedFile(joinpath(root, file)))
                end
            end
        end
        # trigger a first pass
        include(makejl)
        # start continuous watching
        serve(docwatcher, dir=joinpath("docs", "build"),
              coreloopfun=(cntr, fw)->check_newfiles(cntr, fw, inputdir))
    else
        @warn "No docs folder found"
    end
    return nothing
end

#
# Miscellaneous utils
#

"""
    verbose(b)

Set the verbosity of LiveServer to either true (showing messages upon events) or false (default).
"""
verbose(b::Bool) = (VERBOSE.x = b)

"""
    example()

Simple function to copy an example website folder to the current working directory that can be
watched by the LiveServer to get an idea of how things work.

### Example

```julia
LiveServer.example()
cd("example")
serve()
```
"""
function example(; basedir="")
    isempty(basedir) && (basedir = pwd())
    cp(joinpath(dirname(dirname(pathof(LiveServer))), "example"), joinpath(basedir, "example"))
end
