import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

/**
 * A small console chatbot. On startup it picks a name and an age independently
 * at random from two pools and uses them as its identity for the rest of the chat.
 *
 * Run:  javac Chatbot.java && java Chatbot
 *
 * Options (all optional):
 *   --names Ada,Milo,Zara   replace the default name pool with any names
 *   --ages 20,35,70         replace the default age pool with any ages
 *   --seed 42               make the random pick repeatable
 */
public class Chatbot {

    private static final List<String> NAMES =
            List.of("Ada", "Milo", "Zara", "Theo", "Luna", "Felix", "Nova", "Otis");

    private static final List<Integer> AGES =
            List.of(19, 24, 27, 31, 38, 45, 52, 67);

    private final String name;
    private final int age;
    private final Random random;

    public Chatbot(List<String> names, List<Integer> ages, Random random) {
        this.random = random;
        this.name = names.get(random.nextInt(names.size()));
        this.age = ages.get(random.nextInt(ages.size()));
    }

    public String greeting() {
        return "Hi! I'm " + name + ", I'm " + age + " years old. What's your name?";
    }

    /** Returns the bot's reply, or null if the user wants to quit. */
    public String reply(String input) {
        String text = input.trim().toLowerCase();

        if (text.isEmpty()) {
            return "Say something, I'm listening.";
        }
        if (text.equals("bye") || text.equals("quit") || text.equals("exit")) {
            return null;
        }
        if (text.contains("your name") || text.contains("who are you")) {
            return "I'm " + name + ".";
        }
        if (text.contains("how old") || text.contains("your age")) {
            return "I'm " + age + ".";
        }
        if (text.startsWith("my name is ")) {
            String userName = input.trim().substring("my name is ".length()).trim();
            return userName.isEmpty()
                    ? "I didn't catch that name."
                    : "Nice to meet you, " + userName + "!";
        }
        if (text.contains("hello") || text.equals("hi") || text.startsWith("hi ")
                || text.contains("hey")) {
            return "Hello! Ask me my name or my age.";
        }
        if (text.contains("how are you")) {
            return "Doing well, thanks for asking.";
        }
        return pick("Interesting, tell me more.",
                "Hmm, I'm not sure what to say to that.",
                "Can you rephrase that?",
                "Ask me my name or age, I can answer that.");
    }

    private String pick(String... options) {
        return options[random.nextInt(options.length)];
    }

    public static void main(String[] args) {
        List<String> names = NAMES;
        List<Integer> ages = AGES;
        Random random = new Random();

        try {
            for (int i = 0; i < args.length; i += 2) {
                if (i + 1 >= args.length) {
                    throw new IllegalArgumentException("Missing value for " + args[i]);
                }
                String value = args[i + 1];
                switch (args[i]) {
                    case "--names" -> names = parseNames(value);
                    case "--ages" -> ages = parseAges(value);
                    case "--seed" -> random = new Random(Long.parseLong(value.trim()));
                    default -> throw new IllegalArgumentException("Unknown option " + args[i]);
                }
            }
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            System.err.println("Usage: java Chatbot [--names A,B,C] [--ages 20,30] [--seed N]");
            System.exit(2);
        }

        Chatbot bot = new Chatbot(names, ages, random);

        System.out.println(bot.greeting());
        System.out.println("(type 'bye' to leave)");

        try (Scanner in = new Scanner(System.in)) {
            while (true) {
                System.out.print("> ");
                if (!in.hasNextLine()) {
                    break;
                }
                String response = bot.reply(in.nextLine());
                if (response == null) {
                    System.out.println("Goodbye!");
                    break;
                }
                System.out.println(response);
            }
        }
    }

    private static List<String> parseNames(String csv) {
        List<String> names = Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(n -> !n.isEmpty())
                .toList();
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
                    .toList();
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("--ages must be whole numbers, e.g. 20,35,70");
        }
        if (ages.isEmpty() || ages.stream().anyMatch(a -> a < 0)) {
            throw new IllegalArgumentException("--ages needs one or more non-negative numbers");
        }
        return ages;
    }
}
