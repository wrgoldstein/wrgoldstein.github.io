---
layout: post
title:  "Being more organized with notes"
date:   2015-12-27
---
I've been taking notes for a little while now using Sublime and a tiny Thor command line tool.  The code for it is:

```ruby
#!/usr/bin/ruby

require 'thor'
require 'date'

PATH = '~/notes'
FOLDERS = %w(scratch thoughts work)

class Note < Thor
  FOLDERS.each do |type|
    desc "#{type} [NAME]", "Create a new #{type} note"
    define_method(type) do |file|
      td = Date.today.to_s.split('-').join
      file = "#{td}-#{file}"
      %x(touch #{PATH}/#{__method__}/#{file}.md)
      %x(subl #{PATH}/#{__method__}/#{file}.md)
    end
  end

  desc 'open [TYPE]', 'Open a specific notes directory'
  def open(type)
    %x(subl #{PATH}/#{type})
  end

  desc 'edit', 'Edit the notes CLT'
  def edit
    %x(subl #{File.expand_path(__FILE__)})
  end

  desc 'search [TYPE] [q]', 'Search a directory'
  def search(type, q)
    puts %x(ack #{q} #{PATH}/#{type})
  end
end

Note.start
```

To use it, save the file somewhere.  Let's say you save it in `~/Code/note.thor`:

1. Get `thor`:  `gem install thor`
2. Change `FOLDERS` if need be and create the needed directories.  For me, that looks like
```
/Users/williamgoldstein/notes
├── blog
├── scratch
├── thoughts
└── work
```

You can make these with e.g. `mkdir -p ~/Notes/work`

3. Create a handy alias.  In my bash profile I have `alias notes='~/Code/notes.thor`.
4. Run it:  `notes`
```
$  notes
Commands:
  notes.thor edit             # Edit the notes CLT
  notes.thor help [COMMAND]   # Describe available commands or one specific command
  notes.thor open [TYPE]      # Open a specific notes directory
  notes.thor scratch [NAME]   # create a new scratch note
  notes.thor thoughts [NAME]  # create a new thoughts note
  notes.thor work [NAME]      # create a new work note
```

- `notes edit` is a quick way to iterate on the tool itself
- `notes work hello` will open a new timestamped file like `20160308-hello.md` in Sublime.
