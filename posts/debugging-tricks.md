---
layout: post
title: Debugging tricks
date: 2021-03-19
---

I'm working through understanding some complicated code (https://github.com/fishtown-analytics/dbt) and it has a ton of indirection, and sometimes I can't tell what code calls what! Here are some neat tricks for making progress:

## Pip install your own version

I git cloned the repo and `pip install -e path/to/my/version` into the same virtual env where I'd otherwise run the production version. Now I can patch it, run the install command again, and run my version with other code.

## Get the call stack

In conjunction with the above, if I want to know how a function gets called, I can print the call stack from within the function:

```python

def complicated_indirection():
    ...
    import inspect
    curframe = inspect.currentframe()
    calframe = inspect.getouterframes(curframe, 2)
    for f in calframe:
        print(f.filename, f.lineno, f.function)
    ...
```
