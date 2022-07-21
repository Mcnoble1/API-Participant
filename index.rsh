'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('Alice', {
    // Specify Alice's interact interface here
    ready: Fun([], Null),
  });
  const B = API('Bob', {
    // Specify Bob's interact interface here
  });
  init();

  A.only(() => {
    interact.ready();
  })
  A.publish()
  commit()
  exit()
});





