import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, atom } from 'recoil';

export const relatedDataUrlState = atom({
  key: 'relatedDataUrlState',
  default:
    'https://script.googleusercontent.com/macros/echo?user_content_key=eZc5ZI_5uIjKgfMjH2_SPPMYv8cxFBIkWPUr_9ikfkgxhj6xeHMxsbhhkkxdnrGqqkBp81s-CMyKcTthGOMyNSb9b-CHg-7sm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNn7QRqOoEBV3cKWTQSamdgSRZrrPeIyZwphpZ0GlGts72gFKSD-1bAtb3NGIwK2-kjPHDGPMaez-XMAlwbU29ealZQvKNBeidz9Jw9Md8uu&lib=MlymDeyPZhGLLMUX4XnL84AHWkD4xvv7U',
});

export const graphDataState = atom({
  key: 'graphDataState',
  default: [],
});

export function InputData() {
  const relatedDataUrl = useRecoilValue(relatedDataUrlState);
  const [graphData, setGraphData] = useRecoilState(graphDataState);
  const list = [
    'CEN',
    'SNL',
    'LC',
    'Sol',
    'VTA',
    'PAG',
    'PB',
    'BF',
    'HIP',
    'BNST',
    'Me',
    'NAC',
    'BL',
    'mPFC',
    'EC',
    'La',
  ];

  console.log(graphData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(relatedDataUrl);
      if (res.status == 200) {
        const text = await res.json();
        text[0].shift();
        const edges = text[0]
          //.filter((e) => list.includes(e[0]) && list.includes(e[1]))
          .map((e) => {
            return {
              group: 'edges',
              data: {
                id: e[0] + '-' + e[1],
                source: e[0],
                target: e[1],
              },
            };
          })
          .filter((e) => !(e.data.source == '' || e.data.target == ''));

        const nodes = getNodesFromLinks(edges);
        const nodesObject = {};
        const edgesObject = {};
        nodes.forEach((e) => (nodesObject[e.data.id] = e));
        edges.forEach((e) => (edgesObject[e.data.id] = e));
        console.log('nodes', nodes);
        console.log('edges', edges);
        console.log('nodesObject', nodesObject);

        const cycles = findCycles(nodes, nodesObject);
        console.log(cycles);

        const fas = minimumFAS();
        console.log('fas', fas);

        const reversedEdges = edges.map((e) => {
          // const isInCycle = inCycles(e);
          const isChange = fas.includes(e.data.id);
          if (isChange) {
            return {
              group: 'edges',
              classes: ['removedEdge'],
              data: {
                id: e.data.id,
                source: e.data.target,
                target: e.data.source,
              },
            };
          }
          return e;
        });

        function minimumFAS() {
          const Ea = []; // 非巡回部分グラフのエッジ
          const processed = []; // 処理済みの頂点

          // メインアルゴリズム
          for (let vertex of nodes) {
            if (!processed.includes(vertex.data.id)) {
              const targetCount = vertex.data.target.length;
              const sourceCount = vertex.data.source.length;

              if (targetCount >= sourceCount) {
                for (let targetId of vertex.data.target) {
                  if (!processed.includes(targetId)) {
                    const edge = edgesObject[vertex.data.id + '-' + targetId];
                    Ea.push(edge.data.id);
                  }
                }
              } else {
                for (let sourceId of vertex.data.source) {
                  if (!processed.includes(sourceId)) {
                    const edge = edgesObject[sourceId + '-' + vertex.data.id];
                    Ea.push(edge.data.id);
                  }
                }
              }

              // 処理済みの頂点に追加
              processed.push(vertex.data.id);
            }
          }

          // Eaに含まれないエッジがFASとなる
          const FAS = edges
            .filter((edge) => !Ea.includes(edge.data.id))
            .map((e) => e.data.id);
          console.log('Ea', Ea);

          return FAS;
        }

        const b = getNodesFromLinks(reversedEdges);

        const cycle = findCycles(b);
        console.log('cycle list', cycle);

        // const addHierarchyData = addHierarchy(getNodesFromLinks(changeEdges));
        // console.log('hierarchy', addHierarchyData);

        setGraphData(nodes.concat(reversedEdges));
      }
    };
    fetchData();
  }, [relatedDataUrl]);

  return <></>;
}

function inCycles(edge, cycles) {
  for (let i = 0; i < cycles.length; i++) {
    const e = cycles[i];
    for (let j = 0; j < e.length; j++) {
      const id = j === 0 ? `${e[e.length - 1]}-${e[0]}` : `${e[j - 1]}-${e[j]}`;
      // console.log(id);
      // console.log(edge.data.id);
      if (edge.data.id === id) {
        return true;
      }
    }
  }
  return false;
}

function getNodesFromLinks(links) {
  let nodes = {};

  links.forEach((link) => {
    if (!nodes[link.data.source]) {
      nodes[link.data.source] = createNode(link.data.source);
    }
    if (!nodes[link.data.target]) {
      nodes[link.data.target] = createNode(link.data.target);
    }
  });

  links.forEach((link) => {
    nodes[link.data.source].data.target.push(nodes[link.data.target].data.id);
    nodes[link.data.target].data.source.push(nodes[link.data.source].data.id);
  });

  return Object.values(nodes);
}

function createNode(id) {
  return {
    group: 'nodes',
    data: {
      id: id,
      label: id,
      source: [],
      target: [],
      s: [],
      t: [],
    },
  };
}

function addHierarchy(data) {
  //最長パス法
  let d = [];
  data.forEach((e) => {
    d[e.data.id] = e;
  });
  const sourceNodes = data.filter((e) => e.data.source.length == 0);
  function aH(node, hierarchy) {
    const h = d[node.data.id].data.hierarchy;
    if (h == undefined /*|| h < hierarchy*/) {
      d[node.data.id].data.hierarchy = hierarchy;
      node.data.target.forEach((e) => {
        //自己ループじゃない場合に再帰
        if (node != e) {
          console.log(node.data.id);
          console.log(e.data.id);
          aH(e, hierarchy + 1);
        }
      });
    }
  }
  sourceNodes.forEach((e) => aH(e, 0));
  const a = Object.keys(d).map((key) => d[key]);
  // console.log('hierarchy', a);
  return a;
}

function findCycles(nodes, nodesObject) {
  if (nodesObject == undefined) {
    nodesObject = {};
    nodes.forEach((e) => (nodesObject[e.data.id] = e));
  }
  var visited = {}; // ノードの訪問状態を記録するオブジェクト
  var finished = {};
  var cycles = []; // 閉路のリスト

  // 深さ優先探索関数
  function dfs(node, path) {
    if (visited[node.data.id]) {
      if (!finished[node.data.id]) {
        var cycleStart = path.indexOf(node.data.id);
        var cycle = path.slice(cycleStart); // 閉路の一部を取得

        cycles.push(cycle);
        // console.log('heiro', cycle);
      }
      return;
    }

    visited[node.data.id] = true;
    path.push(node.data.id);

    // console.log(nextNodes);
    node.data.target.forEach((e) => dfs(nodesObject[e], path.slice()));
    finished[node.data.id] = true;
  }

  // 各ノードに対してDFSを実行
  nodes.forEach((e) => {
    if (e.group == 'nodes') {
      dfs(e, []);
    }
  });

  return cycles;
}
