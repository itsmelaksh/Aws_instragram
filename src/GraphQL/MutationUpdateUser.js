import gql from 'graphql-tag';

export default gql`
mutation UpdateUser(
    $name: String,
    $bio: String,
    $email: String,
    $phoneNumber: String,
    $gender: String,
    $country: String,
    $profilePic: S3ObjectInput
) {
    updateUser(
        name:$name,
		bio:$bio,
		email:$email,
		phoneNumber:$phoneNumber,
		gender:$gender,
        country:$country,
        profilePic:$profilePic
    ) {
        username
        name
        bio
        email
        phoneNumber
        gender
        country,
        profilePic {
            bucket
            region
            key
        }
    }
}`