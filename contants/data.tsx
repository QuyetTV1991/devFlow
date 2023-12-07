export type User = {
  _id: number;
  username: string;
  imgUrl: string;
};

export type Question = {
  _id: number;
  title: string;
  tags: {
    _id: number;
    name: string;
  }[];
  creator: User;
  createdAt: Date;
  likes: number;
  answers: number;
  views: number;
};

export const dummyQuestionList: Question[] = [
  {
    _id: 1,
    title:
      "Best practices for data fetching in a Next.js application with SSR?",
    tags: [
      { _id: 1, name: "Next.js" },
      { _id: 2, name: "SSR" },
      { _id: 3, name: "Data Fetching" },
    ],
    creator: {
      _id: 20,
      username: "JohnDoe",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 15,
    answers: 3,
    views: 150,
  },
  {
    _id: 2,
    title: "Styling tips for a modern and responsive website design?",
    tags: [
      { _id: 1, name: "CSS" },
      { _id: 2, name: "Responsive Design" },
      { _id: 3, name: "Web Development" },
    ],
    creator: {
      _id: 20,
      username: "JaneSmith",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 10,
    answers: 5,
    views: 120,
  },
  {
    _id: 3,
    title: "How to optimize images for web performance?",
    tags: [
      { _id: 1, name: "Web Performance" },
      { _id: 2, name: "Image Optimization" },
      { _id: 3, name: "SEO" },
    ],
    creator: {
      _id: 20,
      username: "BobCoder",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 20,
    answers: 7,
    views: 180,
  },
  {
    _id: 4,
    title:
      "Best practices for data fetching in a Next.js application with SSR?",
    tags: [
      { _id: 1, name: "Next.js" },
      { _id: 2, name: "SSR" },
      { _id: 3, name: "Data Fetching" },
    ],
    creator: {
      _id: 20,
      username: "JohnDoe",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 15,
    answers: 3,
    views: 15570,
  },
  {
    _id: 5,
    title: "Styling tips for a modern and responsive website design?",
    tags: [
      { _id: 1, name: "CSS" },
      { _id: 2, name: "Responsive Design" },
      { _id: 3, name: "Web Development" },
    ],
    creator: {
      _id: 20,
      username: "JaneSmith",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 1,
    answers: 1,
    views: 1,
  },
  {
    _id: 6,
    title: "How to optimize images for web performance?",
    tags: [
      { _id: 1, name: "Web Performance" },
      { _id: 2, name: "Image Optimization" },
      { _id: 3, name: "SEO" },
    ],
    creator: {
      _id: 20,
      username: "BobCoder",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 20,
    answers: 7,
    views: 180000000,
  },
  {
    _id: 7,
    title: "Understanding the fundamentals of TypeScript",
    tags: [
      { _id: 1, name: "TypeScript" },
      { _id: 2, name: "JavaScript" },
      { _id: 3, name: "Programming" },
    ],
    creator: {
      _id: 20,
      username: "CodeMaster",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 25,
    answers: 10,
    views: 200,
  },
  {
    _id: 8,
    title: "Tips for effective bug tracking in software development",
    tags: [
      { _id: 1, name: "Bug Tracking" },
      { _id: 2, name: "Software Development" },
      { _id: 3, name: "Quality Assurance" },
    ],
    creator: {
      _id: 20,
      username: "TesterExpert",
      imgUrl: "/assets/images/user-profile.svg",
    },
    createdAt: new Date("2023-01-01T12:00:00"),
    likes: 1800,
    answers: 1,
    views: 16000,
  },
];
