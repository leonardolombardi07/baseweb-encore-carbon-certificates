interface Process {
  id: string;
  name: string;
  description: string;
}

const processes: Process[] = [
  {
    id: "1",
    name: "Navio Skandi Saigon",
    description: "Certificação da emissão de carbono em rota do ano 2023",
  },
  {
    id: "2",
    name: "Viagem Corporativa Madrid",
    description: "Cálculo da emissão de carbono de funcionários",
  },
];

export { processes };
export type { Process };
