import { github_logo } from "../../images"
const clientId = "7a5b9eeac74f6ad14299"

function GithubAuth() {

  const loginGithub = () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + clientId + "&scope=user")
  }
  return (
    <button onClick={loginGithub} className="border p-4 w-16 lg:p-8 lg:w-auto mx-auto rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer">
      <img src={github_logo} />
    </button>
  )
}

export default GithubAuth