<script>
  const posts = [
    {date: "2024-08-18", title: "Patterns revisited"},
  ]
  // const modules = import.meta.glob("./blog/*/**.md", {eager: true})
  // const f = './blog/2017-02-15-elixir-for-analytics/+page.md'
  // console.log(modules[f].title)
  // console.log(title, "!!")

  // const posts = Object.entries(modules).map((k, m) => ({
  //   title: m.title,
  //   date: m.date
  // }))

  function skewer(s){
    return s.replaceAll(" ", "-").toLowerCase()
  }

  function link(post){
    return `blog/${post.date}-${skewer(post.title)}`
  }
</script>

<h1 class="text-6xl">Hi</h1>
<h2>My name is Will and I like to write about code and data, sometimes.</h2>

<div class="mt-6">
  Posts:
  <div class="ml-4 mt-1 flex flex-col">
    {#each posts as post}
      <div>
        <a href = {link(post)}>{post.title}</a>
      </div>
    {/each}
  </div>  
</div>
