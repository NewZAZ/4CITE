import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Users - List', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('admin can list all users', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    await UserFactory.createMany(3)

    const response = await client.get('/users').withInertia().loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaComponent('users/index')
  })

  test('employee can list all users', async ({ client }) => {
    const employee = await UserFactory.apply('employee').create()
    await UserFactory.createMany(3)

    const response = await client.get('/users').withInertia().loginAs(employee)

    response.assertStatus(200)
    response.assertInertiaComponent('users/index')
  })

  test('regular user cannot list users', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get('/users').loginAs(user)

    response.assertStatus(403)
  })

  test('unauthenticated user cannot list users', async ({ client }) => {
    const response = await client.get('/users').redirects(0)

    response.assertStatus(302)
  })

  test('users are ordered by createdAt desc', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const user1 = await UserFactory.merge({ pseudo: 'FirstUser' }).create()
    const user2 = await UserFactory.merge({ pseudo: 'SecondUser' }).create()

    const response = await client.get('/users').withInertia().loginAs(admin)

    response.assertStatus(200)
    const props = response.inertiaProps as any
    const users = props.users
    // user2 was created after user1, so user2 should appear before user1 (desc order)
    const idx1 = users.findIndex((u: any) => u.id === user1.id)
    const idx2 = users.findIndex((u: any) => u.id === user2.id)
    assert.isTrue(idx2 < idx1)
  })
})
