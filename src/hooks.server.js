/*
The event object passed into handle is the same object — an instance of a RequestEvent 
— that is passed into API routes in +server.js files, 
form actions in +page.server.js files, and load functions in +page.server.js and +layout.server.js functions
*/

export async function handle({ event, resolve }) {
  // if user is loggedin, let's attach dummy user data to the event.locals
  if (event.cookies.get('loggedin')) {
    //@ts-ignore
    event.locals.user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    };
  }

  return await resolve(event);
}
