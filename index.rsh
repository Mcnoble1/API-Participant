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

  const [ keepGoing, howManyBobs] = 
       parallelReduce([true, 0])
         .invariant(
          // loop invariant to know how many Bobs are attached
            howManyBobs < 5
         )
         .while(keepGoing)
         // API to attach Bobs to Alice
         .api(() => {
          return [ keepGoing, howManyBobs + 1]
         })
         .case(
          (() => ({
                  when: A.ready,
                  msg: B.ready
          })))
         .timeout(absoluteTime(deadline), () => {
            A.publish();
            return [false, howManyBobs];
         });

  commit()
  exit()
});





