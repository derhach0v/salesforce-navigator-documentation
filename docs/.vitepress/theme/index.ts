import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Use default VitePress layout without modifications
    })
  },
  enhanceApp({ app, router, siteData }) {
    // No custom enhancements needed - VitePress handles mobile menu
  }
} satisfies Theme
