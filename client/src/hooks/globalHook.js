const globalService = {
  // baseUrl
  baseUrl: "http://localhost:5000",
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
  userImg: "http://localhost:5000/users/",
  postImg: "http://localhost:5000/posts/",
  //   ApiKey
  APiKey: "secret123",
};

export default globalService;
