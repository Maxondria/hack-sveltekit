export function load({ locals, cookies }) {
  //if we are authed, we could return nothing, or better still return a user here
  // user is being added to the locals object in the handle function hook
  // which runs before the load function

  if (cookies.get('loggedin')) {
    return {
      //@ts-ignore
      user: locals.user
    };
  }
}
