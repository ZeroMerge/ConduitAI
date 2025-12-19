/**
 * Simple test script to verify the AI API route
 * Run with: node tests/test-ai-api.js
 */

async function testAIAPI() {
  console.log('Starting AI API tests...\n');
  
  const baseUrl = 'http://localhost:3000';
  const endpoint = '/api/ai';
  
  const tests = [
    {
      name: 'Test 1: Slack notification workflow',
      payload: {
        message: 'Send a Slack notification when a new user signs up',
        context: {},
      },
      expected: {
        success: true,
        hasWorkflow: true,
        hasSteps: true,
      },
    },
    {
      name: 'Test 2: Email workflow',
      payload: {
        message: 'Send an email to the team',
        context: {},
      },
      expected: {
        success: true,
        hasWorkflow: true,
        hasSteps: true,
      },
    },
    {
      name: 'Test 3: Delay workflow',
      payload: {
        message: 'Wait for 5 minutes and then continue',
        context: {},
      },
      expected: {
        success: true,
        hasWorkflow: true,
        hasSteps: true,
      },
    },
    {
      name: 'Test 4: Invalid message (missing)',
      payload: {
        context: {},
      },
      expected: {
        success: false,
        error: true,
      },
    },
    {
      name: 'Test 5: Complex workflow',
      payload: {
        message: 'Send a Slack notification, wait for 5 minutes, then send an email',
        context: {},
      },
      expected: {
        success: true,
        hasWorkflow: true,
        hasSteps: true,
        minSteps: 3,
      },
    },
  ];
  
  for (const test of tests) {
    try {
      console.log(`Running: ${test.name}`);
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test.payload),
      });
      
      const data = await response.json();
      
      // Verify expectations
      let passed = true;
      const failures = [];
      
      if (test.expected.success !== undefined && data.success !== test.expected.success) {
        passed = false;
        failures.push(`Expected success: ${test.expected.success}, got: ${data.success}`);
      }
      
      if (test.expected.hasWorkflow && !data.workflow) {
        passed = false;
        failures.push('Expected workflow to be present');
      }
      
      if (test.expected.hasSteps && (!data.workflow?.steps || data.workflow.steps.length === 0)) {
        passed = false;
        failures.push('Expected workflow to have steps');
      }
      
      if (test.expected.minSteps && data.workflow?.steps?.length < test.expected.minSteps) {
        passed = false;
        failures.push(`Expected at least ${test.expected.minSteps} steps, got ${data.workflow.steps.length}`);
      }
      
      if (test.expected.error && !data.error) {
        passed = false;
        failures.push('Expected error to be present');
      }
      
      if (passed) {
        console.log('✅ PASSED');
        console.log('Response:', JSON.stringify(data, null, 2));
      } else {
        console.log('❌ FAILED');
        failures.forEach(f => console.log(`  - ${f}`));
        console.log('Response:', JSON.stringify(data, null, 2));
      }
      
      console.log('\n');
      
    } catch (error) {
      console.log('❌ ERROR:', error.message);
      console.log('\n');
    }
  }
  
  console.log('Tests completed!');
}

// Run tests
testAIAPI().catch(console.error);
