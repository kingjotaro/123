## Design decisions behind the challenge 

In this challenge, I had 10 days plus an extra 2 days to finish it. Initially, my goal was to gauge the task's difficulty. Understanding the codebase and how its components worked was my first challenge, taking about 3 days. During this time, I carefully examined the code, added console logs for debugging, and familiarized myself with its structure. Additionally, I opted for Turbo Repo for its convenience in setting up both frontend and backend components.

After spending 3 days understanding the codebase, I started tackling smaller tasks. My first major task was creating an input label to add data to the nodes. However, after completing this task, I faced another obstacle: improving the codebase's readability. To address this, I focused on breaking down the codebase into smaller components to enhance its clarity and maintainability.

Once I finished this phase, I figured out how to retrieve data from nodes and edges and began working on uploading this data. I added a basic button to the frontend and set up a simple backend and database to manage the data.

Moreover, I chose to build the backend using Koa and MongoDB because I was familiar with both and they were easily accessible. This decision was influenced by the tight deadline I had to meet.

However, I encountered another challenge when I needed to recreate the nodes with the data I had gathered. It took some time to understand how to actually recreate the nodes by delving deep into the codebase again. After a day or two, I finally had a breakthrough and understood how everything worked. This was a significant moment for me as I finally had all the pieces I needed to complete the challenge.

But I faced another significant obstacle. My backend was written in vanilla JavaScript, and the Jest library didn't handle things well with vanilla JS and modern JavaScript. At this point, I made a mistake by not swiftly transitioning to TypeScript and persisting with vanilla JS. This wasted almost a day without any results. The following day, before proceeding further, I switched the backend to TypeScript, and Jest worked well thereafter.

On the last day before earning an additional 2-day extension, I began working on basic tests and error handlers. At the end of the day, David sent me an email inquiring about the progress of the challenge and whether I needed more time to finish. I shared my progress and requested an additional two days to complete it.

From the outset, my choices were geared towards creating the most basic functional challenge. Primarily, this was because the complexity of the challenge could escalate quickly. If I had a month to work on it, I would have spent the entire month creating features to enhance it. I believe that good software never truly reaches an end, and there is always room for improvement. However, with the deadline looming, I had to keep things simple.

In the final two days, I refined the tests to better match the functionality of each endpoint and worked on the frontend to display potential errors. I also addressed all major bugs that I encountered, which were causing the app to malfunction.

Still, there are many things to improve, but I believe one of the main reasons for having time to solve the challenge is to understand how quickly the participant can grasp and create things within the codebase.

With that in mind, I finished this challenge.