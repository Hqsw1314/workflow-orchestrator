type Props = {
  onExport: () => void
  onLoadSample: () => void
  onClear: () => void
}

export function Toolbar({ onExport, onLoadSample, onClear }: Props) {
  return (
    <div className="toolbar">
      <button onClick={onExport}>导出编排 JSON</button>
      <button onClick={onLoadSample}>加载示例任务</button>
      <button onClick={onClear}>清空画布</button>
    </div>
  )
}
