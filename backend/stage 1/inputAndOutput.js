const { WorkflowHost, StepBody, ExecutionResult } = require("workflow-es");
const workflow_es = require("workflow-es");

class AddNumbers extends StepBody {
  run(context) {
    console.log("Hello World");
    // Perform addition and set the result
    this.result = this.number1 + this.number2;
    return Promise.resolve(ExecutionResult.next());
  }
}

class LogMessage extends StepBody {
  run(context) {
    console.log(this.message);
    return Promise.resolve(ExecutionResult.next());
  }
}

class HelloWorld_Workflow {
  constructor(id, version) {
    this.id = id;
    this.version = version;
  }

  build(builder) {
    console.log("Building workflow...");
    builder
      .startWith(AddNumbers)
      .input((step, data) => (step.number1 = data.value1)) // Set input for AddNumbers
      .input((step, data) => (step.number2 = data.value2)) // Set input for AddNumbers
      .output((step, data) => (data.value3 = step.result)) // Get output
      .then(LogMessage)
      .input((step, data) => step.message = "The result is " + data.value3) //
      .thenRun((context) => {
        console.log("lastone");
        return Promise.resolve(ExecutionResult.next());
      });
    console.log("Workflow built.");
  }
}

// Register the workflow correctly
const host = new WorkflowHost();
let workflow = new HelloWorld_Workflow("hello-world-new", 2);
host.registerWorkflow(workflow); // Ensure instance is passed
host.start();

host
  .startWorkflow(workflow.id, workflow.version,{ value1: 5, value2: 10 })
  .then((id) => console.log("Started workflow: " + id)).catch((err) => console.error("Error starting workflow:", err));
