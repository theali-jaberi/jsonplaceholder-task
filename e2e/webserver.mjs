import http from "node:http";
import { spawn } from "node:child_process";
import process from "node:process";

const API_PORT = Number(process.env.E2E_API_PORT ?? 4010);
const APP_PORT = Number(process.env.E2E_APP_PORT ?? 3000);

const users = [
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
];

const posts = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati",
    body: "quia et suscipit suscipit recusandae consequuntur",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa",
    body: "et iusto sed quo iure voluptatem occaecati",
  },
  {
    userId: 2,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci",
  },
  {
    userId: 2,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed",
  },
  {
    userId: 2,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae",
  },
];

const todos = [
  { userId: 1, id: 1, title: "delectus aut autem", completed: false },
  { userId: 1, id: 2, title: "quis ut nam facilis et officia qui", completed: true },
  { userId: 2, id: 3, title: "fugiat veniam minus", completed: false },
  { userId: 2, id: 4, title: "et porro tempora", completed: true },
  { userId: 1, id: 5, title: "laboriosam mollitia et enim quasi", completed: false },
];

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("access-control-allow-origin", "*");
  res.end(JSON.stringify(data));
}

function notFound(res) {
  sendJson(res, 404, { message: "Not Found" });
}

const apiServer = http.createServer((req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

    if (req.method === "GET" && url.pathname === "/users") {
      return sendJson(res, 200, users);
    }

    if (req.method === "GET" && url.pathname.startsWith("/users/")) {
      const id = Number(url.pathname.split("/")[2]);
      const user = users.find((u) => u.id === id);
      return user ? sendJson(res, 200, user) : notFound(res);
    }

    if (req.method === "GET" && url.pathname === "/posts") {
      const userId = url.searchParams.get("userId");
      const data = userId
        ? posts.filter((p) => String(p.userId) === String(userId))
        : posts;
      return sendJson(res, 200, data);
    }

    if (req.method === "GET" && url.pathname.startsWith("/posts/")) {
      const id = Number(url.pathname.split("/")[2]);
      const post = posts.find((p) => p.id === id);
      return post ? sendJson(res, 200, post) : notFound(res);
    }

    if (req.method === "GET" && url.pathname === "/todos") {
      const userId = url.searchParams.get("userId");
      const data = userId
        ? todos.filter((t) => String(t.userId) === String(userId))
        : todos;
      return sendJson(res, 200, data);
    }

    return notFound(res);
  } catch (e) {
    sendJson(res, 500, { message: String(e) });
  }
});

apiServer.listen(API_PORT, "127.0.0.1", () => {
  console.log(`[e2e] mock api listening on http://127.0.0.1:${API_PORT}`);
});

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const nextProc = spawn(npmCmd, ["run", "dev", "--", "-p", String(APP_PORT)], {
  env: {
    ...process.env,
    NEXT_PUBLIC_API_BASE_URL: `http://127.0.0.1:${API_PORT}`,
  },
  stdio: "inherit",
});

function shutdown(signal) {
  console.log(`[e2e] shutting down (${signal})`);
  apiServer.close(() => process.exit(0));
  nextProc.kill("SIGTERM");
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

nextProc.on("exit", (code) => {
  console.log(`[e2e] next dev exited with code ${code ?? "unknown"}`);
  apiServer.close(() => process.exit(code ?? 1));
});


