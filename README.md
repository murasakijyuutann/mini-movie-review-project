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
