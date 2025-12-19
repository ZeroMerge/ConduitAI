# AI Processing API Route

This API route handles natural language input and interprets it into executable workflows.

## Endpoint

`POST /api/ai`

## Request Body

```json
{
  "message": "Send a Slack notification when a new user signs up",
  "context": {}
}
```

### Parameters

- `message` (string, required): Natural language description of the desired workflow
- `context` (object, optional): Additional context for the AI processing

## Response

### Success Response (200)

```json
{
  "success": true,
  "workflow": {
    "name": "Generated Workflow",
    "steps": [
      {
        "id": "step-1",
        "type": "slack-notification",
        "config": {
          "channel": "#general",
          "message": "Workflow triggered"
        }
      }
    ],
    "trigger": "manual"
  },
  "message": "Here's the workflow I built for you",
  "suggestions": [
    "Try adding a Slack notification",
    "Consider adding a delay"
  ]
}
```

### Error Response (400)

```json
{
  "success": false,
  "error": "Message is required and must be a string"
}
```

### Error Response (500)

```json
{
  "success": false,
  "error": "Failed to process request"
}
```

## Supported Workflow Types (MVP)

The current MVP implementation uses simple pattern matching to detect:

- **Slack notifications**: Keywords "slack" or "notify"
- **Email**: Keyword "email"
- **Delay**: Keywords "delay" or "wait"

Multiple workflow types can be combined in a single message.

## Future Enhancements

In production, this route will integrate with the OpenAI API to provide more sophisticated natural language understanding and workflow generation.

## Testing

Run the test suite:

```bash
# Start the development server
npm run dev

# In another terminal, run the tests
node tests/test-ai-api.js
```
