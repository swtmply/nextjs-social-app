import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        username
      }
      token
    }
  }
`;

export default function Home() {
  const [login] = useMutation(LOGIN, {
    update: (_, { data }) => {
      console.log(data);
    },
  });

  return (
    <div>
      <button
        onClick={() =>
          login({
            variables: { username: "allenwhun", password: "123456" },
          })
        }
      >
        Login
      </button>
    </div>
  );
}

// export async function getServerSideProps(ctx) {
//   const cookies = parseCookies(ctx);

//   setCookie(ctx, "fromserver", "value", {
//     httpOnly: true,
//     path: "/",
//   });

//   return { props: { cookies } };
// }
