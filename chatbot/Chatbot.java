import java.util.List;
import java.util.Random;
import java.util.Scanner;

/**
 * A small console chatbot. On startup it picks a name and an age at random
 * from fixed pools and uses them as its identity for the rest of the chat.
 *
 * Run:  javac Chatbot.java && java Chatbot
 * Pass a number as the first argument to seed the random choice (repeatable runs).
 */
public class Chatbot {

    private static final List<String> NAMES =
            List.of("Ada", "Milo", "Zara", "Theo", "Luna", "Felix", "Nova", "Otis");

    private static final List<Integer> AGES =
            List.of(19, 24, 27, 31, 38, 45, 52, 67);

    private final String name;
    private final int age;
    private final Random random;

    public Chatbot(Random random) {
        this.random = random;
        this.name = NAMES.get(random.nextInt(NAMES.size()));
        this.age = AGES.get(random.nextInt(AGES.size()));
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
        Random random = args.length > 0 ? new Random(Long.parseLong(args[0])) : new Random();
        Chatbot bot = new Chatbot(random);

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
}
