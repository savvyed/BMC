import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
import java.util.Scanner;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * A console chatbot that feels conversational without calling any AI service.
 *
 * On startup it picks a name and an age independently at random from two pools
 * (plus a hometown, hobby, favorite food and color), then keeps that identity.
 *
 * How it "thinks" (all rule-based, nothing is learned or generated):
 *   - pattern rules for questions about the bot, greetings, jokes, time, math
 *   - ELIZA-style reflection: "I feel tired" -> "Why do you feel tired?"
 *   - memory: remembers your name and things you like, and brings them up later
 *   - variety: many phrasings per intent, never the same reply twice in a row,
 *     random openers/follow-ups, and a short "typing" pause
 *
 * Run:  javac Chatbot.java && java Chatbot   (works on Java 8 and newer)
 *
 * Options (all optional):
 *   --names Ada,Milo,Zara   replace the default name pool with any names
 *   --ages 20,35,70         replace the default age pool with any ages
 *   --seed 42               make the random choices repeatable
 *   --no-delay              skip the typing pause
 */
public class Chatbot {

    // ---- identity pools --------------------------------------------------

    private static final List<String> NAMES = Arrays.asList(
            "Ada", "Milo", "Zara", "Theo", "Luna", "Felix", "Nova", "Otis",
            "Iris", "Jasper", "Mina", "Rowan", "Sage", "Leo", "Priya", "Kai");

    private static final List<Integer> AGES = Arrays.asList(
            19, 22, 24, 27, 29, 31, 34, 38, 41, 45, 52, 58, 67);

    private static final String[] CITIES = {
            "Lisbon", "Osaka", "Nairobi", "Toronto", "Reykjavik", "Austin",
            "Mumbai", "Seville", "Melbourne", "Oslo", "Lima", "Cape Town"};

    private static final String[] HOBBIES = {
            "hiking", "painting", "chess", "baking bread", "stargazing",
            "playing guitar", "birdwatching", "cycling", "writing poems",
            "building model trains", "gardening", "photography"};

    private static final String[] FOODS = {
            "ramen", "tacos", "dumplings", "lasagna", "pad thai", "falafel",
            "mango sticky rice", "pancakes", "sushi", "curry", "pizza", "pho"};

    private static final String[] COLORS = {
            "teal", "orange", "forest green", "deep purple", "sky blue",
            "crimson", "yellow", "silver", "indigo", "coral"};

    // ---- reply pools -----------------------------------------------------

    private static final String[] GREETINGS = {
            "Hi! I'm {name}, {age} years old. What's your name?",
            "Hello there! {name} here, I'm {age}. And you are?",
            "Hey! They call me {name}. I'm {age}. What should I call you?",
            "Welcome! I'm {name} ({age}). Who am I talking to?"};

    private static final String[] FAREWELLS = {
            "Goodbye, {user}! It was nice chatting.",
            "See you later, {user}. Take care!",
            "Bye for now, {user}. Come back anytime.",
            "Talk soon, {user}!",
            "Until next time, {user}. Be well."};

    private static final String[] EMPTY_PROMPTS = {
            "Say something, I'm listening.",
            "You went quiet. What's on your mind?",
            "I'm here whenever you're ready."};

    private static final String[] OPENERS = {
            "Hmm. ", "Well... ", "Okay. ", "Right. ", "Let me think. "};

    private static final String[] FOLLOW_UPS = {
            "What about you?",
            "Anything else on your mind?",
            "What's been keeping you busy lately?",
            "Is there something you'd like to talk about, {user}?",
            "How about you, {user}?",
            "What made you ask?"};

    private static final String[] NAME_REPLIES = {
            "Nice to meet you, {user}!",
            "{user}, great name. I'll remember it.",
            "Pleased to meet you, {user}. Ask me anything.",
            "Got it, {user}. Good to have you here!"};

    private static final String[] JOKES = {
            "Why do Java developers wear glasses? Because they don't C#.",
            "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads.",
            "There are 10 kinds of people: those who understand binary and those who don't.",
            "Why was the function sad? It didn't get any arguments.",
            "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
            "Why did the programmer quit? They didn't get arrays (a raise).",
            "I'd tell you a UDP joke, but you might not get it."};

    private static final String[] SAD_REPLIES = {
            "I'm sorry you're feeling that way. Want to talk about what's behind it?",
            "That sounds rough. What happened?",
            "I'm here and listening. What's weighing on you, {user}?",
            "That's a lot to carry. When did it start?",
            "Thanks for telling me. What would help right now?"};

    private static final String[] HAPPY_REPLIES = {
            "That's great to hear! What's making it good?",
            "Love that. What happened?",
            "Nice! Tell me more, {user}.",
            "Glad things are going well. What's the best part?",
            "Wonderful. Is there a reason behind the good mood?"};

    private static final String[] YES_NO_REPLIES = {
            "Okay. Tell me more.",
            "Got it. Why do you say that?",
            "I see. Go on.",
            "Fair enough. What makes you feel that way?"};

    private static final String[] LAUGH_REPLIES = {
            "Glad that landed!", "Ha, I'll take that as a win.", "Happy to make you smile."};

    private static final String[] QUESTION_REPLIES = {
            "Good question. What do you think?",
            "I'm not sure, honestly. What's your take?",
            "Hard to say. What made you wonder?",
            "I'd have to think about that one. What's your guess?",
            "That's worth digging into. Where would you start?"};

    private static final String[] RECALLS = {
            "Earlier you mentioned liking $1. Tell me more about that.",
            "Going back to $1, what do you like about it?",
            "You said you like $1 earlier. Does that come up a lot?"};

    private static final String[] KEYWORD_PROMPTS = {
            "Tell me more about {kw}.",
            "What does {kw} mean to you?",
            "Why did {kw} come to mind?",
            "How do you feel about {kw}?",
            "Interesting, {kw}. What's the story there?"};

    private static final String[] FALLBACKS = {
            "Interesting, tell me more.",
            "Hmm, I'm not sure what to say to that. Can you rephrase?",
            "I want to understand. Could you say that a different way?",
            "Go on, I'm listening.",
            "That's new to me. What do you mean?",
            "Say more, {user}.",
            "I'm following. Keep going.",
            "Not sure I caught that. Ask me my name, my age, or tell me how you're doing."};

    // ---- word sets and patterns -----------------------------------------

    private static final Set<String> SAD_WORDS = new HashSet<String>(Arrays.asList(
            "sad", "depressed", "lonely", "tired", "stressed", "anxious", "angry",
            "upset", "worried", "bored", "exhausted", "scared", "miserable"));

    private static final Set<String> HAPPY_WORDS = new HashSet<String>(Arrays.asList(
            "happy", "great", "awesome", "excited", "wonderful", "fantastic",
            "amazing", "thrilled", "good", "fine", "joyful"));

    private static final Set<String> NOT_NAMES = new HashSet<String>(Arrays.asList(
            "hi", "hello", "hey", "yo", "yes", "no", "yeah", "yep", "nope", "ok",
            "okay", "sure", "thanks", "help", "joke", "bye", "hiya", "howdy", "lol",
            "maybe", "what", "why", "how", "who", "nothing", "none"));

    private static final Set<String> STOPWORDS = new HashSet<String>(Arrays.asList(
            "the", "and", "but", "are", "was", "were", "this", "that", "with", "have",
            "has", "had", "for", "not", "you", "your", "she", "they", "them", "what",
            "when", "where", "why", "how", "who", "just", "very", "really", "can",
            "will", "would", "about", "like", "know", "think", "get", "got", "want",
            "from", "then", "than", "there", "here", "some", "any", "its", "also",
            "been", "being", "does", "did", "doing", "going", "much", "many", "more"));

    private static final Map<String, String> SWAPS = new HashMap<String, String>();
    static {
        String[][] pairs = {
                {"i", "you"}, {"me", "you"}, {"my", "your"}, {"mine", "yours"},
                {"am", "are"}, {"you", "me"}, {"your", "my"}, {"yours", "mine"},
                {"are", "am"}, {"myself", "yourself"}, {"yourself", "myself"}};
        for (String[] p : pairs) {
            SWAPS.put(p[0], p[1]);
        }
    }

    private static final String[][] CONTRACTIONS = {
            {"what's", "what is"}, {"whats", "what is"}, {"that's", "that is"},
            {"it's", "it is"}, {"how's", "how is"}, {"where's", "where is"},
            {"who's", "who is"}, {"i'm", "i am"}, {"im", "i am"},
            {"you're", "you are"}, {"i've", "i have"}, {"i'll", "i will"},
            {"i'd", "i would"}, {"don't", "do not"}, {"dont", "do not"},
            {"doesn't", "does not"}, {"can't", "cannot"}, {"cant", "cannot"},
            {"won't", "will not"}, {"isn't", "is not"}, {"aren't", "are not"},
            {"didn't", "did not"}, {"u", "you"}, {"ur", "your"}, {"r", "are"}};

    private static final Pattern QUIT = Pattern.compile(
            "^(?:bye|goodbye|quit|exit|cya|see you|see ya|good night)(?: .*)?$");
    private static final Pattern NAME_ONLY = Pattern.compile("^([a-z]{2,15})$");
    private static final Pattern NAME_STATEMENT = Pattern.compile(
            "\\b(?:my name is|i am called|name is) ([a-z]{2,15})\\b");
    private static final Pattern ASK_MY_NAME = Pattern.compile(
            "\\b(?:what is my name|do you know my name|who am i|do you remember my name)\\b");
    private static final Pattern MATH = Pattern.compile(
            "(-?\\d+(?:\\.\\d+)?)\\s*([+\\-*/x])\\s*(-?\\d+(?:\\.\\d+)?)");
    private static final Pattern YES_NO = Pattern.compile(
            "^(?:yes|yeah|yep|yup|sure|ok|okay|no|nope|nah|maybe|perhaps)$");
    private static final Pattern LAUGH = Pattern.compile("^(?:lol|lmao|haha+|hehe+)$");
    private static final Pattern FIRST_PERSON = Pattern.compile(
            "\\bi (?:am|feel|was|have been)\\b|\\bfeeling\\b");
    private static final Pattern NEGATION = Pattern.compile("\\b(?:not|never|hardly)\\b");

    // ---- rules -----------------------------------------------------------

    private static final int PLAIN = 0;     // just reply
    private static final int CHATTY = 1;    // may add an opener or a follow-up question
    private static final int REMEMBER = 2;  // store what the user likes, then reply

    private static final class Rule {
        final Pattern pattern;
        final int mode;
        final String[] replies;

        Rule(String regex, int mode, String[] replies) {
            this.pattern = Pattern.compile(regex);
            this.mode = mode;
            this.replies = replies;
        }
    }

    private final List<Rule> personaRules = new ArrayList<Rule>();
    private final List<Rule> reflectRules = new ArrayList<Rule>();

    // ---- state -----------------------------------------------------------

    private final String name;
    private final int age;
    private final String city;
    private final String hobby;
    private final String food;
    private final String color;
    private final Random random;

    private String userName;
    private final List<String> likes = new ArrayList<String>();
    private String lastTemplate = "";
    private int turns = 0;

    public Chatbot(List<String> names, List<Integer> ages, Random random) {
        this.random = random;
        this.name = names.get(random.nextInt(names.size()));
        this.age = ages.get(random.nextInt(ages.size()));
        this.city = any(CITIES);
        this.hobby = any(HOBBIES);
        this.food = any(FOODS);
        this.color = any(COLORS);
        buildRules();
    }

    public String getName() {
        return name;
    }

    public String greeting() {
        return fill(any(GREETINGS));
    }

    public String farewell() {
        return fill(any(FAREWELLS));
    }

    private void buildRules() {
        // Questions about the bot
        add(personaRules, CHATTY,
                "\\b(?:what is your name|who are you|your name|what do they call you|what should i call you)\\b",
                "I'm {name}.", "My name's {name}.", "They call me {name}.",
                "I go by {name}.", "Name's {name}, nice to meet you!");
        add(personaRules, CHATTY,
                "\\bhow old are you\\b|\\byour age\\b|\\bwhen were you born\\b",
                "I'm {age}.", "{age} years young.", "I'm {age}, if you're counting.",
                "{age}. Old enough to know better, young enough to try.");
        add(personaRules, PLAIN,
                "\\b(?:are you|you are) (?:a |an )?(?:robot|ai|bot|human|real|person|machine|computer|chatbot)\\b",
                "I'm a chatbot, a small Java program called {name}. I follow rules rather than think, but I try to keep up.",
                "Not a human, no. I'm {name}, a rule-based chatbot with a good vocabulary and a short memory.",
                "Honest answer: I'm software. {name} is just the name I picked at startup.");
        add(personaRules, CHATTY,
                "\\bwhere (?:are you from|do you live|were you born)\\b|\\byour hometown\\b",
                "I'm from {city}.", "{city}, born and raised.", "I call {city} home.");
        add(personaRules, CHATTY,
                "\\bfavou?rite (?:food|meal|dish)\\b|\\bwhat do you (?:like to )?eat\\b",
                "{food}, hands down.", "I could eat {food} every day.", "My favorite is {food}.");
        add(personaRules, CHATTY,
                "\\bfavou?rite colou?r\\b",
                "{color}.", "Probably {color}.", "I keep coming back to {color}.");
        add(personaRules, CHATTY,
                "\\bwhat do you (?:like|enjoy|do for fun|do in your free time)\\b|\\byour hobb(?:y|ies)\\b|\\bwhat are your hobbies\\b",
                "I enjoy {hobby}.", "Mostly {hobby}.", "{hobby}. It clears my head.");
        add(personaRules, PLAIN,
                "\\btell me about yourself\\b|\\bintroduce yourself\\b",
                "I'm {name}, {age} years old, from {city}. I like {hobby} and my favorite food is {food}.",
                "Short version: {name}, {age}, {city}. I'm into {hobby}, and I'd never say no to {food}.");
        add(personaRules, CHATTY,
                "\\bhow are you\\b|\\bhow do you feel\\b|\\bhow is it going\\b|\\bwhat is up\\b|\\bsup\\b",
                "Doing well, thanks for asking.", "Pretty good! Can't complain.",
                "I'm great. Ready to chat.", "All systems running smoothly.");

        // Small talk and utilities
        add(personaRules, CHATTY,
                "^(?:hello|hi|hey|howdy|hiya|yo|greetings|good (?:morning|afternoon|evening))\\b",
                "Hello! Ask me my name or my age.", "Hey there! What's up?",
                "Hi! Good to see you.", "Hello, {user}! What shall we talk about?");
        add(personaRules, PLAIN,
                "\\b(?:thanks|thank you|thx|cheers)\\b",
                "You're welcome!", "Anytime.", "Happy to help.", "No problem at all.");
        add(personaRules, PLAIN,
                "\\b(?:joke|make me laugh|something funny)\\b", JOKES);
        add(personaRules, PLAIN,
                "\\bwhat time\\b|\\bcurrent time\\b|\\btime is it\\b",
                "It's {time}.", "Right now it's {time}.");
        add(personaRules, PLAIN,
                "\\bwhat day\\b|\\bwhat is the date\\b|\\btodays? date\\b|\\bwhat is today\\b",
                "Today is {date}.", "It's {date}.");
        add(personaRules, PLAIN,
                "^(?:help|help me)$|\\bwhat can you do\\b",
                "I can chat, tell jokes, do simple math like 12 * 7, tell you the time and date, "
                        + "and talk about myself. Tell me how you feel, and I'll listen.");
        add(personaRules, PLAIN,
                "\\byou are (?:so |really |very )?(?:smart|nice|great|funny|cool|awesome|amazing|clever|kind|good|wonderful)\\b|\\bi (?:like|love) you\\b",
                "Thank you, that's kind of you to say.", "You're making me blush, {user}.",
                "Aw, thanks. You're not so bad yourself.");
        add(personaRules, PLAIN,
                "\\byou are (?:so |really |very )?(?:stupid|dumb|useless|bad|boring|annoying|rude)\\b",
                "Ouch. I'll try to do better. What went wrong?",
                "Fair, I'm still learning the ropes. What did I miss?");
        add(personaRules, PLAIN,
                "\\bwhat do you think (?:about|of) (.+)",
                "I'm still making up my mind about $1. What do you think?",
                "$1 is interesting. I'd like to hear your view first.");
        add(personaRules, PLAIN,
                "\\bdo you (?:like|love|enjoy) (.+)",
                "Honestly I'm not sure about $1. Do you?",
                "Maybe! What do you like about $1?");

        // ELIZA-style reflection: echo the user's statement back as a question
        add(reflectRules, PLAIN,
                "\\bi do not know\\b|\\bnot sure\\b|\\bidk\\b",
                "That's okay. We can think it through together.",
                "No rush. What's your gut feeling?");
        add(reflectRules, PLAIN, "\\bbecause (.+)",
                "Is that the real reason?", "Does $1 explain everything?",
                "What else could be behind it?");
        add(reflectRules, PLAIN, "\\bi feel (.+)",
                "Why do you feel $1?", "How long have you felt $1?",
                "What makes you feel $1?");
        add(reflectRules, PLAIN, "\\bi am (.+)",
                "How long have you been $1?", "Why do you say you are $1?",
                "How does being $1 feel?");
        add(reflectRules, PLAIN, "\\bi want (.+)",
                "Why do you want $1?", "What would it mean to you to have that?",
                "What's stopping you?");
        add(reflectRules, PLAIN, "\\bi wish (.+)",
                "Why do you wish $1?", "What would change if that came true?");
        add(reflectRules, PLAIN, "\\bi need (.+)",
                "Why do you need $1?", "Would $1 really help?");
        add(reflectRules, REMEMBER, "\\bi (?:like|love|enjoy) (.+)",
                "What do you like about $1?", "How long have you liked $1?",
                "Nice, $1 sounds good. What got you into it?");
        add(reflectRules, PLAIN, "\\bi (?:hate|dislike|cannot stand) (.+)",
                "What is it about $1 that bothers you?", "Did something happen with $1?");
        add(reflectRules, PLAIN, "\\bi (?:think|believe|guess|suppose) (.+)",
                "What makes you think $1?", "Do you really think so?",
                "How sure are you that $1?");
        add(reflectRules, PLAIN, "\\bi cannot (.+)",
                "What stops you from being able to $1?", "Have you tried?");
        add(reflectRules, PLAIN, "\\bi have (.+)",
                "Tell me more about having $1.", "How do you feel about having $1?");
        add(reflectRules, PLAIN, "\\bcan you (.+)",
                "I might be able to $1. What did you have in mind?",
                "Probably not, but I can try to $1. Want me to?");
        add(reflectRules, PLAIN, "\\bdo you (.+)",
                "Why do you ask whether I $1?", "Maybe I do. What do you think?");
        add(reflectRules, PLAIN, "\\byou are (.+)",
                "What makes you say I am $1?", "Do you often see me as $1?");
        add(reflectRules, PLAIN,
                "\\bmy (mom|mother|dad|father|sister|brother|friend|boss|wife|husband|partner|dog|cat|family|teacher)\\b",
                "Tell me more about your $1.", "How is your relationship with your $1?",
                "What's your $1 like?");
        add(reflectRules, PLAIN, "^(?:what|who|where|when|how|which|why)\\b", QUESTION_REPLIES);
    }

    private void add(List<Rule> list, int mode, String regex, String... replies) {
        list.add(new Rule(regex, mode, replies));
    }

    // ---- conversation ----------------------------------------------------

    /** Returns the bot's reply, or null if the user wants to quit. */
    public String reply(String input) {
        String text = normalize(input);
        turns++;

        if (text.isEmpty()) {
            return fill(choose(EMPTY_PROMPTS));
        }
        if (QUIT.matcher(text).matches()) {
            return null;
        }

        // The first answer to "what's your name?" is often just the name.
        if (userName == null && turns == 1) {
            Matcher m = NAME_ONLY.matcher(text);
            if (m.matches() && !NOT_NAMES.contains(m.group(1))) {
                setUserName(m.group(1));
                return finish(choose(NAME_REPLIES), null, PLAIN);
            }
        }
        Matcher nameStatement = NAME_STATEMENT.matcher(text);
        if (nameStatement.find()) {
            setUserName(nameStatement.group(1));
            return finish(choose(NAME_REPLIES), null, PLAIN);
        }
        if (ASK_MY_NAME.matcher(text).find()) {
            return userName == null
                    ? "You haven't told me yet. What should I call you?"
                    : "You're " + userName + ".";
        }

        String math = calculate(text);
        if (math != null) {
            return math;
        }

        String viaRule = applyRules(personaRules, text);
        if (viaRule != null) {
            return viaRule;
        }

        // Feelings: a mood word decides the reply before we echo the sentence back.
        List<String> words = Arrays.asList(text.split(" "));
        if (FIRST_PERSON.matcher(text).find() || words.size() <= 2) {
            boolean negated = NEGATION.matcher(text).find();
            for (String w : words) {
                if (SAD_WORDS.contains(w) && !negated) {
                    return finish(choose(SAD_REPLIES), null, PLAIN);
                }
                if (HAPPY_WORDS.contains(w)) {
                    return finish(choose(negated ? SAD_REPLIES : HAPPY_REPLIES), null, PLAIN);
                }
            }
        }

        viaRule = applyRules(reflectRules, text);
        if (viaRule != null) {
            return viaRule;
        }
        if (YES_NO.matcher(text).matches()) {
            return finish(choose(YES_NO_REPLIES), null, PLAIN);
        }
        if (LAUGH.matcher(text).matches()) {
            return finish(choose(LAUGH_REPLIES), null, PLAIN);
        }
        return fallback(words);
    }

    private String applyRules(List<Rule> rules, String text) {
        for (Rule rule : rules) {
            Matcher m = rule.pattern.matcher(text);
            if (m.find()) {
                if (rule.mode == REMEMBER && m.groupCount() >= 1 && likes.size() < 10) {
                    likes.add(reflect(m.group(1)));
                }
                return finish(choose(rule.replies), m, rule.mode);
            }
        }
        return null;
    }

    private String fallback(List<String> words) {
        if (!likes.isEmpty() && random.nextInt(100) < 20) {
            String like = likes.get(random.nextInt(likes.size()));
            return finish(choose(RECALLS).replace("$1", like), null, PLAIN);
        }
        String keyword = null;
        for (String w : words) {
            if (w.length() >= 4 && w.matches("[a-z]+") && !STOPWORDS.contains(w)
                    && (keyword == null || w.length() > keyword.length())) {
                keyword = w;
            }
        }
        if (keyword != null && random.nextInt(100) < 65) {
            return finish(choose(KEYWORD_PROMPTS).replace("{kw}", keyword), null, CHATTY);
        }
        return finish(choose(FALLBACKS), null, PLAIN);
    }

    private String calculate(String text) {
        Matcher m = MATH.matcher(text);
        if (!m.find()) {
            return null;
        }
        double a = Double.parseDouble(m.group(1));
        double b = Double.parseDouble(m.group(3));
        double result;
        switch (m.group(2)) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "/":
                if (b == 0) {
                    return "I can't divide by zero, not even in Java.";
                }
                result = a / b;
                break;
            default:
                result = a * b;
                break;
        }
        String shown = result == Math.rint(result) && Math.abs(result) < 1e15
                ? String.valueOf((long) result)
                : String.format(Locale.ROOT, "%.4f", result).replaceAll("0+$", "").replaceAll("\\.$", "");
        return any(new String[]{"That's " + shown + ".", "It comes to " + shown + ".",
                "Easy: " + shown + "."});
    }

    // ---- helpers ---------------------------------------------------------

    /** Fills placeholders, then optionally adds an opener and a follow-up question. */
    private String finish(String template, Matcher m, int mode) {
        String t = template;
        if (m != null && m.groupCount() >= 1 && m.group(1) != null) {
            t = t.replace("$1", reflect(m.group(1).trim()));
        }
        t = fill(t);
        if (mode == CHATTY) {
            if (random.nextInt(100) < 15) {
                t = any(OPENERS) + t;
            }
            if (!t.endsWith("?") && random.nextInt(100) < 35) {
                t = t + " " + fill(any(FOLLOW_UPS));
            }
        }
        return t;
    }

    private String fill(String t) {
        t = t.replace("{name}", name)
                .replace("{age}", String.valueOf(age))
                .replace("{city}", city)
                .replace("{hobby}", hobby)
                .replace("{food}", food)
                .replace("{color}", color)
                .replace("{user}", userName == null ? "friend" : userName);
        if (t.contains("{time}")) {
            t = t.replace("{time}", LocalTime.now().format(DateTimeFormatter.ofPattern("h:mm a")));
        }
        if (t.contains("{date}")) {
            t = t.replace("{date}",
                    LocalDate.now().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy")));
        }
        return t;
    }

    /** Picks an option, avoiding an immediate repeat of the previous template. */
    private String choose(String[] options) {
        String pick = options[random.nextInt(options.length)];
        for (int i = 0; i < 5 && options.length > 1 && pick.equals(lastTemplate); i++) {
            pick = options[random.nextInt(options.length)];
        }
        lastTemplate = pick;
        return pick;
    }

    private String any(String[] options) {
        return options[random.nextInt(options.length)];
    }

    private void setUserName(String raw) {
        userName = Character.toUpperCase(raw.charAt(0)) + raw.substring(1);
    }

    /** Swaps point of view: "my dog likes me" becomes "your dog likes you". */
    private static String reflect(String s) {
        String[] words = s.split(" ");
        for (int i = 0; i < words.length; i++) {
            String swapped = SWAPS.get(words[i]);
            if (swapped != null) {
                words[i] = swapped;
            }
        }
        return String.join(" ", words);
    }

    /** Lowercases, expands contractions, turns "plus" into "+", and strips punctuation. */
    private static String normalize(String input) {
        String t = input.toLowerCase().replace('\u2019', '\'').trim();
        for (String[] c : CONTRACTIONS) {
            t = t.replaceAll("\\b" + c[0] + "\\b", c[1]);
        }
        t = t.replaceAll("\\bplus\\b", "+")
                .replaceAll("\\bminus\\b", "-")
                .replaceAll("\\b(?:times|multiplied by)\\b", "*")
                .replaceAll("\\b(?:divided by|over)\\b", "/");
        t = t.replaceAll("[^a-z0-9+\\-*/. ']", " ");
        t = t.replaceAll("(?<!\\d)\\.|\\.(?!\\d)", " ");
        t = t.replace("'", "");
        return t.replaceAll("\\s+", " ").trim();
    }

    // ---- command line ----------------------------------------------------

    public static void main(String[] args) {
        List<String> names = NAMES;
        List<Integer> ages = AGES;
        Random random = new Random();
        boolean delay = true;

        try {
            for (int i = 0; i < args.length; i++) {
                String option = args[i];
                if (option.equals("--no-delay")) {
                    delay = false;
                    continue;
                }
                if (i + 1 >= args.length) {
                    throw new IllegalArgumentException("Missing value for " + option);
                }
                String value = args[++i];
                switch (option) {
                    case "--names":
                        names = parseNames(value);
                        break;
                    case "--ages":
                        ages = parseAges(value);
                        break;
                    case "--seed":
                        random = new Random(Long.parseLong(value.trim()));
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown option " + option);
                }
            }
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            System.err.println(
                    "Usage: java Chatbot [--names A,B,C] [--ages 20,30] [--seed N] [--no-delay]");
            System.exit(2);
        }

        Chatbot bot = new Chatbot(names, ages, random);
        Random pause = new Random();

        System.out.println(bot.getName() + ": " + bot.greeting());
        System.out.println("(type 'bye' to leave)");

        try (Scanner in = new Scanner(System.in)) {
            while (true) {
                System.out.print("You: ");
                if (!in.hasNextLine()) {
                    break;
                }
                String response = bot.reply(in.nextLine());
                if (delay) {
                    sleep(300 + pause.nextInt(600));
                }
                if (response == null) {
                    System.out.println(bot.getName() + ": " + bot.farewell());
                    break;
                }
                System.out.println(bot.getName() + ": " + response);
            }
        }
    }

    private static void sleep(int millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private static List<String> parseNames(String csv) {
        List<String> names = Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(n -> !n.isEmpty())
                .collect(Collectors.toList());
        if (names.isEmpty()) {
            throw new IllegalArgumentException("--names needs at least one name");
        }
        return names;
    }

    private static List<Integer> parseAges(String csv) {
        List<Integer> ages;
        try {
            ages = Arrays.stream(csv.split(","))
                    .map(String::trim)
                    .filter(a -> !a.isEmpty())
                    .map(Integer::parseInt)
                    .collect(Collectors.toList());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("--ages must be whole numbers, e.g. 20,35,70");
        }
        if (ages.isEmpty() || ages.stream().anyMatch(a -> a < 0)) {
            throw new IllegalArgumentException("--ages needs one or more non-negative numbers");
        }
        return ages;
    }
}
