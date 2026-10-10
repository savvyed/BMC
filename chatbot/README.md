# Chatbot

A console chatbot with a random name and age. It answers with built-in rules by default,
or with Claude when you pass `--ai`.

## Setup

1. Install Java 8 or newer and [Maven](https://maven.apache.org/install.html).
2. For AI mode, create an API key at https://console.anthropic.com and put it in an
   environment variable. Never paste the key into the code or commit it.

   Mac/Linux:  `export ANTHROPIC_API_KEY=your-key-here`
   Windows:    `set ANTHROPIC_API_KEY=your-key-here`

## Run

From this folder:

```
mvn compile exec:java                                    # built-in rules, no key needed
mvn compile exec:java -Dexec.args="--ai"                 # chat with Claude
mvn compile exec:java -Dexec.args="--ai --model claude-haiku-5-5"   # cheaper, faster model
mvn compile exec:java -Dexec.args="--names Ada,Sam --ages 20,40"
```

Add `-q` after `mvn` to hide Maven's own log lines.

## Options

| Option | Meaning |
|---|---|
| `--names A,B,C` | pool of names to pick from |
| `--ages 20,35,70` | pool of ages to pick from |
| `--seed N` | repeatable random choices |
| `--no-delay` | skip the fake typing pause (rules mode) |
| `--ai` | answer with Claude (needs `ANTHROPIC_API_KEY`) |
| `--model ID` | Claude model for `--ai` (default `claude-opus-5-5`) |

In AI mode the bot's random name, age, hometown, hobby, favorite food and color are given
to Claude as its persona. If an API call fails, that message is answered by the built-in
rules instead, and a rejected key turns AI mode off for the rest of the chat.
