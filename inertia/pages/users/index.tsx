import { Head, Link } from '@inertiajs/react'
import Layout from '~/components/layout'

interface User {
  id: number
  pseudo: string
  email: string
  role: string
  createdAt: string
}

interface Props {
  users: User[]
}

export default function UsersIndex({ users }: Props) {
  const roleColors: Record<string, string> = {
    admin: 'bg-brass/15 text-brass-dark',
    employee: 'bg-sky-badge text-sky-text',
    user: 'bg-cream text-warm-gray',
  }

  return (
    <Layout>
      <Head title="Users" />

      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-charcoal">Users</h1>
        <p className="text-warm-gray text-sm mt-1">Manage registered accounts</p>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden animate-fade-in animate-delay-1">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-cream">
                <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const initials = user.pseudo.slice(0, 2).toUpperCase()
                return (
                  <tr
                    key={user.id}
                    className="border-b border-cream/60 hover:bg-ivory/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brass/15 text-brass-dark flex items-center justify-center text-xs font-bold shrink-0">
                          {initials}
                        </div>
                        <span className="text-sm font-medium text-charcoal">{user.pseudo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-warm-gray">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs rounded-full font-semibold tracking-wide ${roleColors[user.role] || 'bg-cream text-warm-gray'}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-warm-gray">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/users/${user.id}`}
                        className="text-brass-dark hover:text-brass text-sm font-medium transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-sm text-warm-gray">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
