#!/bin/sh
# Rebuilds dist/Chatbot.exe from Chatbot.java. Needs a JDK (8+) and Maven.
# Works on Mac, Linux and Windows (Git Bash). Run it from anywhere.
set -e
cd "$(dirname "$0")"
rm -rf build classes
mkdir -p build classes
javac -encoding UTF-8 -source 8 -target 8 -d classes ../Chatbot.java
jar cfe build/Chatbot.jar Chatbot -C classes .
mvn -q -B package
cp build/Chatbot.exe ../dist/Chatbot.exe
echo "Built dist/Chatbot.exe"
