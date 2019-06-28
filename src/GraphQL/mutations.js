// eslint-disable
// this is an auto generated file. This will be overwritten

export const addFriend = `mutation AddFriend($friendUsername: String!) {
  addFriend(friendUsername: $friendUsername) {
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
export const addLike = `mutation AddLike($postId: String!) {
  addLike(postId: $postId) {
    createdAt
    postId
    username
  }
}
`;
export const addPost = `mutation AddPost($caption: String, $file: S3ObjectInput) {
  addPost(caption: $caption, file: $file) {
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
export const addUser = `mutation AddUser($id: String) {
  addUser(id: $id) {
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
export const inferPostTags = `mutation InferPostTags(
  $S3Bucket: String
  $S3Filename: String
  $postId: String
) {
  inferPostTags(S3Bucket: $S3Bucket, S3Filename: $S3Filename, postId: $postId) {
    postId
    tags
  }
}
`;
export const removeFriend = `mutation RemoveFriend($friendUsername: String!) {
  removeFriend(friendUsername: $friendUsername) {
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
export const removeLike = `mutation RemoveLike($postId: String!) {
  removeLike(postId: $postId) {
    createdAt
    postId
    username
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $bio: String
  $country: String
  $email: String
  $gender: String
  $name: String
  $phoneNumber: String
  $profilePic: S3ObjectInput
) {
  updateUser(
    bio: $bio
    country: $country
    email: $email
    gender: $gender
    name: $name
    phoneNumber: $phoneNumber
    profilePic: $profilePic
  ) {
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
