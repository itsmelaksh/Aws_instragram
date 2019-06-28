import gql from "graphql-tag";

export default gql`
query SearchUsers ($search: String){
    searchUsers(search: $search) {
        items {
            username
            followed
            profilePic {
                bucket
                region
                key
            }
        }
    } 
}`