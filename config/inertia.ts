import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  rootView: 'inertia_layout',

  sharedData: {
    user: (ctx) =>
      ctx.inertia.always(async () => {
        await ctx.auth.check()
        return ctx.auth.user?.serialize()
      }),
    flash: (ctx) =>
      ctx.inertia.always(() => {
        return ctx.session?.flashMessages.all()
      }),
  },

  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
