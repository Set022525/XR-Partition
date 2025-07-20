'use client';

import React from 'react';

interface PartitionData {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
}

interface ControlPanelProps {
  partitionSize: [number, number, number];
  setPartitionSize: (size: [number, number, number]) => void;
  addPartition: () => void;
  partitions: PartitionData[];
  selectedPartitionId: string | null;
  setSelectedPartitionId: (id: string | null) => void;
  updatePartitionSize: (id: string, newSize: [number, number, number]) => void;
  deletePartition: (id: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  partitionSize,
  setPartitionSize,
  addPartition,
  partitions,
  selectedPartitionId,
  setSelectedPartitionId,
  updatePartitionSize,
  deletePartition,
}) => {
  const selectedPartition = partitions.find(p => p.id === selectedPartitionId);

  const handleSizeChange = (dimension: 0 | 1 | 2, value: number) => {
    const newSize: [number, number, number] = [...partitionSize];
    newSize[dimension] = value;
    setPartitionSize(newSize);
  };

  const handleSelectedPartitionSizeChange = (dimension: 0 | 1 | 2, value: number) => {
    if (!selectedPartitionId || !selectedPartition) return;

    const newSize: [number, number, number] = [...selectedPartition.size];
    newSize[dimension] = value;
    updatePartitionSize(selectedPartitionId, newSize);
  };

  return (
    <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg z-10 max-w-xs">
      <div className="space-y-4">
        {/* タイトル */}
        <h2 className="text-lg font-bold text-gray-800">ARパーティション制御</h2>

        {/* 新規パーティション作成 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">新規パーティション</h3>

          {/* サイズ調整 */}
          <div className="space-y-1">
            <label className="text-xs text-gray-600">幅 (m)</label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={partitionSize[0]}
              onChange={(e) => handleSizeChange(0, parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-xs text-gray-500">{partitionSize[0].toFixed(1)}m</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-600">高さ (m)</label>
            <input
              type="range"
              min="1"
              max="4"
              step="0.1"
              value={partitionSize[1]}
              onChange={(e) => handleSizeChange(1, parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-xs text-gray-500">{partitionSize[1].toFixed(1)}m</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-600">厚さ (m)</label>
            <input
              type="range"
              min="0.05"
              max="0.5"
              step="0.01"
              value={partitionSize[2]}
              onChange={(e) => handleSizeChange(2, parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-xs text-gray-500">{partitionSize[2].toFixed(2)}m</span>
          </div>

          <button
            onClick={addPartition}
            className="w-full px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
          >
            パーティション追加
          </button>
        </div>

        {/* 選択されたパーティションの編集 */}
        {selectedPartitionId && selectedPartition && (
          <div className="space-y-2 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700">
              選択中: {selectedPartitionId.split('-')[1]}
            </h3>

            <div className="space-y-1">
              <label className="text-xs text-gray-600">幅 (m)</label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={selectedPartition.size[0]}
                onChange={(e) => handleSelectedPartitionSizeChange(0, parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{selectedPartition.size[0].toFixed(1)}m</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-600">高さ (m)</label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.1"
                value={selectedPartition.size[1]}
                onChange={(e) => handleSelectedPartitionSizeChange(1, parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{selectedPartition.size[1].toFixed(1)}m</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-600">厚さ (m)</label>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.01"
                value={selectedPartition.size[2]}
                onChange={(e) => handleSelectedPartitionSizeChange(2, parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{selectedPartition.size[2].toFixed(2)}m</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedPartitionId(null)}
                className="flex-1 px-3 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500 transition-colors"
              >
                選択解除
              </button>
              <button
                onClick={() => deletePartition(selectedPartitionId)}
                className="flex-1 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
              >
                削除
              </button>
            </div>
          </div>
        )}

        {/* パーティション一覧 */}
        {partitions.length > 0 && (
          <div className="space-y-2 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700">
              パーティション一覧 ({partitions.length})
            </h3>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {partitions.map((partition) => (
                <div
                  key={partition.id}
                  className={`text-xs p-2 rounded cursor-pointer transition-colors ${
                    selectedPartitionId === partition.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedPartitionId(partition.id)}
                >
                  <div className="font-medium">ID: {partition.id.split('-')[1]}</div>
                  <div>
                    サイズ: {partition.size[0].toFixed(1)} × {partition.size[1].toFixed(1)} × {partition.size[2].toFixed(2)}m
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使用方法 */}
        <div className="text-xs text-gray-600 border-t pt-2">
          <strong>使用方法:</strong><br />
          • クリック: 選択<br />
          • ドラッグ: 移動<br />
          • ダブルクリック: 削除
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
