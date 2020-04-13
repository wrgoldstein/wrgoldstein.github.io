---
layout: post
title:  ergodicity-economics
date:   2020-04-13
---

A friend sent me [this interesting article](https://jasoncollins.blog/2020/02/18/risk-and-loss-aversion-in-ergodicity-economics/) which led me to [this explanation](https://jasoncollins.blog/2020/01/22/ergodicity-economics-a-primer/). In both, the following experiment is proposed:

>Suppose you have $100 and are offered a gamble involving a series of coin flips. For each flip, heads will increase your wealth by 50%. Tails will decrease it by 40%. Flip 100 times.

Should you take it? The author points out that the average person will lose money in repeated playings of this bet. The average result is a 5% decline in wealth each period.

So that got me thinking: For what values is it appropriate to take this bet repeatedly? So, as one does, I calculated it:

![](/assets/ergodicity.png)

The 100% line is where you're neutral about the bet. Obviously, there are more gains to mitigating the downside here than improving the upside, as seen by the shallow slope of these contour lines.

## Code appendix

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mtick


uprange = np.linspace(1, 2, 10).round(2)
downrange = np.linspace(0.2, .8, 10).round(2)
m = np.ndarray(shape=(10, 10))
for i, up in enumerate(uprange):
    for j, down in enumerate(downrange):
        m[i][j] = (up * down)**.5
```

```python
plt.figure(figsize=(14,4))
ax = plt.gca()
fmt = '%r %%'
CS = plt.contour(m, levels=np.linspace(-50, 10, 7).round(2), extend='both')
plt.xlabel("Up state")
plt.ylabel("Down state")
plt.clabel(CS, CS.levels, inline=True, fmt=fmt, fontsize=10)
ax.yaxis.set_major_formatter(mtick.PercentFormatter())
ax.xaxis.set_major_formatter(mtick.PercentFormatter())
plt.xticks(range(10), ["{0:.0f}%".format(100*(x-1)) for x in uprange])
plt.yticks(range(10), ["{0:.0f}%".format(100*(1-x)) for x in downrange])
plt.title("Log wealth given values for the coin flip")
plt.show()
```

