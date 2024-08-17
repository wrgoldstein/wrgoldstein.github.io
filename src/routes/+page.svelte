<script>
  const posts = [
    {title: "New blog", date: "2024-08-16"}
  ]

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
  <div class="flex ml-4 mt-1">
    {#each posts as post}
      <div>
        <a href = {link(post)}>{post.title}</a>
      </div>
    {/each}
  </div>  
</div>
