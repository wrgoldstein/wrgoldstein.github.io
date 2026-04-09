---
layout: post
title: Mug
summary: Building a native code editor with Tauri, Svelte, and vibes
date: 2026-03-26
---

I deleted vscode this week, and my only text editor now is one I vibe coded.


It's called **Mug**. It's built with [Tauri](https://v2.tauri.app/) (Rust) and [SvelteKit](https://svelte.dev/) (TypeScript). It has syntax highlighting, a file tree, tabs, find and replace, and a steaming coffee mug on the welcome screen. It's about 3,000 lines of code and a 15MB binary. 

I'm not trying to replace VS Code. I just wanted to see what it feels like to build something you use every day, from scratch, with tools you enjoy.

## The stack

Tauri gives you a native app shell with a webview. Your frontend is HTML/CSS/JS — in my case, SvelteKit. The backend is Rust, which handles filesystem access, dialogs, and shell commands. The two talk through a simple invoke/command bridge.

The editing surface is a `<textarea>` overlaid on a [Shiki](https://shiki.style/) syntax-highlighted code layer. The textarea is transparent; you type into it but see the colored code underneath. It's a hack, but a surprisingly effective one.

## What I learned about building tools for yourself

The best feature prioritization framework is dogfooding. Once I deleted VS Code and started using Mug full-time, the missing features sorted themselves immediately:

1. **Multi-file tabs** — I couldn't open two files at once. This was first.
2. **Cmd+D select next occurrence** — I kept reaching for it and nothing happened.
3. **Word wrap** — some files were just unreadable.
4. **Find and replace** — obvious.
5. **fzf file search** — the JS fuzzy matcher I wrote was fine, but piping `fd` into `fzf --filter` on the Rust side was instant and matched what my muscle memory expected.

The zoxide integration for opening projects was a happy accident. Instead of a native file picker (slow, off-brand), Cmd+O opens a palette of your most-used directories ranked by frecency. You type a few characters and hit enter. It feels like `cd`-ing in your terminal.

## Design

I wanted the editor to feel calm. Scandinavian minimalist: warm charcoal backgrounds, muted text, almost no borders. The only color is a copper accent (`#c8956c`) that shows up on the cursor, the active tab underline, dirty file indicators, and the git branch icon.

The header toolbar is gone — no buttons, no dropdowns. If you know the shortcut, you don't need the button. If you don't, the welcome screen shows you.

Speaking of which: the welcome screen has an SVG coffee mug that fills up with a Svelte `Tween`, then canvas particles drift off it as steam. It says "let's get to work" in copper underneath. It's completely unnecessary and I love it.

## The small details

- The tab bar has a tiny SVG mug in the top right with animated steam wisps
- Git-modified files glow copper in the sidebar, new files are green
- The sidebar resize handle is invisible until you hover it, then it turns copper
- The file path in the footer uses `…` to collapse deep paths: `src/…/nested/File.svelte`
- Closing all tabs brings you back to the welcome screen and the mug fills up again

## What's missing

Plenty. There's no multi-cursor (textareas don't support it). No minimap. No extensions. No LSP. The architecture note in my TODO file says it plainly: a `<textarea>` will eventually fight you, and the real path forward is swapping in CodeMirror 6 as the editing core.

But that's a future problem. Right now it opens fast, the shortcuts work, and the steam rises from the mug while I think about what to type next.

[github.com/wrgoldstein/mug](https://github.com/wrgoldstein/mug)
