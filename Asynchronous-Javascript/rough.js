(async () => {
  const scheduler = new TimeSlicedScheduler();
  const events = [];

  scheduler.schedule(async () => {
    events.push("task-1");
  });

  scheduler.schedule(async () => {
    events.push("task-2");
  });

  const runPromise = scheduler.run();
  console.log(runPromise);

  await new Promise((r) => setTimeout(r, 0));
  events.push("event-loop");

  await runPromise;
  console.log(events);

  // expect(events).toEqual(["task-1", "event-loop", "task-2"]);
})();
