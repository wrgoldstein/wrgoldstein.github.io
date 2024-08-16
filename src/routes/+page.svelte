<script>
  const posts = [
    {title: "New blog", date: "2024-08-16"}
  ]

  function skewer(s){
    return s.replaceAll(" ", "-").toLowerCase()
  }

  function link(post){
    return `${post.date}-${skewer(post.title)}`
  }
</script>

<h1 class="text-6xl">Hi</h1>

<div class="flex">
  {#each posts as post}
    <div>
      <a href = {link(post)}>{post.title}</a>
    </div>
  {/each}
</div>
