<<<<<<< HEAD
# mini-movie-review-project

========================
participants 
1. Sunmyung Woo
2. 


========================

TailwindCSS 쓰실분들은 참고
1. npm install tailwindcss @tailwindcss/vite

2. vite.config.js 파일 안의 내용을 지우고 아래 ----------- 안의 내용을 복사 붙여넣기

------------------------------------------------------
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
------------------------------------------------------

3. index.css 파일 안의 내용을 전부 지우고  -------------------- 안의 내용만 남기기
------------------------------------
@import"tailwindcss"
------------------------------------
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 44e1e3a (Feat: First  Commit)
