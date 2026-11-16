import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactFlowProvider } from '@xyflow/react'
import App from './App'
import '@xyflow/react/dist/style.css'
import './styles.css'

// App.tsx 中使用了 useReactFlow()，React Flow 12 要求它位于 <ReactFlowProvider> 之内，
// 因此这里在入口处包一层 Provider（与官方拖拽示例做法一致）。
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>,
)
