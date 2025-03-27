---
title: Endogenous money
summary: What even is money?
date: 2025-03-14
---

<script>
    import { Tween } from "svelte/motion"
    import { fade } from "svelte/transition"
    import TAccount from "./components/TAccount.svelte"
    import Color from "./components/Color.svelte"

    const manyAccountsExamples = [
        {title: "Cash", debits: [`$2,000 in bank`], credits: []},
        {title: "Cars", debits: [], credits: []},
        {title: "Student loans", credits: ["$1M to Yale"]},
        {title: "Phone", debits: ["iPhone"], credits: []}
    ]

    let example1 = $state([100])

    let standardStory = $state({
        current: 0,
        finished: false,
        totalMoney: new Tween(0),
        explanation: "",
        accounts: {
            person: {title: "Person", debits: [], credits: []},
            bank: {title: "Bank", debits: [], credits: []},
            company: {title: "Company", debits: [], credits: []},
        },
        steps: {
            0: {"text": "A person saves up money", f: () => {
                standardStory.accounts.person.debits.push("$100")
                standardStory.current++
                standardStory.totalMoney.target = 100
            }},
            1: {
                "text": "They deposit that money in a bank account",
                f: () => {
                    standardStory.accounts.person.debits.pop()
                    standardStory.accounts.person.debits.push("$100 in the bank")
                    standardStory.accounts.bank.debits.push("$100 in a vault")
                    standardStory.accounts.bank.credits.push("$100 deposit")
                    standardStory.current++
                    standardStory.explanation = "The bank has their money now, everything still adds up to $100"
                }
            },
            2: {
                "text": "The bank loans that money to a company",
                f: () => {
                    standardStory.accounts.bank.debits.pop()
                    standardStory.accounts.bank.debits.push("$10 reserve")
                    standardStory.accounts.bank.debits.push("$90 owed by company")
                    standardStory.accounts.company.debits.push("$90 loan")
                    standardStory.accounts.company.credits.push("$90 loan")
                    standardStory.totalMoney.target = 190
                    standardStory.current++
                    standardStory.explanation = "The bank gave out most of the money as a loan, and the money is now spendable by both the original depositor and the company."
                }
            },
            3: {
                "text": "The company deposits their money too",
                f: () => {
                    standardStory.accounts.company.debits.pop()
                    standardStory.accounts.bank.debits.push("$90 from the company")
                    standardStory.accounts.bank.credits.push("$90 deposit")
                    standardStory.accounts.company.debits.push("$90 in the bank")
                    standardStory.current++
                    standardStory.explanation = ""
                }
            },
            4: {
                "text": "The bank lends most of THAT money out...",
                f: () => {
                    standardStory.accounts.bank.debits.pop()
                    standardStory.accounts.bank.debits.push("$9 reserve")
                    standardStory.accounts.bank.debits.push("$81 owed by company")
                    standardStory.accounts.company.debits.push("$81 loan")
                    standardStory.accounts.company.credits.push("$81 loan")
                    // standardStory.current++
                    standardStory.finished = true
                }
            }
        }
    })
</script>

You may be familiar with the basic outline of the usual story around money:

1. Money arose to make bartering more convenient
2. Money is created when it is printed by the central government
3. Money is "multiplied" by banks, subject to a reserve ratio.

But.. common as this story is, it might not describe reality very well. 

In 2014 the Bank of England issued a bulletin called [Money creation in the modern economy](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf) that "explains how the majority of money in the modern economy is created by commercial banks making loans." 

This is a view of money as _endogenous_, as opposed to _exogenous_, meaning it is created from within the financial system rather than introduced from an external authority.

Why should you care? There's lots of technical implications around monetary policy and fiscal policy, but the bottom line is about resource allocation: If money is just a stand in for the free trade bartering that drives societal wealth, then its hard to argue with the Chicago school line that the free market creates the optimal allocation of resources. If instead banks dictate the creation and destruction of money, then what we can *afford* takes on an entirely new meaning.

It's easy to think of money as being a time travel vehicle for savings-- money earned in the past allows you to do something in the future-- but it seems more appropriate in light of endogenous money to view money as fundamentally a vehicle for trust: I trust you to do something for me, and money allows that trust to be traded and used elsewhere in society.

---

### How banks create money

So what do we mean that banks create money by making loans? The explanation lies with accounting identities, which we'll introduce here briefly and then get to the good stuff.

This is a **T-Account**, the fundamental unit of double entry book-keeping and the tool we'll use to examine exactly what happens when a bank makes a loan.

<div class="flex w-fit mx-auto flex-col">
    <TAccount title={"Account"} debits={["+ increases"]} credits={["-"]} size="lg"/>
    <div class="self-center text-xs mt-1">T-Account</div>
</div>


Double entry book-keeping dates back more than 750 years to 1200s Italy. It transformed the way commerce was conducted by allowing the accurate management of vast commercial enterprises. Combined with convenient location, it is a key reason that Venetian banking houses were able to become powerfully influential across Europe over the following several hundred years.

The idea is deceptively simple: Every entry in a double entry book-keeping system must be balanced. There are two things that can be affected by any transaction-- what you <Color color="text-green-500">own</Color> and what you <Color color="text-red-500">owe</Color >. A T-Account helps us keep track of what we own and owe for a variety of asset types. What you own can go up or down, as can what you owe. When what you own goes up or what you owe goes down, we'll paint it <Color color="text-green-500">green</Color>, and vice versa increased owing or decreased owning will be <Color color="text-red-500">red</Color>.

For instance if I start with $0 and then receive successive loans of $100 from my sister, my accounts would look like this:

<div>
(Click <span class="text-yellow-500 cursor-pointer" onclick={() => example1.push(100)}>Loan more</span>)
</div>


<div class="flex w-fit mx-auto gap-6">
    <TAccount 
        title="Cash"
        debits={example1}
        colorize={true}
        showTotal={true}
        />

    <TAccount 
        title="Loans"
        credits={example1} 
        colorize={true}
        showTotal={true}
        />
</div>
<div class="flex place-content-center mt-2">
    <button class="bg-yellow-500 px-2 text-white rounded" onclick={() => example1.push(100)} disabled={standardStory.finished}>Loan more</button>
</div>

As you can see, the loans always balance out the cash. If the totals don't add up, then something has gone wrong in the accounting.

Since value can never be destroyed or created in these T Accounts, we use a third concept called <Color color="text-blue-300">Equity</Color> to track surplus value, which can be debited (increased) and credited (decreased) like the other two types.

<div class="font-bold text-center">
    <Color color="text-blue-300">Equity</Color> = <Color color="text-green-300">Assets</Color> - <Color color="text-red-300">Liabilities</Color>
</div>

So cash is an asset, a loan is a liability, and profits (if I had any) are equity.

---

So using the tools of double entry book-keeping the standard story is:

<div class="flex place-content-center mb-4">
    <button 
    transition:fade
    class="cursor-pointer bg-yellow-500 px-2 text-white rounded"
    onclick={standardStory.steps[standardStory.current].f}
    disabled={standardStory.finished}
    >{standardStory.steps[standardStory.current].text}</button>
</div>

<div class="justify-between flex gap-6">
    {#each Object.values(standardStory.accounts) as account}
        <TAccount {...account} colorize={true}/>
    {/each}
</div>

**Effective** money is the money that can be drawn upon in the economy. It can't all be spent at once (that would cause a bank run), but otherwise it is all "in play".

Effective money: ${Math.round(standardStory.totalMoney.current)} 

{#if standardStory.explanation}
    <div transition:fade class="text-gray-500">{standardStory.explanation}</div>
{/if}
