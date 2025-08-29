// ESLint 9 flat config
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly'
      }
    }
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      // project-specific tweaks can go here
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    }
  }
]
