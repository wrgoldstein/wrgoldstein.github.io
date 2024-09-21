<script context="module">
    export const title = "An Analytics Service in Elixir"
    export const date = new Date(2017, 2, 15)
</script>

# {title}

### {date}

Ever since I learned about [Elixir](http://elixir-lang.org/) I've been curious about whether it would be feasible to build a service in it for receiving analytics events and pushing them to Redshift like [Snowplow](http://snowplowanalytics.com/) or [Segment](https://segment.com/).

There are a few challenges that a proposed new service would have to solve, alongside the core job of receiving POST requests, writing the passed events to S3, and copying them regularly to Redshift (where they can be analyzed or built upon).

**Throughput:** Analytics on a site like [Artsy](artsy.net) aren't anything like Twitter or Facebook, but we have enough concurrent users on the site-- and enough instrumentation -- that a proposed API would have to be able to handle a thousands of concurrent events without breaking a sweat.

**Dynamic Schemas:** Analytics events can have different properties that can be difficult to represent in a fixed columnar schema.  Snowplow solved this problem by sticking to a very strict [Subject-Verb-Object](http://snowplowanalytics.com/blog/2013/08/12/towards-universal-event-analytics-building-an-event-grammar/) schema.  

Segment handles it by splitting warehoused data into two parts:  a singular, monolithic `tracks` table that has only the basic information, and separate [event tables](https://segment.com/docs/warehouses/schema/#event-tables) that have a column for each property passed for that specific event.  Developers at Artsy have found that the ability to pass arbitrary JSON payloads makes instrumentation much easier to implement.  I'm on the fence about how much value this really adds, but it is a cool feature.

**Availability:** This is tied to throughput but it goes without saying any service would need to have high availability. Events can't be dropped willy-nilly, or we'd have unreliable data with which to train our models and make our business decisions. Elixir/Erlang's reputation for availability is a big part of my interest in it.  

**Easy to deploy:** A gripe I have with Snowplow is that it is (or was) a series of five applications housed in a single git repository.  It was hard to understand what code did what.  Segment of course is the total opposite:  you pay them to host it for you so it's plug and play.  This really is the best solution for any company where resources are scant, but I'm curious whether this is something we really need to pay for.

**Literate code:** Another Scala gripe, but I find it _impossible_ to grok. I heard someone joke about how Scala has a philosophy of "write it once, read it never".  Since I started programming in Ruby I've come to strongly believe in simple control flows and obvious naming over code that is tightly optimized (for space or speed). Elixir has some promise of offering both.

**Modularity:** It is cool how Snowplow offers [Enrichment](https://github.com/snowplow/snowplow/tree/master/3-enrich) as a step in their process.  We have many processes in our own ETL flow that do this, for instance transforming referrer urls (for which we use [a Snowplow library](https://github.com/snowplow/referer-parser)).  I'd love to just be able to plug in a module as needed to get e.g. geo-ip enrichment, or user-agent parsing.

## Next Steps

The requirements for this are pretty daunting, but I want to play with two ideas for processing events:  using [RabbitMQ](https://www.rabbitmq.com/getstarted.html) to queue the events, and using Elixir's own [GenStage](https://github.com/elixir-lang/gen_stage) (or [Flow?](https://github.com/elixir-lang/flow)). In particular I'm curious how they compare in terms of scalability / throughput.  In my next post I'll describe a very simple RabbitMQ / [Phoenix](http://www.phoenixframework.org/) setup.
