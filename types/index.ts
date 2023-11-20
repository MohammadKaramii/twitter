export interface ArticleNews {
  articles: {
    title: string;
    source: {
      name: string;
    };
    url: string;
    urlToImage: string;
  };
  // Addther properties for an article if needed
}
export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };

  login: {
    username: string;
  };
}

export interface UserTypes {
  name: string;
  username: string;
  userImg: string;
  uid: string;
  // Add more properties as needed
}

export interface CommentType {
  userImg: string;
  name: string;
  username: string;
  timestamp: {
    toDate(): Date;
  };
  comment: string;
  userId: string;
}

export type PostType = {
  userImg: string;
  name: string;
  username: string;
  timestamp: {
    toDate: () => Date;
  };
  text: string;
};

export interface ArticleType {
  articles: [
    {
      title: string;
      source: {
        name: string;
      };
      url: string;
      urlToImage: string;
    }
  ];
  // Add other properties for an article if needed
}
export interface UserType {
  results: User[];
}
