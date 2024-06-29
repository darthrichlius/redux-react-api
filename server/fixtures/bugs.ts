import { Bug } from "@/types/model";

const bugData: Bug[] = [
  {
    id: 1,
    description: "The button doesn't seem to be correctly aligned on my phone",
    userId: 1,
    resolved: true,
  },
  {
    id: 2,
    description:
      "When I want to change my password even when I enter the right format, it says it's incorrect",
    userId: 1,
  },
  {
    id: 3,
    description:
      "Could you add a new feature that could help me find my shoes?",
    userId: 2,
  },
  {
    id: 4,
    description:
      "After having played a video a second time, the sound turn off without any reason",
  },
];

export default bugData;
