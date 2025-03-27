<script>
  import Anthropic from "@anthropic-ai/sdk";

  const anthropic = new Anthropic({dangerouslyAllowBrowser: true, apiKey: import.meta.env.ANTHROPIC_API_KEY});

  let textInput = $state("")
  let response = $state("")

  async function getResponse(){
    const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1000,
      temperature: 1,
      system: "Respond only with short poems.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: textInput
            }
          ]
        }
      ]
    });

    response = msg.content[0].text;
    }
</script>

<div>
  <h1>Game</h1>

  <input type="text" bind:value={textInput} />
  <button onclick={getResponse}>Get Response</button>
  <p>{response}</p>
</div>
