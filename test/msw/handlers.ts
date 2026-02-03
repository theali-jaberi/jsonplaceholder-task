import { http, HttpResponse } from "msw";

import type { Post, Todo, User } from "@/types";

export const fixtures: {
  users: User[];
  posts: Post[];
  todos: Todo[];
} = {
  users: [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: { lat: "-37.3159", lng: "81.1496" },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: { lat: "-43.9509", lng: "-34.4618" },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ],
  posts: [
    {
      userId: "1",
      id: 1,
      title: "sunt aut facere repellat provident occaecati",
      body: "quia et suscipit suscipit recusandae consequuntur",
    },
    {
      userId: "1",
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae sequi sint nihil",
    },
    {
      userId: "1",
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa",
      body: "et iusto sed quo iure voluptatem occaecati",
    },
    {
      userId: "2",
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci",
    },
    {
      userId: "2",
      id: 5,
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed",
    },
    {
      userId: "2",
      id: 6,
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident",
    },
    {
      userId: "1",
      id: 7,
      title: "magnam facilis autem",
      body: "dolore placeat quibusdam ea quo vitae",
    },
  ],
  todos: [
    { userId: 1, id: 1, title: "delectus aut autem", completed: false },
    { userId: 1, id: 2, title: "quis ut nam facilis et officia qui", completed: true },
    { userId: 2, id: 3, title: "fugiat veniam minus", completed: false },
    { userId: 2, id: 4, title: "et porro tempora", completed: true },
    { userId: 1, id: 5, title: "laboriosam mollitia et enim quasi", completed: false },
  ],
};

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json(fixtures.users);
  }),

  http.get("https://jsonplaceholder.typicode.com/users/:id", ({ params }) => {
    const id = Number(params.id);
    const user = fixtures.users.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  http.get("https://jsonplaceholder.typicode.com/posts", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const posts = userId
      ? fixtures.posts.filter((p) => String(p.userId) === userId)
      : fixtures.posts;

    return HttpResponse.json(posts);
  }),

  http.get("https://jsonplaceholder.typicode.com/posts/:id", ({ params }) => {
    const id = Number(params.id);
    const post = fixtures.posts.find((p) => p.id === id);

    if (!post) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  http.get("https://jsonplaceholder.typicode.com/todos", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const todos = userId
      ? fixtures.todos.filter((t) => String(t.userId) === userId)
      : fixtures.todos;

    return HttpResponse.json(todos);
  }),
];


