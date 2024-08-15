const { WorkflowHost, StepBody, ExecutionResult } = require("workflow-es");

class HelloWorld extends StepBody {
  run(context) {
    console.log("Hello World");
    return Promise.resolve(ExecutionResult.next());
  }
}

class GoodbyeWorld extends StepBody {
  run(context) {
    console.log("Goodbye World");
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
    builder.startWith(HelloWorld).then(GoodbyeWorld);
    console.log("Workflow built.");
  }
}

// Register the workflow correctly
const host = new WorkflowHost();
let workflow = new HelloWorld_Workflow("hello-world-new", 2);
host.registerWorkflow(workflow); // Ensure instance is passed
host.start();

host
  .startWorkflow(workflow.id, workflow.version)
  .then((id) => console.log("Started workflow: " + id));
