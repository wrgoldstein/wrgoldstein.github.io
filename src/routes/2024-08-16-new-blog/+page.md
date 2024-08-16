<script>
    import Boinger from "./Boinger.svelte"    
</script>

# New blog

I've got a new blog! Well, the same blog, but with some upgrades I'd been thinking about for the last couple of years that I hadn't gotten around to yet.

The old blog was a classic [Github Pages Jekyll blog](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll), which was totally fine for what it was, but it was missing some things I really wanted.

The main missing thing is that the old blog was built on classic markdown, which meant it supported javascript inside `<script>` tags, and markdown text, but the two couldn't interact. The new idea is to back the blog up with a more modern component engine ([svelte](https://svelte.dev/)), which will let me do more cool stuff.

Like this.

<Boinger/>
