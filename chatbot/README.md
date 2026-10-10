# Chatbot

A console chatbot with a random name and age. It answers with built-in rules, or with
Claude when you give it an API key.

## Easiest: the Windows app

Double-click `dist/Chatbot.exe`.

- It needs Java 8 or newer installed on the PC (the .exe is a launcher with the program inside).
- It asks for an API key. Paste one to chat with Claude, or press Enter to use the built-in
  rules. The key is used for that chat only and is never saved.
- The window waits for Enter at the end so you can read the last message.

## Run from source (no Maven, no libraries)

```
cd chatbot
javac Chatbot.java
java Chatbot
```

## Getting an API key

1. Sign in at https://console.anthropic.com and add credits under billing.
2. Create a key on the API keys page and copy it (it is shown once).
3. Either paste it when the bot asks, or set it before starting:
   - Windows: `set ANTHROPIC_API_KEY=your-key-here`
   - Mac/Linux: `export ANTHROPIC_API_KEY=your-key-here`

Never paste a key into the code or commit it to git.

## Options

| Option | Meaning |
|---|---|
| `--names A,B,C` | pool of names to pick from |
| `--ages 20,35,70` | pool of ages to pick from |
| `--seed N` | repeatable random choices |
| `--no-delay` | skip the fake typing pause (rules mode) |
| `--rules` | never call the API |
| `--ai` | require Claude; exit with instructions if there is no key |
| `--model ID` | Claude model (default `claude-opus-5-5`; `claude-haiku-5-5` is cheaper) |
| `--pause` | wait for Enter before closing (the .exe uses this) |

In Claude mode the bot's random name, age, hometown, hobby, favorite food and color are given
to Claude as its persona. If an API call fails, that message is answered by the built-in
rules instead, and a rejected key turns Claude off for the rest of the chat.

## Rebuilding the .exe

Only needed after you change `Chatbot.java`. Needs a JDK and Maven:

```
sh exe-build/build-exe.sh
```

This compiles the code, packs it into a jar, and wraps it in `dist/Chatbot.exe` with Launch4j.
