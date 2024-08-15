const { WorkflowHost, StepBody, ExecutionResult } = require("workflow-es");
const workflow_es = require("workflow-es");

class HelloWorld extends StepBody {
  run(context) {
    console.log("Hello World",context);
    if (!context.persistenceData) {
      // Initial run, put the workflow to sleep for 1 hour and set persistenceData to true
      console.log("Going to sleep...");
      return  Promise.resolve(ExecutionResult.sleep(new Date(Date.now() + 10000), true));
    } else {
      // Subsequent run, proceed to the next step
      console.log("Waking up...");
      return Promise.resolve(ExecutionResult.next());
    }
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
    builder
      .startWith(HelloWorld)
      .then(GoodbyeWorld)
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
  .startWorkflow(workflow.id, workflow.version)
  .then((id) => console.log("Started workflow: " + id));
