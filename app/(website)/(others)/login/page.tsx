import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-240px)] items-center justify-center">
      <form className="w-full max-w-sm p-8 bg-gray-50 rounded shadow-md space-y-6" >
        <h1 className="text-2xl font-bold text-center mb-4">Log in</h1>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-jujube"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-jujube"
          />
        </div>
        <button
          formAction={login}
          className="w-full py-2 px-4 bg-jujube text-white font-semibold rounded hover:bg-lightpink hover:text-black transition"
        >
          Log in
        </button>
      </form>
    </div>
  )
}