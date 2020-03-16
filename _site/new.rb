require 'optparse'
require 'date'
require 'active_support'
require 'active_support/core_ext'

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: new.rb [options]"

  opts.on("-tTITLE", "--title=TITLE", "Specify title") do |v|
    options[:title] = v
  end
end.parse!

unless options[:title]
  puts "You must enter a title"
  puts "Usage: ruby new.rb --title TITLE"
  exit(1)
end

filename = "_posts/#{Date.today}-#{options[:title].underscore.gsub(' ', '_')}.markdown"

body = <<-BODY
---
layout: post
title:  #{options[:title]}
date:   #{Date.today}
---
BODY

File.open(filename, 'w') do |f|
  f << body.strip
end

`code #{filename}`