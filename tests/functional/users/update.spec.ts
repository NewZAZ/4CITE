import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Users - Update', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('user can view edit page for their own profile', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get(`/users/${user.id}/edit`).withInertia().loginAs(user)

    response.assertStatus(200)
    response.assertInertiaComponent('users/edit')
  })

  test('user can update their own profile', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.put(`/users/${user.id}`).withCsrfToken().redirects(0).loginAs(user).form({
      pseudo: 'newpseudo',
    })

    response.assertStatus(302)

    await user.refresh()
    assert.equal(user.pseudo, 'newpseudo')
  })

  test('user cannot update another users profile', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()

    const response = await client.put(`/users/${user2.id}`).withCsrfToken().loginAs(user1).form({
      pseudo: 'hacked',
    })

    response.assertStatus(403)
  })

  test('admin can update any users profile', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()

    const response = await client.put(`/users/${user.id}`).withCsrfToken().redirects(0).loginAs(admin).form({
      pseudo: 'updatedByAdmin',
    })

    response.assertStatus(302)

    await user.refresh()
    assert.equal(user.pseudo, 'updatedByAdmin')
  })

  test('cannot update with already taken email', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()

    const response = await client.put(`/users/${user1.id}`).withCsrfToken().redirects(0).loginAs(user1).form({
      email: user2.email,
    })

    response.assertStatus(302)
  })

  test('returns 404 for non-existent user', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.put('/users/999').withCsrfToken().loginAs(admin).form({
      pseudo: 'test',
    })

    response.assertStatus(404)
  })

  test('rejects update with invalid email format', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.put(`/users/${user.id}`).withCsrfToken().redirects(0).loginAs(user).form({
      email: 'notvalid',
    })

    response.assertStatus(302)
  })

  test('can update only password without changing other fields', async ({ client, assert }) => {
    const user = await UserFactory.merge({
      pseudo: 'OriginalPseudo',
      email: 'original@test.com',
    }).create()

    const response = await client.put(`/users/${user.id}`).withCsrfToken().redirects(0).loginAs(user).form({
      password: 'NewPassword@123',
    })

    response.assertStatus(302)

    await user.refresh()
    assert.equal(user.pseudo, 'OriginalPseudo')
    assert.equal(user.email, 'original@test.com')
  })
})
