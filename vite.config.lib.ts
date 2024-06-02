import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({rollupTypes: true})],
  build: {
    lib: {
      entry: 'src/AnchorPoint/index.ts',
      name: 'LexicalAnchorpoint',
      fileName: format => `lexical-anchorpoint.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lexical', '@lexical/link', '@lexical/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          lexical: 'Lexical',
          '@lexical/link': 'LexicalLink',
          '@lexical/react': 'LexicalReact'
        }
      }
    },
    outDir: 'lib'
  }
})