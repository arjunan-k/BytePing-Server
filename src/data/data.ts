const Chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Smith",
        email: "john.smith@example.com",
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd5",
    chatName: "John Smith",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Alice Johnson",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "James Anderson",
        email: "james.anderson@example.com",
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd3",
    chatName: "James Anderson",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Smith",
        email: "john.smith@example.com",
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Oliver Davis",
        email: "oliver.davis@example.com",
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd9",
    chatName: "Oliver Davis",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Smith",
        email: "john.smith@example.com",
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
    ],
    _id: "617a518c4081150016472c76",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
  },
];

export default Chats;
