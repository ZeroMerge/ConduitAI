import { interpretNaturalLanguage } from '../src/interpreter';

/**
 * Example usage of the interpretNaturalLanguage function
 */
async function main() {
  console.log('=== ConduitAI Natural Language Interpreter Examples ===\n');

  // Example 1: Email to Slack workflow
  const example1 = 'when I receive an email, send a notification to Slack';
  console.log(`Input: "${example1}"`);
  const workflow1 = await interpretNaturalLanguage(example1);
  console.log('Output:', JSON.stringify(workflow1, null, 2));
  console.log('\n---\n');

  // Example 2: Calendar reminder
  const example2 = 'if a calendar event is approaching, remind me';
  console.log(`Input: "${example2}"`);
  const workflow2 = await interpretNaturalLanguage(example2);
  console.log('Output:', JSON.stringify(workflow2, null, 2));
  console.log('\n---\n');

  // Example 3: Form to spreadsheet
  const example3 = 'after a form is submitted, add the response to a spreadsheet';
  console.log(`Input: "${example3}"`);
  const workflow3 = await interpretNaturalLanguage(example3);
  console.log('Output:', JSON.stringify(workflow3, null, 2));
  console.log('\n---\n');

  // Example 4: Task management
  const example4 = 'when something important happens, create a task in Trello';
  console.log(`Input: "${example4}"`);
  const workflow4 = await interpretNaturalLanguage(example4);
  console.log('Output:', JSON.stringify(workflow4, null, 2));
  console.log('\n---\n');

  // Example 5: Generic workflow
  const example5 = 'whenever X happens, do Y';
  console.log(`Input: "${example5}"`);
  const workflow5 = await interpretNaturalLanguage(example5);
  console.log('Output:', JSON.stringify(workflow5, null, 2));
}

// Run examples
main().catch(console.error);
