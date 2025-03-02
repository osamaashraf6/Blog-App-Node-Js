const globalService = {
  // baseUrl
  baseUrl: "https://blog-app-node-js-production.up.railway.app",
  //   Routes
  routes: {
    addresses: "/api/v1/addresses",
    archives: "/api/v1/archives",
    auth: "/api/v1/auth",
    comments: "/api/v1/comments",
    likes: "/api/v1/likes",
    posts: "/api/v1/posts",
    saveds: "/api/v1/saveds",
    users: "/api/v1/users",
  },
  //   domainImgs
  userImg: "https://blog-app-node-js-production.up.railway.app/users/",
  postImg: "https://blog-app-node-js-production.up.railway.app/posts/",
  //   ApiKey
  APiKey: "secret123",
};

export default globalService;
