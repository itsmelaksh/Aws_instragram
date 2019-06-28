// eslint-disable
// this is an auto generated file. This will be overwritten

export const newFriend = `subscription NewFriend {
  newFriend {
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
export const newPost = `subscription NewPost {
  newPost {
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
export const newTags = `subscription NewTags {
  newTags {
    postId
    tags
  }
}
`;
export const removeFriend = `subscription RemoveFriend {
  removeFriend {
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
