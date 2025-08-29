import { createApp } from 'vue'
import LandingPage from '@/components/LandingPage'

describe('LandingPage.vue', () => {
  it('should render correct contents', () => {
    const container = document.createElement('div')
    const app = createApp(LandingPage)
    const vm = app.mount(container)

    expect(vm.$el.querySelector('.title').textContent).toContain('Welcome to your new project!')
  })
})
