import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

export function Graph({ nodesData, edgesData }) {
  const cyRef = useRef(null);
  useEffect(() => {
    // グラフのデータやスタイルを定義
    const elements = [
      { data: { id: 'node1', label: 'Node 1' }, position: { x: 100, y: 100 } },
      { data: { id: 'node2', label: 'Node 2' }, position: { x: 200, y: 200 } },
      { data: { source: 'node1', target: 'node2' } },
    ];

    const style = [
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          label: 'data(label)',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
        },
      },
    ];

    // Cytoscape.jsインスタンスを作成
    const cy = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: style,
      layout: { name: 'preset' }, // レイアウトをプリセットに設定
    });

    // クリーンアップ関数
    return () => {
      cy.destroy();
    };
  }, []); // 空の依存配列を渡すことで、初回レンダー時にのみ実行される

  return (
    <div
      style={{ backgroundColor: '#eee', width: '800px', height: '800px' }}
      ref={cyRef}
    />
  );
}
