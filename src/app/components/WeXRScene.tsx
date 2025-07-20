'use client';

import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, Controllers, Hands, XRButton } from '@react-three/xr';
import * as THREE from 'three';
import ARPartition from './ARPartition';
import ControlPanel from './ControlPanel';

interface PartitionData {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
}

const WebXRScene: React.FC = () => {
  const [partitions, setPartitions] = useState<PartitionData[]>([]);
  const [selectedPartitionId, setSelectedPartitionId] = useState<string | null>(null);
  const [partitionSize, setPartitionSize] = useState<[number, number, number]>([2, 2.5, 0.1]);
  const [isXRSupported, setIsXRSupported] = useState<boolean>(false);

  // XRサポートチェック
  React.useEffect(() => {
    if (typeof window !== 'undefined' && navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar')
        .then(setIsXRSupported)
        .catch(() => setIsXRSupported(false));
    } else {
      setIsXRSupported(false);
    }
  }, []);

  const addPartition = () => {
    const newPartition: PartitionData = {
      id: `partition-${Date.now()}`,
      position: [Math.random() * 2 - 1, 0, -2], // ランダムな位置に配置
      size: [...partitionSize],
    };
    setPartitions(prev => [...prev, newPartition]);
  };

  const updatePartitionSize = (id: string, newSize: [number, number, number]) => {
    setPartitions(prev =>
      prev.map(p => p.id === id ? { ...p, size: newSize } : p)
    );
  };

  const deletePartition = (id: string) => {
    setPartitions(prev => prev.filter(p => p.id !== id));
    if (selectedPartitionId === id) {
      setSelectedPartitionId(null);
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* XRサポートチェックとボタン */}
      <div className="absolute top-4 left-4 z-10">
        {isXRSupported ? (
          <XRButton
            mode="AR"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
          >
            ARを開始
          </XRButton>
        ) : (
          <div className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-lg">
            WebXR AR非対応
          </div>
        )}
      </div>

      {/* コントロールパネル */}
      <ControlPanel
        partitionSize={partitionSize}
        setPartitionSize={setPartitionSize}
        addPartition={addPartition}
        partitions={partitions}
        selectedPartitionId={selectedPartitionId}
        setSelectedPartitionId={setSelectedPartitionId}
        updatePartitionSize={updatePartitionSize}
        deletePartition={deletePartition}
      />

      {/* 3Dシーン */}
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <XR>
          {/* 環境光 */}
          <ambientLight intensity={0.5} />

          {/* 指向性ライト */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
          />

          {/* XRコントローラー */}
          <Controllers />
          <Hands />

          {/* ARパーティション */}
          {partitions.map((partition) => (
            <ARPartition
              key={partition.id}
              id={partition.id}
              position={partition.position}
              size={partition.size}
              isSelected={selectedPartitionId === partition.id}
              onSelect={setSelectedPartitionId}
              onDelete={deletePartition}
            />
          ))}

          {/* グリッドヘルパー（開発用） */}
          <gridHelper args={[10, 10]} position={[0, -0.01, 0]} />

        </XR>
      </Canvas>
    </div>
  );
};

export default WebXRScene;
