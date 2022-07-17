# Full Stack Open 2022

Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

Reflections
part2:
During the updating of data on the server, there is still work to be done by me to be clear on what exactly needs to be replaced. 
Even I do a axios.put on the single item being changed (e.g. person's number) on the correct object position in the array, only the single 
item will be reflected at the new server's position.
Instead I should create a new array with the changed item and replace the entire object at that specific ID. This way, the item will be 
updated as well.