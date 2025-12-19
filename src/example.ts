/**
 * Example usage of the NLPInterpreter
 */

import { NLPInterpreter } from './nlp-interpreter';

const interpreter = new NLPInterpreter();

// Example 1: Email to Slack notification
console.log('Example 1: Email to Slack notification');
console.log('=====================================\n');

const workflow1 = interpreter.interpretWorkflow(
  'When I receive an email from client@example.com, send a Slack message to channel #sales'
);

console.log(JSON.stringify(workflow1, null, 2));
console.log('\n');

// Example 2: Payment to multiple actions
console.log('Example 2: Payment to Notion and Slack');
console.log('======================================\n');

const workflow2 = interpreter.interpretWorkflow(
  'When a payment is received via Stripe over $100, create a page in Notion database and notify the team in Slack'
);

console.log(JSON.stringify(workflow2, null, 2));
console.log('\n');

// Example 3: Meeting scheduled
console.log('Example 3: Meeting scheduled workflow');
console.log('====================================\n');

const workflow3 = interpreter.interpretWorkflow(
  'When a meeting is scheduled on Calendly, send an email confirmation and post to Slack channel #meetings'
);

console.log(JSON.stringify(workflow3, null, 2));
