'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useController } from '@react-three/xr';
import * as THREE from 'three';

interface ARPartitionProps {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onDelete: (id: string) => void;
}

const ARPartition: React.FC<ARPartitionProps> = ({
  id,
  position,
  size,
  isSelected,
  onSelect,
  onDelete,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<THREE.Vector3>(new THREE.Vector3());

  // XRコントローラーの取得（オプショナル）
  const rightController = useController('right');
  const leftController = useController('left');

  // アニメーション
  useFrame((state) => {
    if (meshRef.current) {
      // 選択状態の視覚的フィードバック
      if (isSelected) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else {
        meshRef.current.rotation.y = 0;
      }
    }
  });

  // クリック/タップ処理
  const handleClick = (event: any) => {
    event.stopPropagation();
    onSelect(isSelected ? null : id);
  };

  // ドラッグ開始
  const handlePointerDown = (event: any) => {
    if (!isSelected) return;

    event.stopPropagation();
    setIsDragging(true);
    setDragStart(event.point.clone());
  };

  // ドラッグ中
  const handlePointerMove = (event: any) => {
    if (!isDragging || !meshRef.current) return;

    event.stopPropagation();

    // シンプルな位置更新
    meshRef.current.position.copy(event.point);
  };

  // ドラッグ終了
  const handlePointerUp = (event: any) => {
    if (isDragging) {
      event.stopPropagation();
      setIsDragging(false);
    }
  };

  // 削除処理（ダブルクリック）
  const handleDoubleClick = (event: any) => {
    event.stopPropagation();
    onDelete(id);
  };

  // マテリアルの色を決定
  const getColor = () => {
    if (isSelected) return '#4299e1'; // 青色（選択時）
    if (hovered) return '#68d391';   // 緑色（ホバー時）
    return '#a0aec0';                // グレー色（通常時）
  };

  const getOpacity = () => {
    return isSelected ? 0.8 : 0.6;
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* パーティションのジオメトリ */}
      <boxGeometry args={size} />

      {/* パーティションのマテリアル */}
      <meshStandardMaterial
        color={getColor()}
        transparent
        opacity={getOpacity()}
        side={THREE.DoubleSide}
      />

      {/* 選択時のエッジ表示 */}
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
          <lineBasicMaterial color="#ffffff" linewidth={2} />
        </lineSegments>
      )}

      {/* サイズ表示用のテキスト（簡易版） */}
      {isSelected && (
        <mesh position={[0, size[1] / 2 + 0.1, 0]}>
          <planeGeometry args={[0.5, 0.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      )}
    </mesh>
  );
};

export default ARPartition;
