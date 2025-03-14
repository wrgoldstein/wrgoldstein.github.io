---
layout: post
title: Projects
date: 2020-01-03
---

This is a stub, but I want a record of the projects I want to pursue in the coming months:

- Knowledge repo: Airbnb released one but it's not good or widely used. Basically, how do you solve the issue of redoing work and not having easy discovery of analysis that lives in emails and google docs.

- Data disovery: Related to knowledge discovery, but how do you know which datasets are actively used/supported? Where do you start if you're new to an organization and you have a question? This should be baked into the data analysis toolchain and not live separately. A [data dictionary](https://www.locallyoptimistic.com/post/data_dictionaries/) is a bad solution to this. A good solution would leverage past usage and a social graph.

- Data enrichment: This could mean a lot of things, but I'm primarily interested in how you record key moments that affect data analysis and easily join them into your company's analysis process. Exampls include: outages, major feature launches, big marketing campaigns that change the mix of users: anything that could exogenously explain away anomalies in the data but in most places depends on tribal knowledge and memory to be included.

- Looker style data discovery: Looker is excellent (primarily for definition reuse and nontechnical data discovery and exploration) but costs far too much. I've developed an alternative, that I might open source or try to sell (ongoing).

- Reuse of Python / SQL work. If I had a dollar for every time I rewrote a snippet of SQL or Python to answer a question because it was faster than hunting it down in a jupyter notebook I'd have a lot of dollars.
  - I took a stab at writing my own python notebook, with the idea that you could individually save and reuse code blocks. If this existed it would greatly speed up my own analysis. Turns out though that the IPython/Jupyter ecosystem is vast and complex, and while my basic notebook implementation works it doesn't have a lot of the goodies that people take for granted from IPython.
  - I also wrote my own SQL editor with the intention of parsing the SQL abstract syntax tree and generating a network of interrelated tables and relations, but got stuck on finding a high quality AST parser in the javascript/elixir ecosystem. I decided to write my own using Jose Valim's [nimble_parsec](https://github.com/plataformatec/nimble_parsec) but this ended up being really difficult (the 2003 SQL [bnf](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form) is [thousands of lines long](https://ronsavage.github.io/SQL/sql-2003-1.bnf.html)) so that was a bad choice/dead end.
    - I really want to pick this up again. I think you could intelligently autocomplete entire join relations, where clauses, etc. and save thousands of keystrokes for a busy analyst.
