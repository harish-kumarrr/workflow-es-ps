const { WorkflowHost, StepBody, ExecutionResult } = require("workflow-es");

class HelloWorld extends StepBody {
  run(context) {
    console.log("Hello World",this.name);
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
  constructor(id, version, name) {
    this.name = name;
    this.id = id;
    this.version = version;
    console.log(
      "Creating workflow with ID: " + id + " and version: " + version
    );
  }

  build(builder) {
    console.log("Building workflow...");
    builder.startWith(HelloWorld).then(GoodbyeWorld);
    console.log("Workflow built.");
  }
}

// Register the workflow correctly
// const host = new WorkflowHost();
// let workflow = new HelloWorld_Workflow("hello-world-new", 2);
// host.registerWorkflow(workflow); // Ensure instance is passed
// host.start();

// host
//   .startWorkflow(workflow.id, workflow.version)
//   .then((id) => console.log("Started workflow: " + id));

for (let i = 0; i < 5; i++) {
  const host = new WorkflowHost();
  let workflow = new HelloWorld_Workflow("hello-world-new", i, `name-${i}`);
  // Register the workflow correctly
  host.registerWorkflow(workflow); // Ensure instance is passed
  host.start();
  host
    .startWorkflow(workflow.id, workflow.version)
    .then((id) => console.log("Started workflow: " + id));
}
