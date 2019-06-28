// eslint-disable
// this is an auto generated file. This will be overwritten

export const allPosts = `query AllPosts($limit: Int, $nextToken: String) {
  allPosts(limit: $limit, nextToken: $nextToken) {
    items {
      caption
      createdAt
      file {
        bucket
        key
        region
      }
      id
      liked
      likes
      profilePic {
        bucket
        key
        region
      }
      tags
      user {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      username
    }
    nextToken
  }
}
`;
export const getFeeds = `query GetFeeds($limit: Int, $nextToken: String) {
  getFeeds(limit: $limit, nextToken: $nextToken) {
    followingIds
    posts {
      items {
        caption
        createdAt
        id
        liked
        likes
        tags
        username
      }
      nextToken
    }
    username
  }
}
`;
export const getFollowers = `query GetFollowers {
  getFollowers {
    items {
      createdAt
      friendInfo {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      friendUsername
      userInfo {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      username
    }
    nextToken
  }
}
`;
export const getFriend = `query GetFriend($username: String) {
  getFriend(username: $username) {
    createdAt
    friendInfo {
      bio
      country
      createdAt
      email
      followed
      followers {
        nextToken
      }
      followersCount
      following {
        nextToken
      }
      followingCount
      gender
      name
      phoneNumber
      posts {
        nextToken
      }
      postsCount
      profilePic {
        bucket
        key
        region
      }
      username
    }
    friendUsername
    userInfo {
      bio
      country
      createdAt
      email
      followed
      followers {
        nextToken
      }
      followersCount
      following {
        nextToken
      }
      followingCount
      gender
      name
      phoneNumber
      posts {
        nextToken
      }
      postsCount
      profilePic {
        bucket
        key
        region
      }
      username
    }
    username
  }
}
`;
export const getFriends = `query GetFriends {
  getFriends {
    items {
      createdAt
      friendInfo {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      friendUsername
      userInfo {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      username
    }
    nextToken
  }
}
`;
export const getGlobalStats = `query GetGlobalStats {
  getGlobalStats {
    followers_count
    friends_count
    posts {
      caption
      createdAt
      file {
        bucket
        key
        region
      }
      id
      liked
      likes
      profilePic {
        bucket
        key
        region
      }
      tags
      user {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      username
    }
    posts_count
    username
  }
}
`;
export const getLoggedUserInfo = `query GetLoggedUserInfo {
  getLoggedUserInfo {
    bio
    country
    createdAt
    email
    followed
    followers {
      items {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      nextToken
    }
    followersCount
    following {
      items {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      nextToken
    }
    followingCount
    gender
    name
    phoneNumber
    posts {
      items {
        caption
        createdAt
        id
        liked
        likes
        tags
        username
      }
      nextToken
    }
    postsCount
    profilePic {
      bucket
      key
      region
    }
    username
  }
}
`;
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    caption
    createdAt
    file {
      bucket
      key
      region
    }
    id
    liked
    likes
    profilePic {
      bucket
      key
      region
    }
    tags
    user {
      bio
      country
      createdAt
      email
      followed
      followers {
        nextToken
      }
      followersCount
      following {
        nextToken
      }
      followingCount
      gender
      name
      phoneNumber
      posts {
        nextToken
      }
      postsCount
      profilePic {
        bucket
        key
        region
      }
      username
    }
    username
  }
}
`;
export const getUser = `query GetUser($username: String!) {
  getUser(username: $username) {
    bio
    country
    createdAt
    email
    followed
    followers {
      items {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      nextToken
    }
    followersCount
    following {
      items {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      nextToken
    }
    followingCount
    gender
    name
    phoneNumber
    posts {
      items {
        caption
        createdAt
        id
        liked
        likes
        tags
        username
      }
      nextToken
    }
    postsCount
    profilePic {
      bucket
      key
      region
    }
    username
  }
}
`;
export const getUserPosts = `query GetUserPosts($limit: Int, $nextToken: String) {
  getUserPosts(limit: $limit, nextToken: $nextToken) {
    items {
      caption
      createdAt
      file {
        bucket
        key
        region
      }
      id
      liked
      likes
      profilePic {
        bucket
        key
        region
      }
      tags
      user {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      username
    }
    nextToken
  }
}
`;
export const getUserStats = `query GetUserStats {
  getUserStats {
    followers_count
    friends_count
    posts {
      caption
      createdAt
      file {
        bucket
        key
        region
      }
      id
      liked
      likes
      profilePic {
        bucket
        key
        region
      }
      tags
      user {
        bio
        country
        createdAt
        email
        followed
        followersCount
        followingCount
        gender
        name
        phoneNumber
        postsCount
        username
      }
      username
    }
    posts_count
    username
  }
}
`;
export const searchUsers = `query SearchUsers($search: String) {
  searchUsers(search: $search) {
    items {
      bio
      country
      createdAt
      email
      followed
      followers {
        nextToken
      }
      followersCount
      following {
        nextToken
      }
      followingCount
      gender
      name
      phoneNumber
      posts {
        nextToken
      }
      postsCount
      profilePic {
        bucket
        key
        region
      }
      username
    }
    nextToken
  }
}
`;
