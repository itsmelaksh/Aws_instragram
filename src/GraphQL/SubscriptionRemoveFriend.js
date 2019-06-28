import  gql from "graphql-tag";

export default gql`
subscription {
    removeFriend {
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