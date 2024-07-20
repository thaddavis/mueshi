// import { auth } from "@/auth";

// export default auth((req) => {
//   console.log("middleware req", req);

//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
