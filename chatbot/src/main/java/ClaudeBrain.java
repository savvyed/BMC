import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.errors.AnthropicException;
import com.anthropic.errors.AnthropicServiceException;
import com.anthropic.errors.RateLimitException;
import com.anthropic.errors.UnauthorizedException;
import com.anthropic.models.messages.Message;
import com.anthropic.models.messages.MessageCreateParams;
import com.anthropic.models.messages.OutputConfig;
import com.anthropic.models.messages.StopReason;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Sends the conversation to Claude through the official Anthropic Java SDK.
 *
 * The SDK reads your key from the ANTHROPIC_API_KEY environment variable.
 * The key is never written in code, so it can't end up in git by accident.
 */
public class ClaudeBrain {

    public static final String DEFAULT_MODEL = "claude-opus-5-5";

    /** A failure the chat loop can show to the user and recover from. */
    public static class BrainException extends RuntimeException {
        /** True when retrying can't help (for example a rejected API key). */
        public final boolean fatal;

        public BrainException(String message, boolean fatal) {
            super(message);
            this.fatal = fatal;
        }
    }

    private static final class Turn {
        final boolean fromUser;
        final String text;

        Turn(boolean fromUser, String text) {
            this.fromUser = fromUser;
            this.text = text;
        }
    }

    private final AnthropicClient client;
    private final String model;
    private final String systemPrompt;
    private final List<Turn> history = new ArrayList<Turn>();

    /** Throws BrainException if no credentials can be found. */
    public ClaudeBrain(String model, String systemPrompt) {
        this.model = model;
        this.systemPrompt = systemPrompt;
        if (isBlank(System.getenv("ANTHROPIC_API_KEY")) && isBlank(System.getenv("ANTHROPIC_AUTH_TOKEN"))) {
            throw new BrainException("No API key found. Set the ANTHROPIC_API_KEY environment variable.", true);
        }
        this.client = AnthropicOkHttpClient.fromEnv();
    }

    /** Sends one user message (plus the earlier conversation) and returns Claude's reply. */
    public String reply(String userText) {
        MessageCreateParams.Builder request = MessageCreateParams.builder()
                .model(model)
                .maxTokens(16000L)
                .system(systemPrompt)
                // Chat doesn't need deep reasoning; low effort keeps replies fast and cheap.
                .outputConfig(OutputConfig.builder().effort(OutputConfig.Effort.LOW).build());
        for (Turn turn : history) {
            if (turn.fromUser) {
                request.addUserMessage(turn.text);
            } else {
                request.addAssistantMessage(turn.text);
            }
        }
        request.addUserMessage(userText);

        Message response;
        try {
            response = client.messages().create(request.build());
        } catch (UnauthorizedException e) {
            throw new BrainException("The API key was rejected. Check ANTHROPIC_API_KEY.", true);
        } catch (RateLimitException e) {
            throw new BrainException("Rate limited. Wait a moment and try again.", false);
        } catch (AnthropicServiceException e) {
            throw new BrainException("API error (HTTP " + e.statusCode() + ").", false);
        } catch (AnthropicException e) {
            throw new BrainException("Could not reach the API: " + e.getMessage(), false);
        }

        String text = response.content().stream()
                .flatMap(block -> block.text().stream())
                .map(t -> t.text())
                .collect(Collectors.joining());

        if (response.stopReason().map(r -> r.equals(StopReason.REFUSAL)).orElse(false)) {
            throw new BrainException("Claude declined to answer that.", false);
        }
        if (text.isEmpty()) {
            throw new BrainException("Claude returned an empty reply.", false);
        }

        // Only remember turns that succeeded, so a failed call can't corrupt the history.
        history.add(new Turn(true, userText));
        history.add(new Turn(false, text));
        return text;
    }

    private static boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }
}
