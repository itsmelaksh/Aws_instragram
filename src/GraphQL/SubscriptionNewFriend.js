import  gql from "graphql-tag";

export default gql`
subscription {
    newFriend {
        userInfo {
            username
            profilePic {
                bucket
                region
                key
            }
            followed
        }
        friendInfo {
            username
            profilePic {
                bucket
                region
                key
            }
            followed
        }
        createdAt
    }
}`;