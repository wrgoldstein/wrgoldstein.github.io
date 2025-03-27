---
layout: post
title: noledge
date: 2020-03-16
---

I have a new project called [noledge](https://github.com/wrgoldstein/noledge) which is a way of tackling the [knowledge sharing](https://medium.com/airbnb-engineering/scaling-knowledge-at-airbnb-875d73eff091) problem. Similar projects include:

- [knowledge-repo](https://github.com/airbnb/knowledge-repo)
- [kyso.io](http://kyso.io)
- [fastpages](https://github.com/fastai/fastpages)

**2025 note**: all of the above are now defunct 😅

My reasons for making one myself are:

- knowledge-repo is no longer actively supported and is a strange developer experience. I'm told no one at Airbnb uses it.
- kyso is kind of a weird user experience. An entire folder or repository is considered a single post, and there's this huge visual emphasis on a community feed. My use case is for one repo with multiple notebook files that should be browsable.
- fastpages seems really nice, but it's based on github pages so it's not a good solution for internal knowledge sharing (github pages can't be private).

Its features are:

- Authenticate through google and limit to only users from a certain domain.
- Automatically convert .ipynb files to attractive html pages with the ability to hide code
- Automatically read posts from a github repository
- Search posts by title or author
- Scan posts by date or through a directory structure

One killer feature I'd love to add would be the ability to seamlessly include [streamlit](https://www.streamlit.io/) applications as posts-- individual posts would be interactive, or a post could also serve as a dashboard, which would be so, so awesome. But after a couple of hours of digging into this, I don't think its very practical with the way streamlit is designed right now (an individual server must be spun up for each page / application), and the client and server seem quite tightly coupled.
