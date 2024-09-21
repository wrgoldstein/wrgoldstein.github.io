---
layout: post
title:  "Pipeable data in Ruby"
date:   2015-12-27
---

This post comes from some playing around after seeing Hadley Wickham speak about [pipeable data in R](https://speakerdeck.com/hadley/pipelines-for-data-analysis-in-r).  In it I try to explore different ways of serially applying a set of transformations to a piece of data.

Say we want to tell a story like the following:

> "the bunny Foofoo went to the forest and ate some grass"


We build up the pieces to tell the story:

```ruby

def the_bunny(name)
  "The bunny #{name}"
end

def went_to_the_forest(object)
  "#{object} went to the forest"
end

def and_ate_some_grass(object)
  "#{object} and ate some grass"
end

```

And then what?  We have some choices.

Use nested function calls:

```ruby

story = and_ate_some_grass(went_to_the_forest(the_bunny('Foofoo')))

```

But this is hard to read.  What if we broke it out?

Use separate variables for each state:

```ruby

the_named_bunny = the_bunny('Foofoo')
with_subject = went_to_the_forest(the_named_bunny)
story = and_ate_some_grass(with_subject)

```

Not much better. The variable names are either redundant with the
method names or non descriptive.

Let's try using one variable to hold the story as it builds:

```ruby

story = the_bunny('Foofoo')
story = went_to_the_forest(story)
story = and_ate_some_grass(story)

```

This is better, but contrived looking with 'story' repeated everywhere. What if we want to tell the same story several times with a different name?  We'd have to copy and paste all three lines.

So we make a method:

```ruby

def tell_the_story(name)
  story = the_bunny(name)
  story = went_to_the_forest(story)
  story = and_ate_some_grass(story)
  story
end

tell_the_story('Foofoo')
tell_the_story('Booboo')

```

Which is great, but what if you want the option to just use a piece of your story?

```ruby

def partial_story(name)
  story = the_bunny(name)
  story = went_to_the_forest(story)
  story
end

def full_story(name)
  story = partial_story(name)
  story = and_ate_some_grass(story)
  story
end

partial_story('Foofoo')
full_story('Booboo')

```

Ugh.  What if there are many possible sub stories?

Maybe use lambdas with a pipeline:

```ruby

storyline = [
  :the_bunny,
  :went_to_the_forest,
  :and_ate_some_grass
].map(&method(:method))

storyline[0..1].inject('Foofoo') { |v, m| m.(v) }
storyline.inject('Booboo') { |v, m| m.(v) }

```

Ruby syntax starts getting in the way.  We can at least hide it away:

```ruby

def tell_the_story(storyline, name)
  storyline.inject(name) { |v, m| m.(v) }
end

tell_the_story(storyline[0..1], 'Foofoo')
tell_the_story(storyline, 'Booboo')

```

But this is still sort of all over the place.  We can tidy it up by wrapping it in a class:

```ruby

class Bunny
  def initialize(name)
    @story = "The bunny #{name}"
  end

  def went_to_the_forest
    @story += ' went to the forest'
    self
  end

  def and_ate_some_grass
    @story += ' and ate some grass'
    self
  end

  def the_end
    @story
  end
end

Bunny.new('Foofoo')
  .went_to_the_forest
  .and_ate_some_grass
  .the_end

Bunny.new('Booboo')
  .went_to_the_forest
  .the_end

```

Which is actually pretty great in terms of readability.  But what if there's another ending, which this class doesn't know about?

```ruby

def new_ending(story)
  "#{story} and then gets eaten by a fox!"
end

new_ending(Bunny.new('Booboo')
  .went_to_the_forest
  .the_end)

```

The nice readability of our story in code is gone, especially if there's more than one of these building blocks.

But suppose we skip all this superstructure and use our original methods plus a small glue method in the data class?

```ruby

class String
  def |(fun, *args)
    method(fun).(self, *args)
  end
end

```

Voila:

```ruby

'Foofoo' |
  :the_bunny |
  :went_to_the_forest |
  :and_ate_some_grass

```


This doesn't allow extra arguments, so if a method like `:the` took a parameter like `:bunny`, you couldn't do `'Foofoo' | :the, :bunny`.  You could accomplish this with `'Foofoo' .| :the, :bunny` (calling the operator directly), but this doesn't work with the multiline format above.  It's an open question for me whether Ruby could be made to support this like elixir or clojure.