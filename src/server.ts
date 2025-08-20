import fastify from "fastify";

const teams = [
  {
    id: 1,
    name: "Mercedes-AMG Petronas",
    base: "Brackley, United Kingdom",
  },
  {
    id: 2,
    name: "Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
  },
  {
    id: 3,
    name: "Ferrari",
    base: "Maranello, Italy",
  },
  {
    id: 4,
    name: "McLaren",
    base: "Woking, United Kingdom",
  },
  {
    id: 5,
    name: "Aston Martin",
    base: "Silverstone, United Kingdom",
  },
];

const drivers = [
  {
    id: 1,
    name: "Lewis Hamilton",
    team: "Mercedes-AMG Petronas",
  },
  {
    id: 2,
    name: "George Russell",
    team: "Mercedes-AMG Petronas",
  },
  {
    id: 3,
    name: "Max Verstappen",
    team: "Red Bull Racing",
  },
  {
    id: 4,
    name: "Sergio Perez",
    team: "Red Bull Racing",
  },
  {
    id: 5,
    name: "Charles Leclerc",
    team: "Ferrari",
  },
  {
    id: 6,
    name: "Carlos Sainz",
    team: "Ferrari",
  },
  {
    id: 7,
    name: "Lando Norris",
    team: "McLaren",
  },
  {
    id: 8,
    name: "Oscar Piastri",
    team: "McLaren",
  },
  {
    id: 9,
    name: "Fernando Alonso",
    team: "Aston Martin",
  },
  {
    id: 10,
    name: "Lance Stroll",
    team: "Aston Martin",
  },
];

const server = fastify({ logger: true });

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);

  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);

  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver not found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});
